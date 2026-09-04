import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Icon } from '../../shared/icons/icon';
import { LanguageService } from '../../i18n/language.service';
import { TranslatePipe } from '../../i18n/translate.pipe';
import type { Locale } from '../../i18n/languages';

@Component({
  selector: 'app-navbar',
  imports: [Icon, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  protected readonly i18n = inject(LanguageService);

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly router = inject(Router);

  protected readonly scrolled = signal(false);
  protected readonly hidden = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly langOpen = signal(false);

  protected readonly solidHeader = computed(
    () => this.scrolled() || this.menuOpen()
  );

  protected readonly links = [
    {
      labelKey: 'nav.platform',
      href: '/#platform',
      section: 'platform',
    },
    {
      labelKey: 'nav.architecture',
      href: '/#architecture',
      section: 'architecture',
    },
    {
      labelKey: 'nav.diagnostics',
      href: '/#diagnostics',
      section: 'diagnostics',
    },
    {
      labelKey: 'nav.philosophy',
      href: '/#philosophy',
      section: 'philosophy',
    },
    {
      labelKey: 'nav.news',
      href: '/#news',
      section: 'news',
    },
  ];

  private lastY = 0;
@HostListener('window:scroll')
onScroll(): void {
  const y = window.scrollY;

  this.scrolled.set(y > 24);

  // Keep navbar visible while scrolling
  this.hidden.set(false);

  this.lastY = y;
}
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.langOpen()) return;

    const el = event.target as HTMLElement | null;

    if (el && !this.host.nativeElement.contains(el)) {
      this.langOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.langOpen.set(false);
  }

  /**
   * Navigate to a section on the Home page.
   */
  protected goToSection(section: string): void {
    this.closeMenu();
    this.langOpen.set(false);

    // Already on Home page
    if (this.router.url === '/' || this.router.url === '') {
      this.scrollToSection(section);
      return;
    }

    // Coming from Contact / Terms etc.
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        this.scrollToSection(section);
      }, 150);
    });
  }

  private scrollToSection(section: string): void {
    const element = document.getElementById(section);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected toggleLang(): void {
    this.langOpen.update((v) => !v);
  }

  protected pickLang(code: Locale): void {
    this.i18n.setLang(code);
    this.langOpen.set(false);
  }
}
