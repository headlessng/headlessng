# @headlessng/primitives/focus

Manages all attributes, parameters, methods and events necessary to handle focusing.

## Usage

`FocusDirective` is a standalone directive, so you can import it directly in a component or an entire module.

```typescript
import { FocusDirective } from '@headlessng/primitives/focus';

@Component({
  import: [FocusDirective],
  selector: 'app-some',
  template: `<div tabindex="0" hFocus></div>`
})
export class SomeComponent {}
```

## API reference

### FocusDirective

Contains all the attributes, properties, methods, and events needed to read and manage focus.

#### Inputs

| Input | Type | Default value | Description |
| ----- | ---- | ------------- | ----------- |
| -     | -    | -             | -           |

#### Properties

| Property       | Type              | Default value | Description                                                          |
| -------------- | ----------------- | ------------- | -------------------------------------------------------------------- |
| `focused`      | `Signal<boolean>` | `false`       | Stores information about whether a host element has focus.           |
| `focusVisible` | `Signal<boolean>` | `false`       | Stores information about whether focus is visible on a host element. |

#### Methods

| Method          | Description                                     |
| --------------- | ----------------------------------------------- |
| `focus(): void` | When called, sets the focus to a host element.  |
| `blur(): void`  | When called, removes focus from a host element. |

#### Outputs

| Output           | Type                 | Description                                        |
| ---------------- | -------------------- | -------------------------------------------------- |
| `onBlurred`      | `EventEmitter<void>` | Emitted when focus is removed from a host element. |
| `onFocused`      | `EventEmitter<void>` | Emitted when focus is set on a host element.       |
| `onFocusVisible` | `EventEmitter<void>` | Emitted when focus is visible on a host element.   |

#### Data attributes

| Data attribute       | Values | Description                                           |
| -------------------- | ------ | ----------------------------------------------------- |
| `data-focused`       | `true` | Added when focus is set on a host element.            |
| `data-focus-visible` | `true` | Added when focus should be visible on a host element. |

## Examples

### Call method from component

```typescript
import { FocusDirective } from '@headlessng/primitives/focus';

@Component({
  import: [FocusDirective],
  selector: 'app-some',
  template: `<div tabindex="0" hFocus></div>`
})
export class SomeComponent implements AfterViewInit {
  @ViewChild(FocusDirective) focusRef: FocusDirective;

  ngAfterViewInit() {
    this.focusRef.focus();
  }
}
```

### Call method from template

```html
<div hFocus #hFocusRef="hFocusRef" tabindex="0">Element</div>

<button (click)="hFocusRef.focus()">Set focus</button>
```

### Handling the output event

```typescript
import { FocusDirective } from '@headlessng/primitives/focus';

@Component({
  import: [FocusDirective],
  selector: 'app-some',
  template: `<div tabindex="0" hFocus (onFocusVisible)="handleFocusVisible()"></div>`
})
export class SomeComponent {
  handleFocusVisible() {
    console.log('focus is visible');
  }
}
```

### Reading properties from component

```typescript
import { FocusDirective } from '@headlessng/primitives/focus';

@Component({
  import: [FocusDirective],
  selector: 'app-some',
  template: `<div hFocus tabindex="0"></div>`
})
export class SomeComponent implements AfterViewInit {
  @ViewChild(FocusDirective) focusRef: FocusDirective;

  ngAfterViewInit() {
    console.log(
      this.focusRef.focusVisible()
        ? 'The element has visible focus.'
        : 'The element does not have visible focus.'
    );
  }
}
```

### Reading properties from template

```html
<div hFocus #hFocusRef="hFocusRef" tabindex="0">Element</div>

<ng-container *ngIf="hFocusRef.focused()">The element has active focus.</ng-container>
```

### Styling with data attributes

```html
<div hFocus class="element">Element</div>

<style>
  .element[data-focused] {
  }

  .element[data-focus-visible] {
  }
</style>
```

### Styling with own classes

```html
<div
  hFocus
  #hFocusRef="hFocusRef"
  class="element"
  [class.element--focused]="hFocusRef.focused()"
  [class.element--focus-visible]="hFocusRef.focusVisible()">
  Element
</div>

<style>
  .element--focused {
  }

  .element--focus-visible {
  }
</style>
```
