# AutoFocus

`AutoFocus` directive manages focus on the focusable element once the view is initiated.

## Table of Contents
* [Import](#import)
* [Usage](#usage)
* [API](#api)
    * [AutoFocusDirective](#autofocusdirective)
        * [Inputs](#inputs)

## Import

Before using `AutoFocus` you need to import `AutoFocusDirective` in your module or component.

```typescript
import { AutoFocusDirective } from '@headlessng/primitives/autofocus';
```

## Usage

To use `AutoFocusDirective` add `hAutoFocus` attribute to the focusable element.

```html
<input type="text" [hAutoFocus]="true" />
```

## API

### AutoFocusDirective

#### Inputs

| Name | Type | Default value | Description |
|---|---|---|---|
| `hAutoFocus` | boolean | false | If set to `true`, specifies that the component should automatically gain focus once loaded. |
