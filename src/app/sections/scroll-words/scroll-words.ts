import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-scroll-words',
  imports: [TranslatePipe],
  templateUrl: './scroll-words.html',
  styles: `
    :host {
      --stage-color: #11562d;
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollWords implements OnInit, OnDestroy {
  protected readonly stages = [
    { wordKey: 'scroll.w1', subKey: 'scroll.s1' },
    { wordKey: 'scroll.w2', subKey: 'scroll.s2' },
    { wordKey: 'scroll.w3', subKey: 'scroll.s3' },
    { wordKey: 'scroll.w4', subKey: 'scroll.s4' },
  ];

  protected readonly stage = signal(0);
  protected readonly subAlpha = signal(1);

  private cleanup?: () => void;

  constructor(private readonly zone: NgZone) {}

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      const onScroll = () => {
        const el = document.querySelector<HTMLElement>('app-scroll-words section');
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const progress = Math.min(Math.max(-rect.top / total, 0), 1);
        const idx = Math.min(Math.floor(progress * this.stages.length), this.stages.length - 1);
        const local = progress * this.stages.length - idx;
        const alpha = local < 0.1 ? 0.15 + (local / 0.1) * 0.85 : local > 0.9 ? 0.15 + ((1 - local) / 0.1) * 0.85 : 1;
        this.subAlpha.set(alpha);
        if (idx !== this.stage()) this.zone.run(() => this.stage.set(idx));
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      onScroll();
      this.cleanup = () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      };
    });
  }

  ngOnDestroy(): void {
    this.cleanup?.();
  }
}