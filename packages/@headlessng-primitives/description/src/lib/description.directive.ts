import { Directive, input } from '@angular/core';

const getId = (() => {
  let id = 0;
  return () => `h-description-${id++}`;
})();

@Directive({
  exportAs: 'hDescriptionRef',
  host: {
    '[attr.id]': 'id()',
    '[attr.for]': 'htmlFor()'
  },
  selector: '[hDescription]',
  standalone: true
})
export class DescriptionDirective {
  public readonly id = input<string>(getId(), { alias: 'id' });
}
