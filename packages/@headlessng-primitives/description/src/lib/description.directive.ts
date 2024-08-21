import { Directive, OnDestroy } from '@angular/core';
import { DescriptionFieldRef } from '@headlessng/primitives/field';

@Directive({
  exportAs: 'hDescriptionRef',
  host: {
    '[attr.id]': 'id()'
  },
  selector: '[hDescription]',
  standalone: true
})
export class DescriptionDirective extends DescriptionFieldRef implements OnDestroy {
  public ngOnDestroy(): void {
    this.destroyRef();
  }
}
