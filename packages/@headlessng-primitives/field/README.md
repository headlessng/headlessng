# @headlessng/primitives/field

Manages all related attributes and events for fields in forms, such as binding a label to an checkbox with correct aria attributes and click event.

## Usage

```html
<!-- source -->
<div hField>
  <div hCheckbox></div>
  <label hLabel>Push notifications</label>
  <span hDescription>Receive app notifications directly to your smartphone.</span>
</div>

<!-- rendered -->
<div>
  <div role="checkbox" [...] aria-describedby="h-description-0" aria-labelledby="h-label-0"></div>
  <label id="h-label-0">Push notifications</label>
  <span id="h-description-0">Receive app notifications directly to your smartphone.</span>
</div>
```

## API

### FieldDirective

#### Properties

| Property        | Type             | Description                                                              |
| --------------- | ---------------- | ------------------------------------------------------------------------ |
| `controlId`     | `Signal<string>` | Stores information about the control element's id, e.g. input, checkbox. |
| `descriptionId` | `Signal<string>` | Stores information about the description element's id.                   |
| `labelId`       | `Signal<string>` | Stores information about the label element's id.                         |
