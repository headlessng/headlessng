import { Directive, OnDestroy } from '@angular/core';
import { ErrorMessageFieldRef } from '@headlessng/primitives/field';

@Directive({
  exportAs: 'hErrorMessageRef',
  host: {
    '[attr.id]': 'id()'
  },
  selector: '[hErrorMessage]',
  standalone: true
})
export class ErrorMessageDirective extends ErrorMessageFieldRef implements OnDestroy {
  public ngOnDestroy(): void {
    this.destroyRef();
  }
}
