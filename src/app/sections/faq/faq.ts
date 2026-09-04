import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Icon } from '../../shared/icons/icon';
import { Reveal } from '../../shared/reveal';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-faq',
  imports: [Icon, Reveal, TranslatePipe],
  templateUrl: './faq.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Faq {
  protected readonly open = signal(0);

  protected readonly faqs = [
    { qKey: 'faq.q1', aKey: 'faq.a1' },
    { qKey: 'faq.q2', aKey: 'faq.a2' },
    { qKey: 'faq.q3', aKey: 'faq.a3' },
    { qKey: 'faq.q4', aKey: 'faq.a4' },
  ];

  protected toggle(i: number): void {
    this.open.set(this.open() === i ? -1 : i);
  }
}