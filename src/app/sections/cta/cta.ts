import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icons/icon';
import { Reveal } from '../../shared/reveal';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-cta',
  imports: [Icon, Reveal, RouterLink, TranslatePipe],
  templateUrl: './cta.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cta {
  protected readonly badges = [
    { icon: 'shield-check' as const, labelKey: 'cta.badge1' },
    { icon: 'lock' as const, labelKey: 'cta.badge2' },
    { icon: 'award' as const, labelKey: 'cta.badge3' },
  ];
}