# @headlessng/primitives/invalid

Manages all attributes, parameters, methods and events necessary to handle invalid state.

## Usage

```typescript
import { InvalidDirective } from '@headlessng/primitives/invalid';

@Component({
  import: [InvalidDirective],
  selector: 'app-some',
  template: `<input [formControl]="control" hInvalid />`,
  standalone: true,
  styles: `
    input[data-invalid] {
      /* handle invalid state */
    }
  `
})
export class SomeComponent {
  public readonly control = new FormControl('', [Validators.required]);
}
```

## API reference

### InvalidDirective

Contains all the attributes, properties, methods, and events needed to read and manage invalid state.

#### Data attributes

| Data attribute | Values | Description                      |
| -------------- | ------ | -------------------------------- |
| `data-invalid` | `true` | Present when element is invalid. |

#### Export

The directive is exported to a template variable called `hInvalidRef`, which stores its instance. Below is an example of using export.

```html
<input #ref="hInvalidRef" [formControl]="control" hInvalid />

Invalid state: {{ ref.invalid() }}
```

#### Outputs

| Output          | Type                        | Description                             |
| --------------- | --------------------------- | --------------------------------------- |
| `invalidChange` | `OutputEmitterRef<boolean>` | Emitted when the invalid state changes. |

#### Properties

| Property  | Type                      | Description                                 |
| --------- | ------------------------- | ------------------------------------------- |
| `invalid` | `Signal<boolean \| null>` | Stores information about the invalid state. |

## Accessibility

### Attributes

| Attribute      | Values | Description                      |
| -------------- | ------ | -------------------------------- |
| `aria-invalid` | `true` | Present when element is invalid. |
