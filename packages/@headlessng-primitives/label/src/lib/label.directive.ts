import { Directive, input } from '@angular/core';

const getId = (() => {
  let id = 0;
  return () => `h-label-${id++}`;
})();

@Directive({
  exportAs: 'hLabelRef',
  host: {
    '[attr.id]': 'id()',
    '[attr.for]': 'htmlFor()'
  },
  selector: 'label[hLabel]',
  standalone: true
})
export class LabelDirective {
  public readonly id = input<string>(getId(), { alias: 'id' });
  public readonly htmlFor = input<string | undefined>(undefined, { alias: 'htmlFor' });
}
