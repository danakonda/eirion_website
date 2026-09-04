import { Injectable, OnDestroy } from '@angular/core';
import Lenis from 'lenis';

@Injectable({ providedIn: 'root' })
export class SmoothScroll implements OnDestroy {
  private lenis?: Lenis;
  private rafId = 0;

  init(): void {
    if (this.lenis) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.lenis = new Lenis({
      lerp: 0.11,
      wheelMultiplier: 0.95,
    });

    const raf = (time: number) => {
      this.lenis?.raf(time);
      this.rafId = requestAnimationFrame(raf);
    };
    this.rafId = requestAnimationFrame(raf);

    document.addEventListener('click', this.onClick, { capture: true });
  }

  private readonly onClick = (e: MouseEvent): void => {
    if (!this.lenis || e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const anchor = (e.target as HTMLElement | null)?.closest?.('a[href]');
    if (!anchor) return;

    const raw = anchor.getAttribute('href') ?? '';
    const hashIndex = raw.indexOf('#');
    if (hashIndex === -1) return;

    const path = raw.slice(0, hashIndex);
    const hash = raw.slice(hashIndex);
    const current = location.pathname + location.search;

    if (path && path !== '/' && path !== current) return;

    const target = document.querySelector(hash);
    if (!target) return;

    e.preventDefault();
    history.pushState(null, '', hash);
    this.lenis.scrollTo(target as HTMLElement);
  };

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
    this.lenis?.destroy();
    this.lenis = undefined;
    document.removeEventListener('click', this.onClick, { capture: true });
  }
}