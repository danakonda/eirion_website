import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';

import {
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';

import { filter } from 'rxjs';

import { ScrollProgress } from './shared/scroll-progress';
import { SmoothScroll } from './shared/smooth-scroll';
import { TranslatePipe } from './i18n/translate.pipe';
import { Navbar } from './sections/navbar/navbar';
import { Footer } from './sections/footer/footer';

@Component({
  selector: 'app-root',

  imports: [
    RouterOutlet,
    ScrollProgress,
    Navbar,
    Footer,
    TranslatePipe,
  ],

  template: `
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[70] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
    >
      {{ 'a11y.skip' | t }}
    </a>

    <!-- Scroll progress -->
    <div
      appScrollProgress
      class="fixed inset-x-0 top-0 z-[60] h-[2.5px] origin-left bg-gradient-to-r from-forest-500 via-forest-300 to-forest-400"
    ></div>

    <app-navbar />

    <router-outlet />

    <app-footer />
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements AfterViewInit {

  private readonly smoothScroll = inject(SmoothScroll);
  private readonly router = inject(Router);

  ngAfterViewInit(): void {

    /*
     * Start smooth scrolling.
     */
    this.smoothScroll.init();

    /*
     * Listen for Angular route changes.
     */
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {

        /*
         * Check whether a footer link
         * asked us to return to the footer.
         */
       const returnToFooter =
  sessionStorage.getItem('returnToFooter');

if (returnToFooter !== 'true') {
  return;
}

if (event.urlAfterRedirects !== '/') {
  return;
}

sessionStorage.removeItem('returnToFooter');

setTimeout(() => {

  const footer =
    document.querySelector('app-footer');

  if (footer) {
    footer.scrollIntoView({
      behavior: 'instant',
      block: 'start',
    });
  }

}, 500);
      });
  }
}
