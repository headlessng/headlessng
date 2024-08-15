# @headlessng/primitives/label

An unstyled, fully functional and accessible label component from which you can create your own styled one.

## Usage

`LabelDirective` is a standalone directive, so you can import it directly in a standalone component or an entire module.

```typescript
import { LabelDirective } from '@headlessng/primitives/label';

@Component({
  import: [LabelDirective],
  selector: 'app-label',
  template: `<label hLabel></label>`,
  standalone: true
})
export class LabelComponent {}
```

## API reference

### LabelDirective

Contains all the attributes, properties, methods, and events needed to manage label component.

#### Inputs

| Input     | Type   | Required | Default value       | Description                                         |
| --------- | ------ | -------- | ------------------- | --------------------------------------------------- |
| `id`      | string | no       | `'h-label-{index}'` | If passed, it will be used for the "id" attribute.  |
| `htmlFor` | string | no       | `undefined`         | If passed, it will be used for the "for" attribute. |

#### Properties

| Property  | Type                          | Default value             | Description                            |
| --------- | ----------------------------- | ------------------------- | -------------------------------------- |
| `id`      | `Signal<string>`              | `'h-label-{uniqueIndex}'` | Stores the "id" attribute of a label.  |
| `htmlFor` | `Signal<string \| undefined>` | `undefined`               | Stores the "for" attribute of a label. |

## Accessibility

### ARIA attributes

| ARIA attribute | Type                  | Description                              |
| -------------- | --------------------- | ---------------------------------------- |
| `for`          | `string \| undefined` | Presents when "htmlFor" input is passed. |
