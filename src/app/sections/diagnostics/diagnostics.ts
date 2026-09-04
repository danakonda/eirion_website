import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../shared/icons/icon';
import { Reveal } from '../../shared/reveal';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-diagnostics',
  imports: [Icon, Reveal, TranslatePipe],
  templateUrl: './diagnostics.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Diagnostics {
  protected readonly layers = [
    {
      badgeKey: 'diag.layer1.badge',
      icon: 'dna' as const,
      iconBg: 'bg-forest-100/70 text-forest-700',
      checkColor: 'text-forest-600',
      titleKey: 'diag.layer1.title',
      descKey: 'diag.layer1.desc',
      bulletKeys: ['diag.layer1.b1', 'diag.layer1.b2', 'diag.layer1.b3', 'diag.layer1.b4'],
    },
    {
      badgeKey: 'diag.layer2.badge',
      icon: 'flask-conical' as const,
      iconBg: 'bg-gold-400/25 text-amber-brand',
      checkColor: 'text-amber-brand',
      titleKey: 'diag.layer2.title',
      descKey: 'diag.layer2.desc',
      bulletKeys: ['diag.layer2.b1', 'diag.layer2.b2', 'diag.layer2.b3', 'diag.layer2.b4'],
    },
    {
      badgeKey: 'diag.layer3.badge',
      icon: 'activity' as const,
      iconBg: 'bg-forest-100/70 text-forest-700',
      checkColor: 'text-forest-600',
      titleKey: 'diag.layer3.title',
      descKey: 'diag.layer3.desc',
      bulletKeys: ['diag.layer3.b1', 'diag.layer3.b2', 'diag.layer3.b3', 'diag.layer3.b4'],
    },
  ];
}