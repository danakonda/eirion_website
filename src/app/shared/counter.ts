import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  input,
} from '@angular/core';

@Directive({
  selector: '[appCounter]',
})
export class Counter implements OnInit, OnDestroy {
  readonly value = input(0);
  readonly suffix = input('');
  readonly duration = input(1600);

  private observer?: IntersectionObserver;
  private started = false;
  private readonly el = inject(ElementRef<HTMLElement>);

  ngOnInit(): void {
    const node = this.el.nativeElement as HTMLElement;
    node.textContent = '0' + this.suffix();

    if (typeof IntersectionObserver === 'undefined') {
      node.textContent = this.value() + this.suffix();
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !this.started) {
            this.started = true;
            this.animate(node);
            this.observer?.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    this.observer.observe(node);
  }

  private animate(node: HTMLElement): void {
    const target = this.value();
    const suffix = this.suffix();
    const start = performance.now();
    const duration = this.duration();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      node.textContent = Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}