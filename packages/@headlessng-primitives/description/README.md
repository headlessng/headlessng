# @headlessng/primitives/description

An unstyled, fully functional and accessible description component from which you can create your own styled one.

## Usage

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

| Input | Type   | Required | Default value             | Description                                                                                      |
| ----- | ------ | -------- | ------------------------- | ------------------------------------------------------------------------------------------------ |
| `id`  | string | no       | `'h-description-{index}'` | Automatically generated identifier for the description element - is used for the "id" attribute. |

#### Properties

| Property | Type             | Description                               |
| -------- | ---------------- | ----------------------------------------- |
| `id`     | `Signal<string>` | Stores the "id" of a description element. |
