import {
  booleanAttribute,
  Directive,
  effect,
  inject,
  Injector,
  input,
  output,
  signal
} from '@angular/core';

@Directive({
  exportAs: 'hRequiredRef',
  host: {
    '[attr.aria-required]': 'required() || undefined',
    '[attr.data-required]': 'required() || undefined',
    '[attr.required]': 'required() || undefined'
  },
  selector: '[hRequired]',
  standalone: true
})
export class RequiredDirective {
  private readonly _injector = inject(Injector);

  private readonly _required = signal<boolean>(false);
  private readonly _requiredEffect = effect(
    () => {
      this.requiredChange.emit(this._required());
    },
    {
      injector: this._injector
    }
  );

  public readonly _requiredInput = input(this._required(), {
    alias: 'required',
    transform: booleanAttribute
  });
  private readonly _requiredInputEffect = effect(
    () => {
      this._required.set(this._requiredInput());
    },
    {
      allowSignalWrites: true,
      injector: this._injector
    }
  );

  public readonly required = this._required.asReadonly();
  public readonly requiredChange = output<boolean>();

  public setRequired(required: boolean): void {
    this._required.set(required);
  }
}
