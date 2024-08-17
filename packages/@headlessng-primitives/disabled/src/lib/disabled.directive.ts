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
  exportAs: 'hDisabledRef',
  host: {
    '[attr.aria-disabled]': 'disabled() || undefined',
    '[attr.data-disabled]': 'disabled() || undefined',
    '[attr.disabled]': `disabled() || undefined`
  },
  selector: '[hDisabled]',
  standalone: true
})
export class DisabledDirective {
  private readonly _injector = inject(Injector);

  private readonly _disabled = signal<boolean>(false);
  private readonly _disabledEffect = effect(
    () => {
      this.disabledChange.emit(this._disabled());
    },
    {
      injector: this._injector
    }
  );

  public readonly disabled = this._disabled.asReadonly();
  public readonly disabledChange = output<boolean>();

  protected readonly _disabledInput = input(this._disabled(), {
    alias: 'disabled',
    transform: booleanAttribute
  });
  private readonly _disabledInputEffect = effect(
    () => {
      this._disabled.set(this._disabledInput());
    },
    {
      allowSignalWrites: true,
      injector: this._injector
    }
  );

  public setDisabled(disabled: boolean): void {
    this._disabled.set(disabled);
  }
}
