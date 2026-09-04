import { inject, Pipe, type PipeTransform } from '@angular/core';
import { LanguageService } from './language.service';

/** Usage: {{ 'nav.platform' | t }} — re-evaluates on language change. */
@Pipe({ name: 't', pure: false })
export class TranslatePipe implements PipeTransform {
  private readonly i18n = inject(LanguageService);

  transform(key: string): string {
    if (!key) return '';
    return this.i18n.t(key);
  }
}
