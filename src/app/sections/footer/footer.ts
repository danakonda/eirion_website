import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';

import { Icon } from '../../shared/icons/icon';
import { Reveal } from '../../shared/reveal';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-footer',
  imports: [Icon, Reveal, TranslatePipe],

  templateUrl: './footer.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {

  // ============================================================
  // ROUTER
  // ============================================================

  private readonly router = inject(Router);


  // ============================================================
  // STATE
  // ============================================================

  protected readonly subscribed = signal(false);

  protected readonly emailValue = signal('');


  // ============================================================
  // FOOTER COLUMNS
  // ============================================================

  protected readonly columns = [

    // ==========================================================
    // PLATFORM
    // ==========================================================

    {
      titleKey: 'footer.col1',

      links: [

        {
          labelKey: 'footer.overview',
          type: 'section',
          section: 'platform',
        },

        {
          labelKey: 'footer.agents',
          type: 'section',
          section: 'architecture',
        },

        {
          labelKey: 'nav.architecture',
          type: 'section',
          section: 'architecture',
        },

        {
          labelKey: 'nav.diagnostics',
          type: 'section',
          section: 'diagnostics',
        },

      ],
    },


    // ==========================================================
    // COMPANY
    // ==========================================================

    {
      titleKey: 'footer.col2',

      links: [

        {
          labelKey: 'nav.philosophy',
          type: 'section',
          section: 'philosophy',
        },

        {
          labelKey: 'nav.news',
          type: 'section',
          section: 'news',
        },

        {
          labelKey: 'footer.careers',
          type: 'route',
          route: '/contact',
        },

        {
          labelKey: 'footer.contact',
          type: 'route',
          route: '/contact',
        },

      ],
    },


    // ==========================================================
    // RESOURCES
    // ==========================================================

    {
      titleKey: 'footer.col3',

      links: [

        {
          labelKey: 'footer.docs',
          type: 'route',
          route: '/contact',
        },

        {
          labelKey: 'footer.security',
          type: 'section',
          section: 'security',
        },

        {
          labelKey: 'footer.compliance',
          type: 'section',
          section: 'security',
        },

        {
          labelKey: 'footer.support',
          type: 'route',
          route: '/contact',
        },

      ],
    },

  ];


  // ============================================================
  // HANDLE FOOTER LINK
  // ============================================================

  // ============================================================
// HANDLE FOOTER LINK
// ============================================================

protected handleLink(
  link: {
    labelKey: string;
    type: string;
    section?: string;
    route?: string;
  }
): void {

  // ----------------------------------------------------------
  // SECTION LINK
  // ----------------------------------------------------------

  if (
    link.type === 'section' &&
    link.section
  ) {

    /*
     * Remember that this navigation started
     * from the footer.
     */
    sessionStorage.setItem(
      'returnToFooter',
      'true'
    );

    /*
     * Create a browser history entry.
     *
     * Example:
     * /
     * ↓
     * /#architecture
     *
     * When Back is pressed:
     * /#architecture
     * ↓
     * /
     *
     * App will then restore the footer.
     */
    this.router.navigate(
      ['/'],
      {
        fragment: link.section,
      }
    ).then(() => {

      setTimeout(() => {

        this.scrollToSection(
          link.section!
        );

      }, 150);

    });

    return;
  }


  // ----------------------------------------------------------
  // NORMAL PAGE LINK
  // ----------------------------------------------------------

  if (
    link.type === 'route' &&
    link.route
  ) {

    /*
     * Remember that this navigation started
     * from the footer.
     */
    sessionStorage.setItem(
      'returnToFooter',
      'true'
    );

    /*
     * Navigate to the requested page.
     */
    this.router.navigateByUrl(
      link.route
    );

    return;
  }
}


// ============================================================
// GO TO HOME SECTION
// ============================================================

protected goToSection(
  section: string
): void {

  /*
   * This function can still be used by
   * other parts of the footer if needed.
   */

  if (
    this.router.url === '/' ||
    this.router.url === ''
  ) {

    this.scrollToSection(
      section
    );

    return;
  }


  /*
   * If we are on another page,
   * go to Home first.
   */

  this.router.navigate(['/']).then(() => {

    setTimeout(() => {

      this.scrollToSection(
        section
      );

    }, 200);

  });
}


// ============================================================
// SCROLL TO SECTION
// ============================================================

private scrollToSection(
  section: string
): void {

  const element =
    document.getElementById(section);


  if (!element) {

    console.warn(
      `Footer navigation: #${section} was not found.`
    );

    return;
  }


  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}


// ============================================================
// NEWSLETTER
// ============================================================

protected onSubscribe(
  event: Event
): void {

  event.preventDefault();


  if (!this.emailValue()) {
    return;
  }


  this.subscribed.set(true);

  this.emailValue.set('');
}}