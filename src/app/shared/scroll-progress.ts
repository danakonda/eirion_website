import {
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  effect,
  inject,
  signal,
} from '@angular/core';

@Directive({
  selector: '[appScrollProgress]',
  host: { '[style.transform]': 'transform()' },
})
export class ScrollProgress implements OnInit, OnDestroy {
  private readonly zone = inject(NgZone);
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly scale = signal(0);
  protected readonly transform = signal('scaleX(0)');

  private raf = 0;

  constructor() {
    effect(() => {
      this.transform.set(`scaleX(${this.scale()})`);
    });
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      const onScroll = () => {
        cancelAnimationFrame(this.raf);
        this.raf = requestAnimationFrame(() => {
          const doc = document.documentElement;
          const max = doc.scrollHeight - window.innerHeight;
          this.scale.set(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      onScroll();
      (this.el.nativeElement as HTMLElement).dataset['cleanup'] = '';
      this.cleanup = () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      };
    });
  }

  private cleanup?: () => void;

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    this.cleanup?.();
  }
}