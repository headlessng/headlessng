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

#### Properties

| Property     | Type                      | Description                             |
| ------------ | ------------------------- | --------------------------------------- |
| `elementRef` | `ElementRef<HTMLElement>` | Stores the host element reference.      |
| `id`         | `Signal<string>`          | Stores the id of a description element. |

## Accessibility

### Attributes

| Attribute | Type     | Description                                                               |
| --------- | -------- | ------------------------------------------------------------------------- |
| `id`      | `string` | Always presented. Automatically generated description element identifier. |
