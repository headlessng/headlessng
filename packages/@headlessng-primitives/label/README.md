# @headlessng/primitives/label

An unstyled, fully functional and accessible label component from which you can create your own styled one.

## Usage

```typescript
import { LabelDirective } from '@headlessng/primitives/label';

@Component({
  import: [LabelDirective],
  selector: 'app-label',
  standalone: true,
  template: `<label hLabel class="label"><ng-content /></label>`,
  styles: `
    .label {
      /* styles */
    }
  `
})
export class LabelComponent {}
```

## API reference

### LabelDirective

Contains all the attributes, properties, methods, and events needed to manage label component.

#### Properties

| Property     | Type                           | Description                        |
| ------------ | ------------------------------ | ---------------------------------- |
| `elementRef` | `ElementRef<HTMLLabelElement>` | Stores the host element reference. |
| `id`         | `Signal<string>`               | Stores the id of a label element.  |

## Accessibility

### Attributes

| Attribute | Type     | Description                                                         |
| --------- | -------- | ------------------------------------------------------------------- |
| `id`      | 'string' | Always presented. Automatically generated label element identifier. |
