import { booleanAttribute, Directive, Input, signal } from '@angular/core';

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
  private readonly _required = signal<boolean>(false);
  public readonly required = this._required.asReadonly();

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'required', transform: booleanAttribute })
  private set isRequired(value: boolean) {
    this._required.set(value);
  }

  public markAsOptional(): void {
    this._required.set(false);
  }

  public markAsRequired(): void {
    this._required.set(true);
  }
}
