# @headlessng/primitives/required

Manages all attributes, parameters, methods and events necessary to handle required state.

## Usage

```typescript
import { RequiredDirective } from '@headlessng/primitives/required';

@Component({
  import: [RequiredDirective],
  selector: 'app-some',
  template: `<input hRequired [required]="true" />`
})
export class SomeComponent {}
```

## API reference

### RequiredDirective

Contains all the attributes, properties, methods, and events needed to read and manage required state.

#### Data attributes

| Data attribute  | Values | Description                       |
| --------------- | ------ | --------------------------------- |
| `data-required` | `true` | Present when element is required. |

#### Export

The directive is exported to a template variable called `hRequiredRef`, which stores its instance. Below is an example of using export.

```html
<input hRequired #ref="hRequiredRef" [required]="true" />

Required state: {{ ref.required() }}
```

#### Inputs

| Input      | Type      | Default value | Description                                         |
| ---------- | --------- | ------------- | --------------------------------------------------- |
| `required` | `boolean` | `false`       | When the 'true' is passed, the element is required. |

#### Methods

| Method                                 | Description                 |
| -------------------------------------- | --------------------------- |
| `setRequired(required: boolean): void` | Changes the required state. |

#### Outputs

| Output           | Type                   | Description                              |
| ---------------- | ---------------------- | ---------------------------------------- |
| `requiredChange` | `ModelSignal<boolean>` | Emitted when the required state changes. |

#### Properties

| Property   | Type                   | Description                                  |
| ---------- | ---------------------- | -------------------------------------------- |
| `required` | `ModelSignal<boolean>` | Stores information about the required state. |

## Accessibility

### Attributes

| Attribute       | Type   | Description                       |
| --------------- | ------ | --------------------------------- |
| `aria-required` | `true` | Present when element is required. |
| `required`      | `true` | Present when element is required. |
