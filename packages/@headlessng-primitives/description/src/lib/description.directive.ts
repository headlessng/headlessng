import { Directive, effect, ElementRef, inject, Injector, input } from '@angular/core';
import { FieldDirective, FieldElementRef } from '@headlessng/primitives/field';

const getId = (() => {
  let id = 0;
  return () => `h-description-${id++}`;
})();

@Directive({
  exportAs: 'hDescriptionRef',
  host: {
    '[attr.id]': 'id()'
  },
  selector: '[hDescription]',
  standalone: true
})
export class DescriptionDirective implements FieldElementRef {
  private readonly _injector = inject(Injector);
  private readonly _fieldRef = inject(FieldDirective, { optional: true });
  private readonly _fieldRefEffect = effect(
    () => {
      this._fieldRef?.registerDescriptionRef(this);
    },
    {
      allowSignalWrites: true,
      injector: this._injector
    }
  );

  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly id = input<string>(getId(), { alias: 'id' });
}
