import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../../shared/reveal';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-testimonial',
  imports: [Reveal, TranslatePipe],
  templateUrl: './testimonial.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Testimonial {}