# @headlessng/primitives/checkbox

An unstyled, fully functional and accessible checkbox component from which you can create your own styled one.

## Usage

```typescript
import {
  CheckboxDirective,
  CheckboxIndicatorDirective,
  CheckboxChecked
} from '@headlessng/primitives/checkbox';

@Component({
  import: [CheckboxDirective, CheckboxIndicatorDirective],
  selector: 'app-checkbox',
  template: `
    <div
      hCheckbox
      class="checkbox"
      [(ngModel)]="model"
      [disabled]="disabled()"
      [required]="required()">
      <ng-container *hCheckboxIndicator="'checked'">
        <!-- icon for "checked" state -->
      </ng-container>
      <ng-container *hCheckboxIndicator="'mixed'">
        <!-- icon for "mixed" state -->
      </ng-container>
    </div>
  `,
  styles: `
    .checkbox {
      /* default styles */
    }

    .checkbox[data-state='checked'],
    .checkbox[data-state='mixed'] {
      /* checked or mixed state */
    }

    .checkbox[data-disabled] {
      /* disabled state */
    }

    .checkbox[data-focus-visible] {
      /* focus visible state */
    }
  `,
  standalone: true
})
export class CheckboxComponent {
  public readonly disabled = input<boolean>(false);
  public readonly model = model.required<CheckboxChecked>();
  public readonly required = input<boolean>(false);
}
```

## API reference

### CheckboxDirective

Contains all the attributes, properties, methods, and events needed to manage checkbox component.

#### Data attributes

| Data attribute         | Type            | Description                                |
| ---------------------- | --------------- | ------------------------------------------ |
| `[data-disabled]`      | `true`          | Present when checkbox is disabled.         |
| `[data-focused]`       | `true`          | Present when focus is set on checkbox.     |
| `[data-focus-visible]` | `true`          | Present when focus is visible on checkbox. |
| `[data-state]`         | `CheckboxState` | Informs about the current checkbox status. |
| `[data-required]`      | `true`          | Present when checkbox is required.         |

#### Export

The directive is exported to a template variable called `hCheckboxRef`, which stores its instance. Below is an example of using export.

```html
<div hCheckbox #ref="hCheckboxRef"></div>

Checkbox state: {{ ref.state() }}
```

#### Inputs

| Input      | Type      | Required | Default value | Description                                          |
| ---------- | --------- | -------- | ------------- | ---------------------------------------------------- |
| `disabled` | `boolean` | no       | `false`       | When the 'true' is passed, the checkbox is disabled. |
| `required` | `boolean` | no       | `false`       | When the 'true' is passed, the checkbox is required. |

#### Outputs

| Output               | Type                                | Description                                        |
| -------------------- | ----------------------------------- | -------------------------------------------------- |
| `checkedChange`      | `OutputEmitterRef<CheckboxChecked>` | Emitted when checked value has been changed.       |
| `disabledChange`     | `OutputEmitterRef<boolean>`         | Emitted when disabled state has been changed.      |
| `focusedChange`      | `OutputEmitterRef<boolean>`         | Emitted when focus state has been changed.         |
| `focusVisibleChange` | `OutputEmitterRef<boolean>`         | Emitted when focus visible state has been changed. |
| `requiredChange`     | `OutputEmitterRef<boolean>`         | Emitted when required state has been changed.      |

#### Properties

| Property      | Type                                         | Description                                              |
| ------------- | -------------------------------------------- | -------------------------------------------------------- |
| `checked`     | `Signal<CheckboxChecked>`                    | Stores the current checked value of the checkbox.        |
| `disabledRef` | [`DisabledDirective`](../disabled/README.md) | A instance of [DisabledDirective](../disabled/README.md) |
| `elementRef`  | `ElementRef<HTMLElement>`                    | Stores the host element reference.                       |
| `focusRef`    | [`FocusDirective`](../focus/README.md)       | A instance of [FocusDirective](../focus/README.md)       |
| `id`          | `Signal<string>`                             | Stores the id of a checkbox element.                     |
| `requiredRef` | [`RequiredDirective`](../required/README.md) | A instance to [RequiredDirective](../disabled/README.md) |
| `state`       | `Signal<CheckboxState>`                      | Stores the current state of the checkbox.                |

#### Types

| Type              | Values                                |
| ----------------- | ------------------------------------- |
| `CheckboxState`   | `'unchecked' \| 'mixed' \| 'checked'` |
| `CheckboxChecked` | `boolean \| 'mixed'`                  |

### CheckboxIndicatorDirective

Structural directive to display icons depending on the state of a checkbox.

#### Inputs

| Input                 | Type            | Required | Default value | Description                                                           |
| --------------------- | --------------- | -------- | ------------- | --------------------------------------------------------------------- |
| `*hCheckboxIndicator` | `CheckboxState` | yes      | -             | Pass the state of the checkbox for which you want to display content. |

## Accessibility

### Attributes

| Attribute          | Type              | Description                                                                                                                                                                |
| ------------------ | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-checked`     | `CheckboxChecked` | Presented always with the current checkbox checked value.                                                                                                                  |
| `aria-describedby` | `string`          | A reference identifier to the [`DescriptionDirective`](../description/README.md) host element. Presented when the common parent is [`FieldDirective`](../field/README.md). |
| `aria-disabled`    | `true`            | Presented when checkbox is disabled.                                                                                                                                       |
| `aria-labelledby`  | `string`          | A reference identifier to the [`LabelDirective`](../description/README.md) host element. Presented when the common parent is [`FieldDirective`](../field/README.md).       |
| `aria-required`    | `true`            | Presented when checkbox is required.                                                                                                                                       |
| `disabled`         | `true`            | Presented when checkbox is disabled.                                                                                                                                       |
| `id`               | `string`          | Always presented. Automatically generated checkbox element identifier.                                                                                                     |
| `required`         | `true`            | Presented when checkbox is required.                                                                                                                                       |
| `role`             | `checkbox`        | Presented always.                                                                                                                                                          |
| `tabindex`         | `0 \| -1`         | Presented always. If the checkbox is enabled it sets the value to "0", otherwise to "-1".                                                                                  |

### Keyboard interactions

| Key     | Description                                   |
| ------- | --------------------------------------------- |
| `Space` | Checks/unchecks the checkbox when is enabled. |
