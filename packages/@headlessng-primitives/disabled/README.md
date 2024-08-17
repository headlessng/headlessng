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

| Data attribute  | Values | Description                     |
| --------------- | ------ | ------------------------------- |
| `data-disabled` | `true` | Added when element is disabled. |

#### Inputs

| Input      | Type      | Default value | Description                                         |
| ---------- | --------- | ------------- | --------------------------------------------------- |
| `disabled` | `boolean` | `false`       | When the 'true' is passed, the element is disabled. |

#### Methods

| Method            | Description                                         |
| ----------------- | --------------------------------------------------- |
| `enable(): void`  | When the method is called, it enables the element.  |
| `disable(): void` | When the method is called, it disables the element. |

#### Outputs

| Output       | Type                 | Description                             |
| ------------ | -------------------- | --------------------------------------- |
| `onEnabled`  | `EventEmitter<void>` | Emitted when element has been enabled.  |
| `onDisabled` | `EventEmitter<void>` | Emitted when element has been disabled. |

#### Properties

| Property   | Type              | Description                                                |
| ---------- | ----------------- | ---------------------------------------------------------- |
| `disabled` | `Signal<boolean>` | Stores information about the disabled state of an element. |

## Accessibility

### ARIA attributes

| ARIA attribute  | Values | Description                     |
| --------------- | ------ | ------------------------------- |
| `aria-disabled` | `true` | Added when element is disabled. |
