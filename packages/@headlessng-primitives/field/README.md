# @headlessng/primitives/field

Manages all related attributes and events for fields in forms, such as binding a label to an checkbox with correct aria attributes and click event.

## Usage

```html
<!-- source -->
<div hField>
  <div hCheckbox></div>
  <label hLabel>I accept the privacy policy</label>
  <span hDescription>Agree to the data processing policy in our system.</span>
  <span hErrorMessage>Acceptance of this field is required.</span>
</div>

<!-- rendered -->
<div>
  <div
    role="checkbox"
    [...]
    aria-describedby="h-description-0"
    aria-labelledby="h-label-0"
    aria-invalid="true"
    aria-errormessage="h-error-message-0"></div>
  <label id="h-label-0">I accept the privacy policy</label>
  <span id="h-description-0">Agree to the data processing policy in our system.</span>
  <span id="h-error-message-0">Acceptance of this field is required.</span>
</div>
```

## API

### FieldDirective

#### Export

The directive is exported to a template variable called `hFieldRef`, which stores its instance. Below is an example of using export.

```html
<div hField #ref="hFieldRef"></div>

Label ID: {{ ref.labelId() }}
```

#### Properties

| Property          | Type             | Description                                                              |
| ----------------- | ---------------- | ------------------------------------------------------------------------ |
| `controlId`       | `Signal<string>` | Stores information about the control element's id, e.g. input, checkbox. |
| `descriptionId`   | `Signal<string>` | Stores information about the description element's id.                   |
| `errorMessageIds` | `Signal<string>` | Stores information about the element identifiers of error messages.      |
| `labelId`         | `Signal<string>` | Stores information about the label element's id.                         |
