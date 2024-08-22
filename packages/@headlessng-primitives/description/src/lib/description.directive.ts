import { Directive } from '@angular/core';
import { DescriptionElement } from '@headlessng/primitives/field';

@Directive({
  exportAs: 'hDescriptionRef',
  selector: '[hDescription]',
  standalone: true
})
export class DescriptionDirective extends DescriptionElement {}
