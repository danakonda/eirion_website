import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  IcosahedronGeometry,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface AgentDef {
  label: string;
  kind: 'internal' | 'external';
  offset: number;
}

interface OrbitDef {
  radius: number;
  speed: number;
  tiltX: number;
  tiltZ: number;
  agents: AgentDef[];
}

/** exact config extracted from the original site's bundle */
const ORBITS: OrbitDef[] = [
  {
    radius: 1.8,
    speed: 0.16,
    tiltX: 0.32,
    tiltZ: 0.1,
    agents: [
      { label: 'Workflow Agent', kind: 'internal', offset: 0 },
      { label: 'Health Coach', kind: 'external', offset: 2.1 },
      { label: 'Analytics Agent', kind: 'internal', offset: 4.2 },
    ],
  },
  {
    radius: 2.5,
    speed: -0.11,
    tiltX: 0.5,
    tiltZ: -0.18,
    agents: [
      { label: 'RPM Monitor', kind: 'external', offset: 0.6 },
      { label: 'Compliance Agent', kind: 'internal', offset: 2.2 },
      { label: 'Genetic Advisor', kind: 'external', offset: 3.8 },
      { label: 'Assistant Agent', kind: 'internal', offset: 5.3 },
    ],
  },
  {
    radius: 3.1,
    speed: 0.08,
    tiltX: 0.24,
    tiltZ: 0.3,
    agents: [{ label: 'Care Coordinator', kind: 'external', offset: 1.2 }],
  },
];

const COLORS = {
  internal: '#f5b81c',
  internalGlow: '#ffd97a',
  external: '#f6e3b0',
  externalGlow: '#fff3d4',
  ring: '#e8d9a8',
};

/** deterministic star field: 220 points, seed 42, radius 7-13, y * 0.6 */
function buildStarField(): Float32Array {
  const positions = new Float32Array(660);
  let t = 42;
  const rnd = () => (t = (16807 * t) % 0x7fffffff) / 0x7fffffff;
  for (let i = 0; i < 220; i++) {
    const radius = 7 + 6 * rnd();
    const theta = rnd() * Math.PI * 2;
    const phi = Math.acos(2 * rnd() - 1);
    positions.set(
      [
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta) * 0.6,
        radius * Math.cos(phi),
      ],
      3 * i,
    );
  }
  return positions;
}

interface LabelHandle {
  /** positioner div */
  el: HTMLDivElement;
  /** world-space anchor (object whose world position drives the label) */
  anchor: Object3DLike;
  /** when set, label rides below the projected core ball */
  belowCoreRadius?: boolean;
}

interface Object3DLike {
  getWorldPosition(target: Vector3): Vector3;
}

@Component({
  selector: 'app-agent-scene',
  template: `<div #wrap class="h-full w-full cursor-grab active:cursor-grabbing" aria-hidden="true"></div>`,
  styles: `
    :host {
      display: block;
      position: absolute;
      inset: 0;
      overflow: visible;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentScene implements AfterViewInit, OnDestroy {
  @ViewChild('wrap') wrap?: ElementRef<HTMLDivElement>;

  private cleanup?: () => void;

  constructor(private readonly zone: NgZone) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => this.init());
  }

  ngOnDestroy(): void {
    this.cleanup?.();
  }

  private init(): void {
    const container = this.wrap?.nativeElement;
    if (!container) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.style.display = 'block';
    canvas.style.touchAction = 'auto';
    container.appendChild(canvas);

    const scene = new Scene();
    const camera = new PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 3.4, 8.6);

    scene.add(new AmbientLight(0xffffff, 0.35));

    const root = new Group(); // zoom scale
    const spinner = new Group(); // auto-rotation
    root.add(spinner);
    scene.add(root);

    const labels: LabelHandle[] = [];
    let ellieBelowCore: LabelHandle | null = null;

    const labelLayer = document.createElement('div');
    labelLayer.style.cssText =
      'position:absolute;top:0;left:0;pointer-events:none;z-index:10;transform-origin:0 0;';
    container.appendChild(labelLayer);

    const makeLabel = (
      anchor: Object3DLike,
      content: HTMLDivElement,
      belowCoreRadius?: boolean,
    ): HTMLDivElement => {
      // structure: positioner → centerer → content
      const positioner = document.createElement('div');
      positioner.style.cssText = 'position:absolute;pointer-events:none;';
      const centerer = document.createElement('div');
      // ELLIE label: down +25% of own size, horizontally centered on the ball
      // agent pills: centered (-50%, -50%) like the original
      centerer.style.cssText = `position:absolute;transform:translate3d(${
        belowCoreRadius ? '-50%, 25%' : '-50%, -50%'
      },0);pointer-events:none;`;
      centerer.appendChild(content);
      positioner.appendChild(centerer);
      labelLayer.appendChild(positioner);
      const handle: LabelHandle = { el: positioner, anchor, belowCoreRadius };
      labels.push(handle);
      if (belowCoreRadius) ellieBelowCore = handle;
      return positioner;
    };

    // ---------- ELLIE core (hC) ----------
    const coreGroup = new Group();
    const wire = new Mesh(
      new IcosahedronGeometry(0.55, 2),
      new MeshBasicMaterial({ color: 0xfbf9f1, wireframe: true, transparent: true, opacity: 0.9 }),
    );
    const coreBall = new Mesh(
      new SphereGeometry(0.3, 32, 32),
      new MeshBasicMaterial({ color: 0xffffff }),
    );
    const coreHalo = new Mesh(
      new SphereGeometry(0.55, 32, 32),
      new MeshBasicMaterial({ color: 0xd6f5df, transparent: true, opacity: 0.14, depthWrite: false }),
    );
    coreGroup.add(wire, coreBall, coreHalo);
    // point light on core (original: white, intensity 14, distance 12, decay 1.6)
    coreGroup.add(new PointLight(0xffffff, 14, 12, 1.6));
    spinner.add(coreGroup);

    const ellieLabel = document.createElement('div');
    ellieLabel.style.cssText = 'text-align:center;white-space:nowrap;';
    ellieLabel.innerHTML =
      '<p style="margin:0;font-size:15px;font-weight:700;letter-spacing:0.04em;color:#fbf9f1;text-shadow:0 2px 12px rgba(0,0,0,0.8)">ELLIE</p>' +
      '<p style="margin:0;font-size:10px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.55)">MCP Core</p>';
    // ELLIE label rides the core ball's projected center and is pushed below
    // its on-screen radius every frame → always centered under the ball,
    // at any zoom or drag rotation
    makeLabel(coreGroup, ellieLabel, true);

    // ---------- orbits + agents (hA, hE) ----------
    for (const orbit of ORBITS) {
      const orbitGroup = new Group();
      orbitGroup.rotation.set(orbit.tiltX, 0, orbit.tiltZ);
      orbitGroup.userData['speed'] = orbit.speed;
      spinner.add(orbitGroup);

      // ring line: 128-segment circle
      const pts: number[] = [];
      for (let i = 0; i <= 128; i++) {
        const a = (i / 128) * Math.PI * 2;
        pts.push(Math.cos(a) * orbit.radius, 0, Math.sin(a) * orbit.radius);
      }
      const ringGeo = new BufferGeometry();
      ringGeo.setAttribute('position', new BufferAttribute(new Float32Array(pts), 3));
      const ring = new Line(
        ringGeo,
        new LineBasicMaterial({
          color: new Color(COLORS.ring),
          transparent: true,
          opacity: 0.35,
          depthWrite: false,
        }),
      );
      orbitGroup.add(ring);

      for (const agent of orbit.agents) {
        const base = COLORS[agent.kind];
        const glow = agent.kind === 'internal' ? COLORS.internalGlow : COLORS.externalGlow;

        const agentGroup = new Group();
        agentGroup.position.set(
          Math.cos(agent.offset) * orbit.radius,
          0,
          Math.sin(agent.offset) * orbit.radius,
        );
        orbitGroup.add(agentGroup);

        const ball = new Mesh(
          new SphereGeometry(0.11, 24, 24),
          new MeshStandardMaterial({
            color: new Color(base),
            emissive: new Color(glow),
            emissiveIntensity: 0.55,
            roughness: 0.35,
          }),
        );
        const halo = new Mesh(
          new SphereGeometry(0.17, 16, 16),
          new MeshBasicMaterial({
            color: new Color(glow),
            transparent: true,
            opacity: 0.18,
            depthWrite: false,
          }),
        );
        agentGroup.add(ball, halo);

        const pill = document.createElement('div');
        pill.style.cssText = `white-space:nowrap;padding:4px 10px;border-radius:999px;font-size:11.5px;font-weight:600;letter-spacing:0.02em;color:#fbf9f1;background:rgba(18,69,41,0.72);border:1px solid ${
          agent.kind === 'internal' ? 'rgba(245,184,28,0.55)' : 'rgba(246,227,176,0.5)'
        };backdrop-filter:blur(8px);box-shadow:0 8px 24px -8px rgba(0,0,0,0.6)`;
        const dot = document.createElement('span');
        dot.style.cssText = `display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:7px;background:${glow};box-shadow:0 0 8px ${glow}`;
        pill.appendChild(dot);
        pill.appendChild(document.createTextNode(agent.label));
        // anchor each pill to a world-space point just above the sphere so
        // it stays clear at every zoom level
        const pillAnchor = new Group();
        pillAnchor.position.set(0, 0.22, 0);
        agentGroup.add(pillAnchor);
        makeLabel(pillAnchor, pill);

        // store angular offset for animation
        agentGroup.userData['offset'] = agent.offset;
        agentGroup.userData['orbit'] = orbitGroup;
        agentGroup.userData['radius'] = orbit.radius;
      }
    }

    // ---------- star field (hR) ----------
    const starGeo = new BufferGeometry();
    starGeo.setAttribute('position', new BufferAttribute(buildStarField(), 3));
    const stars = new Points(
      starGeo,
      new PointsMaterial({
        color: 0xeef8e6,
        size: 0.03,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
      }),
    );
    spinner.add(stars);

    // ---------- controls (hM) ----------
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.55;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = 0.2 * Math.PI;
    controls.maxPolarAngle = 0.72 * Math.PI;

    // ctrl/meta + wheel zoom 0.55..2.1
    let zoom = 1;
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        zoom = Math.min(2.1, Math.max(0.55, zoom * (1 - 0.0016 * e.deltaY)));
      }
    };
    container.addEventListener('wheel', onWheel, { passive: false });

    // ---------- resize ----------
    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h); // updates canvas CSS size too → labels align 1:1
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    // ---------- render loop ----------
    const clock = { last: performance.now() };
    const v = new Vector3();
    const agents: Group[] = [];
    spinner.traverse((o: import('three').Object3D) => {
      if (o.userData['offset'] !== undefined) agents.push(o as Group);
    });

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => (visible = entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(container);

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - clock.last) / 1000, 0.1);
      clock.last = now;
      if (!visible) return;

      if (!reduceMotion) spinner.rotation.y += 0.04 * dt;

      // zoom easing
      const s = root.scale.x;
      root.scale.setScalar(s + (zoom - s) * Math.min(1, 8 * dt));

      // core pulse (hC)
      const t = now / 1000;
      wire.scale.setScalar(1 + 0.05 * Math.sin(1.4 * t));
      coreHalo.scale.setScalar(1.6 + 0.12 * Math.sin(1.4 * t + 0.9));
      (coreHalo.material as MeshBasicMaterial).opacity =
        0.14 + 0.04 * Math.sin(1.4 * t + 0.9);

      // agent orbital motion (hE)
      if (!reduceMotion) {
        for (const a of agents) {
          const speed = a.userData['orbit'].userData['speed'] ?? 0.1;
          a.userData['offset'] += speed * dt;
          const r = a.userData['radius'] as number;
          a.position.set(Math.cos(a.userData['offset']) * r, 0, Math.sin(a.userData['offset']) * r);
        }
      }

      controls.update();
      renderer.render(scene, camera);

      // project labels to screen space
      const w = container.clientWidth;
      const h = container.clientHeight;
      // projected core-ball screen radius (for the below-core ELLIE label)
      let coreScreenY = 0;
      let coreScreenR = 0;
      if (ellieBelowCore) {
        coreGroup.getWorldPosition(v);
        v.project(camera);
        coreScreenY = ((1 - v.y) / 2) * h;
        // world radius 0.3 → screen: project the ball's top point
        const top = coreGroup.localToWorld(new Vector3(0, 0.3, 0));
        top.project(camera);
        coreScreenR = Math.abs(((1 - top.y) / 2) * h - coreScreenY);
      }
      for (const { el, anchor, belowCoreRadius } of labels) {
        anchor.getWorldPosition(v);
        v.project(camera);
        if (v.z > 1) {
          el.style.display = 'none';
        } else {
          el.style.display = 'block';
          let x = ((v.x + 1) / 2) * w;
          let y = ((1 - v.y) / 2) * h;
          if (belowCoreRadius) {
            // anchor point: just below the ball, horizontally at ball center.
            // Label shifts right +50% and down +50% of its own size
            // (top-left anchored at this point).
            x = ((v.x + 1) / 2) * w;
            y = coreScreenY + coreScreenR + 14;
            el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1)`;
            continue;
          }
          el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1)`;
        }
      }
    };
    let raf = requestAnimationFrame(tick);

    this.cleanup = () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      controls.dispose();
      container.removeEventListener('wheel', onWheel);
      renderer.dispose();
      canvas.remove();
      labelLayer.remove();
      scene.traverse((o: import('three').Object3D) => {
        const mesh = o as Mesh;
        mesh.geometry?.dispose?.();
        const mat = mesh.material as { dispose?: () => void } | undefined;
        mat?.dispose?.();
      });
    };
  }
}