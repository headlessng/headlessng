import { Directive, OnDestroy } from '@angular/core';
import { LabelFieldRef } from '@headlessng/primitives/field';

@Directive({
  exportAs: 'hLabelRef',
  host: {
    '[attr.id]': 'id()'
  },
  selector: 'label[hLabel]',
  standalone: true
})
export class LabelDirective extends LabelFieldRef implements OnDestroy {
  public ngOnDestroy(): void {
    this.destroyRef();
  }
}
