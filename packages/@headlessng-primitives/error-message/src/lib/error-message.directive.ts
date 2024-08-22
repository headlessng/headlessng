import { Directive } from '@angular/core';
import { ErrorMessageElement } from '@headlessng/primitives/field';

@Directive({
  exportAs: 'hErrorMessageRef',
  selector: '[hErrorMessage]',
  standalone: true
})
export class ErrorMessageDirective extends ErrorMessageElement {}
