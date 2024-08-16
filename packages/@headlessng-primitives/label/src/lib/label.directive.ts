import { Directive, effect, ElementRef, inject, Injector, input } from '@angular/core';
import { FieldDirective } from '@headlessng/primitives/field';

const getId = (() => {
  let id = 0;
  return () => `h-label-${id++}`;
})();

@Directive({
  exportAs: 'hLabelRef',
  host: {
    '[attr.id]': 'id()'
  },
  selector: 'label[hLabel]',
  standalone: true
})
export class LabelDirective {
  private readonly _injector = inject(Injector);
  private readonly _fieldRef = inject(FieldDirective, { optional: true });
  private readonly _fieldRefEffect = effect(
    () => {
      this._fieldRef?.registerLabelRef(this);
    },
    {
      allowSignalWrites: true,
      injector: this._injector
    }
  );

  public readonly elementRef = inject<ElementRef<HTMLLabelElement>>(ElementRef);
  public readonly id = input<string>(getId(), { alias: 'id' });
}
