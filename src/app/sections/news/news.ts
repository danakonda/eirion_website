import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Icon } from '../../shared/icons/icon';
import { Reveal } from '../../shared/reveal';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { Counter } from '../../shared/counter';

@Component({
  selector: 'app-news',
  imports: [Icon, Reveal, TranslatePipe, Counter],
  templateUrl: './news.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class News {
  protected readonly cards = [
    {
      icon: 'sparkles' as const,
      titleKey: 'news.card1.title',
      descKey: 'news.card1.desc',
    },
    {
      icon: 'activity' as const,
      titleKey: 'news.card2.title',
      descKey: 'news.card2.desc',
    },
    {
      icon: 'calendar-heart' as const,
      titleKey: 'news.card3.title',
      descKey: 'news.card3.desc',
    },
  ];

  protected readonly stats = [
    { value: 3, suffix: 'x', labelKey: 'news.stat1.label' },
    { value: 40, suffix: '%', labelKey: 'news.stat2.label' },
    { value: 99, suffix: '%', labelKey: 'news.stat3.label' },
  ];

  protected readonly spotX = signal(-400);
  protected readonly spotY = signal(-400);

  protected onCardMove(event: MouseEvent): void {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.spotX.set(Math.round(event.clientX - rect.left));
    this.spotY.set(Math.round(event.clientY - rect.top));
  }
}