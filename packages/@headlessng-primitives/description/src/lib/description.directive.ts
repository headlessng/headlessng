import { Directive } from '@angular/core';
import { DescriptionFieldRef } from '@headlessng/primitives/field';

@Directive({
  exportAs: 'hDescriptionRef',
  host: {
    '[attr.id]': 'id()'
  },
  selector: '[hDescription]',
  standalone: true
})
export class DescriptionDirective extends DescriptionFieldRef {}
