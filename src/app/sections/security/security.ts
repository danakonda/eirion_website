import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../shared/icons/icon';
import { Reveal } from '../../shared/reveal';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-security',
  imports: [Icon, Reveal, TranslatePipe],
  templateUrl: './security.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Security {
  protected readonly cards = [
    {
      id: 'HIPAA',
      name: 'HIPAA',
      icon: 'check' as const,
      tagKey: 'sec.tag.compliant',
      subtitleKey: 'sec.card1.sub',
      descKey: 'sec.card1.desc',
      statKey: 'sec.card1.stat',
      statLabelKey: 'sec.card1.statLabel',
    },
    {
      id: 'ISO15189',
      name: 'ISO 15189',
      icon: 'flask-conical' as const,
      tagKey: 'sec.tag.certified',
      subtitleKey: 'sec.card2.sub',
      descKey: 'sec.card2.desc',
      statKey: 'sec.card2.stat',
      statLabelKey: 'sec.card2.statLabel',
    },
    {
      id: 'GDPR',
      name: 'GDPR',
      icon: 'lock' as const,
      tagKey: 'sec.tag.compliant',
      subtitleKey: 'sec.card3.sub',
      descKey: 'sec.card3.desc',
      statKey: 'sec.card3.stat',
      statLabelKey: 'sec.card3.statLabel',
    },
  ];

  protected readonly bottomRowKeys = ['sec.bottom1', 'sec.bottom2', 'sec.bottom3'];
}