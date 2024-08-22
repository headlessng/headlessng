import { Directive, model } from '@angular/core';

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
  public readonly required = model<boolean>(false);

  public setRequired(required: boolean): void {
    this.required.set(required);
  }
}
