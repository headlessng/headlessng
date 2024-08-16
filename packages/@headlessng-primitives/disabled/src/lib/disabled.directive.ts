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
    '[attr.data-disabled]': 'disabled() || undefined'
  },
  selector: '[hDisabled]',
  standalone: true
})
export class DisabledDirective {
  private readonly _injector = inject(Injector);

  private readonly _disabled = signal<boolean>(false);
  public readonly disabled = this._disabled.asReadonly();
  private readonly _disabledEffect = effect(
    () => {
      if (this.disabled()) {
        this.onDisabled.emit();
      } else {
        this.onEnabled.emit();
      }
    },
    {
      injector: this._injector
    }
  );

  public readonly onEnabled = output<void>();
  public readonly onDisabled = output<void>();

  public readonly isDisabled = input(this._disabled(), {
    alias: 'disabled',
    transform: booleanAttribute
  });
  private readonly _isDisabledEffect = effect(
    () => {
      this._disabled.set(this.isDisabled());
    },
    {
      allowSignalWrites: true,
      injector: this._injector
    }
  );

  public disable(): void {
    this._disabled.set(true);
  }

  public enable(): void {
    this._disabled.set(false);
  }
}
