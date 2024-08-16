# @headlessng/primitives/focus

Manages all attributes, parameters, methods and events necessary to handle focusing.

## Usage

```typescript
import { FocusDirective } from '@headlessng/primitives/focus';

@Component({
  import: [FocusDirective],
  selector: 'app-some',
  template: `<div tabindex="0" hFocus></div>`
})
export class SomeComponent {}
```

## API reference

### FocusDirective

Contains all the attributes, properties, methods, and events needed to read and manage focus.

#### Data attributes

| Data attribute       | Values | Description                                           |
| -------------------- | ------ | ----------------------------------------------------- |
| `data-focused`       | `true` | Added when focus is set on a host element.            |
| `data-focus-visible` | `true` | Added when focus should be visible on a host element. |

#### Inputs

| Input | Type | Default value | Description |
| ----- | ---- | ------------- | ----------- |
| -     | -    | -             | -           |

#### Methods

| Method          | Description                                     |
| --------------- | ----------------------------------------------- |
| `focus(): void` | When called, sets the focus to a host element.  |
| `blur(): void`  | When called, removes focus from a host element. |

#### Outputs

| Output           | Type                 | Description                                        |
| ---------------- | -------------------- | -------------------------------------------------- |
| `onBlurred`      | `EventEmitter<void>` | Emitted when focus is removed from a host element. |
| `onFocused`      | `EventEmitter<void>` | Emitted when focus is set on a host element.       |
| `onFocusVisible` | `EventEmitter<void>` | Emitted when focus is visible on a host element.   |

#### Properties

| Property       | Type              | Default value | Description                                                          |
| -------------- | ----------------- | ------------- | -------------------------------------------------------------------- |
| `focused`      | `Signal<boolean>` | `false`       | Stores information about whether a host element has focus.           |
| `focusVisible` | `Signal<boolean>` | `false`       | Stores information about whether focus is visible on a host element. |
