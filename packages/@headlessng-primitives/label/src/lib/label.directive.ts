import { Directive } from '@angular/core';
import { LabelFieldRef } from '@headlessng/primitives/field';

@Directive({
  exportAs: 'hLabelRef',
  host: {
    '[attr.id]': 'id()'
  },
  selector: 'label[hLabel]',
  standalone: true
})
export class LabelDirective extends LabelFieldRef {}
