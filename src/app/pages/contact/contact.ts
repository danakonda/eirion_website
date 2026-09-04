import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';

import { Title } from '@angular/platform-browser';

import { Icon } from '../../shared/icons/icon';
import { Reveal } from '../../shared/reveal';

import { LanguageService } from '../../i18n/language.service';
import { TranslatePipe } from '../../i18n/translate.pipe';

const CONTACT_EMAIL = 'info@eirionai.com';
const WHATSAPP_DIGITS = '97512345678';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactErrors {
  name?: string;
  email?: string;
  message?: string;
}

@Component({
  selector: 'app-contact',

  imports: [
    Icon,
    Reveal,
    TranslatePipe,
  ],

  templateUrl: './contact.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact implements OnInit {

  private readonly title = inject(Title);
  private readonly i18n = inject(LanguageService);

  protected readonly name = signal('');
  protected readonly email = signal('');
  protected readonly org = signal('');
  protected readonly message = signal('');

  protected readonly errors =
    signal<ContactErrors>({});


  // ============================================================
  // INITIALIZE
  // ============================================================

  ngOnInit(): void {
    this.title.setTitle(
      this.i18n.t('meta.title.contact')
    );
  }


  // ============================================================
  // SET FORM FIELD
  // ============================================================

  protected setField(
    field:
      | 'name'
      | 'email'
      | 'org'
      | 'message',
    value: string
  ): void {

    this[field].set(value);

    if (
      field !== 'org' &&
      this.errors()[field]
    ) {

      this.errors.update((e) => ({
        ...e,
        [field]: undefined,
      }));
    }
  }


  // ============================================================
  // INPUT CLASS
  // ============================================================

  protected inputClass(
    hasError?: string
  ): string {

    const base =
      'w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-forest-950 transition-colors placeholder:text-ink/35 focus:outline-none';

    return hasError
      ? `${base} border-red-400`
      : `${base} border-forest-800/15 focus:border-forest-500`;
  }


  // ============================================================
  // BUILD MESSAGE
  // ============================================================

  private buildBody(): string {

    return [
      `Name: ${this.name()}`,
      `Email: ${this.email()}`,

      this.org().trim() &&
        `Organisation: ${this.org()}`,

      '',

      this.message(),

      '',

      '— Sent from eirion.ai',
    ]
      .filter(Boolean)
      .join('\n');
  }


  // ============================================================
  // VALIDATE
  // ============================================================

  private validate(): boolean {

    const errs: ContactErrors = {};

    if (!this.name().trim()) {

      errs.name =
        this.i18n.t(
          'contact.errName'
        );
    }


    if (!this.email().trim()) {

      errs.email =
        this.i18n.t(
          'contact.errEmailReq'
        );

    } else if (
      !EMAIL_RE.test(this.email())
    ) {

      errs.email =
        this.i18n.t(
          'contact.errEmailBad'
        );
    }


    if (!this.message().trim()) {

      errs.message =
        this.i18n.t(
          'contact.errMsg'
        );
    }


    this.errors.set(errs);

    return Object.keys(errs).length === 0;
  }


  // ============================================================
  // SUBMIT EMAIL
  // ============================================================

  protected onSubmit(
    event: Event
  ): void {

    event.preventDefault();

    if (!this.validate()) {
      return;
    }


    const subject =
      `ELEANOR enquiry — ${this.name()}${
        this.org().trim()
          ? ` (${this.org()})`
          : ''
      }`;


    window.location.href =
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(
        this.buildBody()
      )}`;
  }


  // ============================================================
  // SEND WHATSAPP
  // ============================================================

  protected sendWhatsApp(): void {

    if (!this.validate()) {
      return;
    }


    const url =
      `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(
        this.buildBody()
      )}`;


    window.open(
      url,
      '_blank',
      'noopener,noreferrer'
    );
  }
}