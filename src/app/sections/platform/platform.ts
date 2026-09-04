import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { Icon } from '../../shared/icons/icon';
import { Reveal } from '../../shared/reveal';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-platform',
  imports: [Icon, Reveal, TranslatePipe],
  templateUrl: './platform.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Platform {
  protected readonly cards = [
    {
      badgeKey: 'platform.card1.badge',
      icon: 'building-2' as const,
      titleKey: 'platform.card1.title',
      bulletKeys: ['platform.card1.b1', 'platform.card1.b2', 'platform.card1.b3', 'platform.card1.b4'],
      linkKey: 'platform.card1.link',
    },
    {
      badgeKey: 'platform.card2.badge',
      icon: 'users' as const,
      titleKey: 'platform.card2.title',
      bulletKeys: ['platform.card2.b1', 'platform.card2.b2', 'platform.card2.b3', 'platform.card2.b4'],
      linkKey: 'platform.card2.link',
    },
  ];

  protected readonly spotX = signal(-400);
  protected readonly spotY = signal(-400);

  protected onCardMove(event: MouseEvent): void {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.spotX.set(Math.round(event.clientX - rect.left));
    this.spotY.set(Math.round(event.clientY - rect.top));
  }
}