import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../../shared/reveal';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-trusted-by',
  templateUrl: './trusted-by.html',
  imports: [Reveal, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrustedBy {
  protected readonly logos = [
    'GENEID',
    'Cleveland Clinic',
    'Johns Hopkins Medicine',
    'Quest Diagnostics',
    'GENEID',
    'Cleveland Clinic',
    'Johns Hopkins Medicine',
    'Quest Diagnostics',
    'GENEID',
    'Cleveland Clinic',
    'Johns Hopkins Medicine',
    'Quest Diagnostics',
  ];
}