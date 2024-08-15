# @headlessng/primitives/description

An unstyled, fully functional and accessible description component from which you can create your own styled one.

## Usage

`DescriptionDirective` is a standalone directive, so you can import it directly in a standalone component or an entire module.

```typescript
import { DescriptionDirective } from '@headlessng/primitives/description';

@Component({
  import: [DescriptionDirective],
  selector: 'app-description',
  template: `<span hDescription></span>`,
  standalone: true
})
export class DescriptionComponent {}
```

## API reference

### DescriptionDirective

Contains all the attributes, properties, methods, and events needed to manage description component.

#### Inputs

| Input | Type   | Required | Default value             | Description                                        |
| ----- | ------ | -------- | ------------------------- | -------------------------------------------------- |
| `id`  | string | no       | `'h-description-{index}'` | If passed, it will be used for the "id" attribute. |

#### Properties

| Property | Type             | Default value                   | Description                                 |
| -------- | ---------------- | ------------------------------- | ------------------------------------------- |
| `id`     | `Signal<string>` | `'h-description-{uniqueIndex}'` | Stores the "id" attribute of a description. |
