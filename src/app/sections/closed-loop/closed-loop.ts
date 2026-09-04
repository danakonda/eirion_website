import { afterNextRender, ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Reveal } from '../../shared/reveal';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-closed-loop',
  imports: [Reveal, TranslatePipe],
  templateUrl: './closed-loop.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClosedLoop {
  protected readonly steps = [
    { num: '01', titleKey: 'closed.step1.title', descKey: 'closed.step1.desc' },
    { num: '02', titleKey: 'closed.step2.title', descKey: 'closed.step2.desc' },
    { num: '03', titleKey: 'closed.step3.title', descKey: 'closed.step3.desc' },
    { num: '04', titleKey: 'closed.step4.title', descKey: 'closed.step4.desc' },
    { num: '05', titleKey: 'closed.step5.title', descKey: 'closed.step5.desc' },
    { num: '06', titleKey: 'closed.step6.title', descKey: 'closed.step6.desc' },
  ];

  protected readonly progress = signal(0);

  constructor() {
    afterNextRender(() => {
      const el = document.querySelector('app-closed-loop section .relative');
      if (!el || typeof IntersectionObserver === 'undefined') {
        this.progress.set(1);
        return;
      }
      const update = () => {
        const rect = el.getBoundingClientRect();
        const visible = Math.min(Math.max((window.innerHeight - rect.top) / (rect.height || 1), 0), 1);
        this.progress.set(visible);
      };
      window.addEventListener('scroll', update, { passive: true });
      update();
    });
  }
}