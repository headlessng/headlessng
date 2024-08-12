import { booleanAttribute, Directive, Input, signal } from '@angular/core';

@Directive({
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

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'disabled', transform: booleanAttribute })
  private set isDisabled(value: boolean) {
    this._disabled.set(value);
  }

  public disable(): void {
    this._disabled.set(true);
  }

  public enable(): void {
    this._disabled.set(false);
  }
}
