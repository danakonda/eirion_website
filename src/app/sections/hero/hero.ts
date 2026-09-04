import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnDestroy,
  effect,
  signal,
} from '@angular/core';
import { Icon } from '../../shared/icons/icon';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-hero',
  imports: [Icon, TranslatePipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero implements AfterViewInit, OnDestroy {
  protected readonly swapKeys = ['hero.swap1', 'hero.swap2'];
  protected readonly coachKeys = ['hero.nutrition', 'hero.activity', 'hero.sleep', 'hero.mindfulness'];
  protected readonly swapIndex = signal(0);
  protected readonly showMouse = signal(false);
  protected readonly healthRingOffset = signal('276.46');

  private swapTimer?: ReturnType<typeof setInterval>;
  private ringTimer?: ReturnType<typeof setTimeout>;
  private ringRaf = 0;

  constructor(private readonly zone: NgZone) {
    effect(() => {
      // animate the health score ring to 92% on mount
      const target = 276.46 * (1 - 0.92);
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - start) / 1200, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        this.healthRingOffset.set(String(276.46 - (276.46 - target) * eased));
        if (t < 1) this.ringRaf = requestAnimationFrame(step);
      };
      this.ringRaf = requestAnimationFrame(step);
    });
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.ringTimer = setTimeout(() => this.zone.run(() => this.showMouse.set(true)), 2200);
      let i = 0;
      this.swapTimer = setInterval(() => {
        this.zone.run(() => this.swapIndex.set((i = 1 - i)));
      }, 2800);
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.swapTimer);
    clearTimeout(this.ringTimer);
    cancelAnimationFrame(this.ringRaf);
  }
}