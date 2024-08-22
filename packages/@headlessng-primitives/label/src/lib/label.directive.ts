import { Directive } from '@angular/core';
import { LabelElement } from '@headlessng/primitives/field';

@Directive({
  exportAs: 'hLabelRef',
  selector: 'label[hLabel]',
  standalone: true
})
export class LabelDirective extends LabelElement {}
