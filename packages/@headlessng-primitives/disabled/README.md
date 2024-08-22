# @headlessng/primitives/disabled

Manages all attributes, parameters, methods and events necessary to handle disabled state.

## Usage

```typescript
import { DisabledDirective } from '@headlessng/primitives/disabled';

@Component({
  import: [DisabledDirective],
  selector: 'app-some',
  template: `<input hDisabled></input>`
})
export class SomeComponent {}
```

## API reference

### DisabledDirective

Contains all the attributes, properties, methods, and events needed to read and manage disabled state.

#### Data attributes

| Data attribute  | Values | Description                       |
| --------------- | ------ | --------------------------------- |
| `data-disabled` | `true` | Present when element is disabled. |

#### Export

The directive is exported to a template variable called `hDisabledRef`, which stores its instance. Below is an example of using export.

```html
<input hDisabled #ref="hDisabledRef" [disabled]="true" />

Disabled state: {{ ref.disabled() }}
```

#### Inputs

| Input      | Type      | Default value | Description                                         |
| ---------- | --------- | ------------- | --------------------------------------------------- |
| `disabled` | `boolean` | `false`       | When the 'true' is passed, the element is disabled. |

#### Methods

| Method                                 | Description                 |
| -------------------------------------- | --------------------------- |
| `setDisabled(disabled: boolean): void` | Changes the disabled state. |

#### Outputs

| Output           | Type                   | Description                              |
| ---------------- | ---------------------- | ---------------------------------------- |
| `disabledChange` | `ModelSignal<boolean>` | Emitted when the disabled state changes. |

#### Properties

| Property   | Type                   | Description                                  |
| ---------- | ---------------------- | -------------------------------------------- |
| `disabled` | `ModelSignal<boolean>` | Stores information about the disabled state. |

## Accessibility

### Attributes

| Attribute       | Values | Description                       |
| --------------- | ------ | --------------------------------- |
| `aria-disabled` | `true` | Present when element is disabled. |
| `disabled`      | `true` | Present when element is disabled. |
