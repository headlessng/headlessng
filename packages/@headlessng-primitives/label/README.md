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

#### Inputs

| Input | Type   | Required | Default value       | Description                                                                                  |
| ----- | ------ | -------- | ------------------- | -------------------------------------------------------------------------------------------- |
| `id`  | string | no       | `'h-label-{index}'` | Automatically generated identifier for the "label" element - is used for the "id" attribute. |

#### Properties

| Property     | Type                           | Description                        |
| ------------ | ------------------------------ | ---------------------------------- |
| `elementRef` | `ElementRef<HTMLLabelElement>` | Stores the host element reference. |
| `id`         | `Signal<string>`               | Stores the ID of a label element.  |
