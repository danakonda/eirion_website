import { Directive, ElementRef, OnDestroy, OnInit, input } from '@angular/core';

@Directive({
  selector: '[appReveal]',
})
export class Reveal implements OnInit, OnDestroy {
  readonly delay = input(0);
  readonly direction = input<'up' | 'left' | 'right'>('up');

  private observer?: IntersectionObserver;

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const node = this.el.nativeElement;
    node.classList.add('reveal');
    if (this.direction() === 'left') node.classList.add('reveal-x-left');
    if (this.direction() === 'right') node.classList.add('reveal-x-right');
    node.style.transitionDelay = `${this.delay()}ms`;

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('reveal-in');
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add('reveal-in');
            this.observer?.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}