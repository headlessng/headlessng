# @headlessng/primitives/error-message

An unstyled, fully functional and accessible error message component from which you can create your own styled one.

## Usage

```typescript
import { ErrorMessageDirective } from '@headlessng/primitives/error-message';

@Component({
  import: [ErrorMessageDirective],
  selector: 'app-error-message',
  template: `<span hErrorMessage><ng-content /></span>`,
  standalone: true
})
export class ErrorMessageComponent {}
```

## API reference

### ErrroMessageDirective

Contains all the attributes, properties, methods, and events needed to manage error message component.

#### Export

The directive is exported to a template variable called `hErrorMessageRef`, which stores its instance. Below is an example of using export.

```html
<span hErrorMessage #ref="hErrorMessageRef"></span>

Error message ID: {{ ref.id() }}
```

#### Properties

| Property     | Type                      | Description                               |
| ------------ | ------------------------- | ----------------------------------------- |
| `elementRef` | `ElementRef<HTMLElement>` | Stores the host element reference.        |
| `id`         | `Signal<string>`          | Stores the id of a error message element. |

## Accessibility

### Attributes

| Attribute | Type     | Description       |
| --------- | -------- | ----------------- |
| `id`      | `string` | Always presented. |
