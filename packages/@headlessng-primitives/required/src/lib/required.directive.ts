import {
  booleanAttribute,
  Directive,
  effect,
  inject,
  Injector,
  input,
  signal
} from '@angular/core';

@Directive({
  exportAs: 'hRequiredRef',
  host: {
    '[attr.aria-required]': 'required() || undefined',
    '[attr.data-required]': 'required() || undefined'
  },
  selector: '[hRequired]',
  standalone: true
})
export class RequiredDirective {
  private readonly _injector = inject(Injector);

  private readonly _required = signal<boolean>(false);
  public readonly required = this._required.asReadonly();

  protected readonly isRequired = input(this._required(), {
    alias: 'required',
    transform: booleanAttribute
  });
  private readonly _isRequiredEffect = effect(
    () => {
      this._required.set(this.isRequired());
    },
    {
      allowSignalWrites: true,
      injector: this._injector
    }
  );

  public markAsOptional(): void {
    this._required.set(false);
  }

  public markAsRequired(): void {
    this._required.set(true);
  }
}
