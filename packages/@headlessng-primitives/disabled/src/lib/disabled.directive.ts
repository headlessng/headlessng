import { booleanAttribute, Directive, effect, Input, output, signal } from '@angular/core';

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
  private readonly _disabled = signal<boolean>(false);
  public readonly disabled = this._disabled.asReadonly();

  public readonly onEnabled = output<void>();
  public readonly onDisabled = output<void>();

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'disabled', transform: booleanAttribute })
  private set isDisabled(value: boolean) {
    this._disabled.set(value);
  }

  constructor() {
    effect(() => {
      if (this._disabled()) {
        this.onDisabled.emit();
      } else {
        this.onEnabled.emit();
      }
    });
  }

  public disable(): void {
    this._disabled.set(true);
  }

  public enable(): void {
    this._disabled.set(false);
  }
}
