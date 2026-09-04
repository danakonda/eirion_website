import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../shared/icons/icon';
import { Reveal } from '../../shared/reveal';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-philosophy',
  imports: [Icon, Reveal, TranslatePipe],
  templateUrl: './philosophy.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Philosophy {
  protected readonly cards = [
    {
      icon: 'eye' as const,
      titleKey: 'philo.card1.title',
      principleKey: 'philo.card1.principle',
      appKey: 'philo.card1.app',
    },
    {
      icon: 'git-branch' as const,
      titleKey: 'philo.card2.title',
      principleKey: 'philo.card2.principle',
      appKey: 'philo.card2.app',
    },
    {
      icon: 'trees' as const,
      titleKey: 'philo.card3.title',
      principleKey: 'philo.card3.principle',
      appKey: 'philo.card3.app',
    },
  ];
}