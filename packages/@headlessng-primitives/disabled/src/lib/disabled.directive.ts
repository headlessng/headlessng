import { Directive, model } from '@angular/core';

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
  public readonly disabled = model(false);

  public setDisabled(disabled: boolean): void {
    this.disabled.set(disabled);
  }
}
