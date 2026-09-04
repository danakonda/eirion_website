import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';

import { Title } from '@angular/platform-browser';
import { LanguageService } from '../../i18n/language.service';

import { Hero } from '../../sections/hero/hero';
import { TrustedBy } from '../../sections/trusted-by/trusted-by';
import { Platform } from '../../sections/platform/platform';
import { Architecture } from '../../sections/architecture/architecture';
import { Diagnostics } from '../../sections/diagnostics/diagnostics';
import { ClosedLoop } from '../../sections/closed-loop/closed-loop';
import { Philosophy } from '../../sections/philosophy/philosophy';
import { Speed } from '../../sections/speed/speed';
import { News } from '../../sections/news/news';
import { ScrollWords } from '../../sections/scroll-words/scroll-words';
import { Testimonial } from '../../sections/testimonial/testimonial';
import { Security } from '../../sections/security/security';
import { Faq } from '../../sections/faq/faq';
import { Cta } from '../../sections/cta/cta';

@Component({
  selector: 'app-home',

  imports: [
    Hero,
    TrustedBy,
    Platform,
    Architecture,
    Diagnostics,
    ClosedLoop,
    Philosophy,
    Speed,
    News,
    ScrollWords,
    Testimonial,
    Security,
    Faq,
    Cta,
  ],

  templateUrl: './home.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit, AfterViewInit {
  private readonly title = inject(Title);
  private readonly i18n = inject(LanguageService);

  ngOnInit(): void {
    this.title.setTitle(this.i18n.t('meta.title.home'));
  }

  ngAfterViewInit(): void {
    const returnToFooter = sessionStorage.getItem('returnToFooter');

    if (returnToFooter !== 'true') {
      return;
    }

    sessionStorage.removeItem('returnToFooter');

    setTimeout(() => {
      const footer = document.querySelector('app-footer');

      if (footer) {
        footer.scrollIntoView({
          behavior: 'instant',
          block: 'start',
        });
      }
    }, 200);
  }
}