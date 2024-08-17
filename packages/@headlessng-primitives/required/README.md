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

| Data attribute  | Values | Description                     |
| --------------- | ------ | ------------------------------- |
| `data-required` | `true` | Added when element is required. |

#### Inputs

| Input      | Type      | Default value | Description                                         |
| ---------- | --------- | ------------- | --------------------------------------------------- |
| `required` | `boolean` | `false`       | When the 'true' is passed, the element is required. |

#### Methods

| Method                   | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| `markAsOptional(): void` | When the method is called, it marks element as optional. |
| `markAsRequired(): void` | When the method is called, it marks element as required. |

#### Properties

| Property   | Type              | Description                                                |
| ---------- | ----------------- | ---------------------------------------------------------- |
| `required` | `Signal<boolean>` | Stores information about the required state of an element. |

## Accessibility

### Attributes

| Attribute       | Type   | Description                     |
| --------------- | ------ | ------------------------------- |
| `aria-required` | `true` | Added when element is required. |
