# @headlessng/primitives/checkbox

An unstyled, fully functional and accessible checkbox component from which you can create your own styled one.

## Usage

```typescript
import {
  CheckboxDirective,
  CheckboxIndicatorDirective,
  CheckboxValue
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
  public readonly model = model.required<CheckboxValue>();
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

#### Inputs

| Input      | Type      | Required | Default value | Description                                          |
| ---------- | --------- | -------- | ------------- | ---------------------------------------------------- |
| `disabled` | `boolean` | no       | `false`       | When the 'true' is passed, the checkbox is disabled. |
| `required` | `boolean` | no       | `false`       | When the 'true' is passed, the checkbox is required. |

#### Outputs

| Output           | Type                              | Description                                  |
| ---------------- | --------------------------------- | -------------------------------------------- |
| `onBlurred`      | `OutputEmitterRef<void>`          | Emitted when focus is removed from checkbox. |
| `onChanged`      | `OutputEmitterRef<CheckboxValue>` | Emitted when the checkbox value changes.     |
| `onEnabled`      | `OutputEmitterRef<void>`          | Emitted when checkbox has been enabled.      |
| `onFocused`      | `OutputEmitterRef<void>`          | Emitted when focus is set on checkbox.       |
| `onFocusVisible` | `OutputEmitterRef<void>`          | Emitted when focus is visible on checkbox.   |
| `onDisabled`     | `OutputEmitterRef<void>`          | Emitted when checkbox has been disabled.     |

#### Properties

| Property      | Type                                         | Description                                              |
| ------------- | -------------------------------------------- | -------------------------------------------------------- |
| `disabledRef` | [`DisabledDirective`](../disabled/README.md) | A instance of [DisabledDirective](../disabled/README.md) |
| `focusRef`    | [`FocusDirective`](../focus/README.md)       | A instance of [FocusDirective](../focus/README.md)       |
| `requiredRef` | [`RequiredDirective`](../required/README.md) | A instance to [RequiredDirective](../disabled/README.md) |
| `state`       | `Signal<CheckboxState>`                      | Stores the current state of the checkbox.                |
| `value`       | `Signal<CheckboxValue>`                      | Stores the current value of the checkbox.                |

#### Types

| Type            | Values                                |
| --------------- | ------------------------------------- |
| `CheckboxState` | `'unchecked' \| 'mixed' \| 'checked'` |
| `CheckboxValue` | `boolean \| 'mixed'`                  |

### CheckboxIndicatorDirective

Structural directive to display icons depending on the state of a checkbox.

#### Inputs

| Input                 | Type            | Required | Default value | Description                                                           |
| --------------------- | --------------- | -------- | ------------- | --------------------------------------------------------------------- |
| `*hCheckboxIndicator` | `CheckboxState` | yes      | -             | Pass the state of the checkbox for which you want to display an icon. |

## Accessibility

### ARIA attributes

| ARIA attribute     | Type            | Description                                                                                                                                      |
| ------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `aria-checked`     | `CheckboxValue` | Present always with the current checkbox value.                                                                                                  |
| `aria-describedby` | `string`        | Presented when the checkbox is used together with [`FieldDirective`](../field/README.md) and [`DescriptionDirective`](../description/README.md). |
| `aria-disabled`    | `true`          | Present when checkbox is disabled.                                                                                                               |
| `aria-labelledby`  | `string`        | Presented when the checkbox is used together with [`FieldDirective`](../field/README.md) and [`LabelDirective`](../label/README.md).             |
| `aria-required`    | `true`          | Present when checkbox is required.                                                                                                               |
| `role`             | `checkbox`      | Present always.                                                                                                                                  |
| `tabindex`         | `0 \| -1`       | If the checkbox is enabled it sets the value to "0", otherwise to "-1".                                                                          |

### Keyboard interactions

| Key     | Description                                   |
| ------- | --------------------------------------------- |
| `Space` | Checks/unchecks the checkbox when is enabled. |
