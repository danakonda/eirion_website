import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../shared/icons/icon';
import { Reveal } from '../../shared/reveal';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-speed',
  imports: [Icon, Reveal, TranslatePipe],
  templateUrl:'./speed.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Speed {
  protected readonly traditionalKeys = ['speed.trad1', 'speed.trad2'];
  protected readonly eleanorKeys = ['speed.el1', 'speed.el2'];
}