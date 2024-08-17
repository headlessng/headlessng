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

| Data attribute       | Values | Description                                    |
| -------------------- | ------ | ---------------------------------------------- |
| `data-focused`       | `true` | Added when focus is set on a host element.     |
| `data-focus-visible` | `true` | Added when focus is visible on a host element. |

#### Export

The directive is exported to a template variable called `hFocusRef`, which stores its instance. Below is an example of using export.

```html
<div tabindex="0" hFocus #ref="hFocusRef"></div>

<button (click)="ref.focus()">Focus</button>
```

#### Methods

| Method          | Description                                     |
| --------------- | ----------------------------------------------- |
| `focus(): void` | When called, sets the focus to a host element.  |
| `blur(): void`  | When called, removes focus from a host element. |

#### Outputs

| Output               | Type                        | Description                                    |
| -------------------- | --------------------------- | ---------------------------------------------- |
| `focusedChange`      | `OutputEmitterRef<boolean>` | Emitted after the focus state changes.         |
| `focusVisibleChange` | `OutputEmitterRef<boolean>` | Emitted after the focus visible state changes. |

#### Properties

| Property       | Type              | Description                                       |
| -------------- | ----------------- | ------------------------------------------------- |
| `focused`      | `Signal<boolean>` | Stores information about the focus state.         |
| `focusVisible` | `Signal<boolean>` | Stores information about the focus visible state. |
