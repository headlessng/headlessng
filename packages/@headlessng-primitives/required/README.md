# @headlessng/primitives/required

Manages all attributes, parameters, methods and events necessary to handle required state.

## Usage

`RequiredDirective` is a standalone directive, so you can import it directly in a component or an entire module.

```typescript
import { RequiredDirective } from '@headlessng/primitives/required';

@Component({
  import: [RequiredDirective],
  selector: 'app-some',
  template: `<div role="checkbox" hRequired [required]="true"></div>`
})
export class SomeComponent {}
```

## API reference

### RequiredDirective

Contains all the attributes, properties, methods, and events needed to read and manage required state.

#### Inputs

| Input      | Type    | Default value | Description                                         |
| ---------- | ------- | ------------- | --------------------------------------------------- |
| `required` | boolean | false         | When the 'true' is passed, the element is required. |

#### Properties

| Property   | Type              | Default value | Description                                                |
| ---------- | ----------------- | ------------- | ---------------------------------------------------------- |
| `required` | `Signal<boolean>` | `false`       | Stores information about the required state of an element. |

#### Methods

| Method                   | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| `markAsOptional(): void` | When the method is called, it marks element as optional. |
| `markAsRequired(): void` | When the method is called, it marks element as required. |

#### Data attributes

| Data attribute  | Values | Description                     |
| --------------- | ------ | ------------------------------- |
| `data-required` | `true` | Added when element is required. |

## Accessibility

### ARIA attributes

| ARIA attribute  | Values | Description                     |
| --------------- | ------ | ------------------------------- |
| `aria-required` | `true` | Added when element is required. |

## Examples

### Call method from component

```typescript
import { RequiredDirective } from '@headlessng/primitives/required';

@Component({
  import: [RequiredDirective],
  selector: 'app-some',
  template: `<div hRequired [required]="true"></div>`
})
export class SomeComponent implements AfterViewInit {
  @ViewChild(RequiredDirective) requiredRef: RequiredDirective;

  ngAfterViewInit() {
    this.requiredRef.markAsOptional();
  }
}
```

### Call method from template

```html
<div hRequired #hRequiredRef="hRequiredRef">Element</div>

<button *ngIf="!hRequiredRef.required()" (click)="hRequiredRef.markAsRequired()">
  Mark element as required
</button>
<button *ngIf="hRequiredRef.required()" (click)="hRequiredRef.markAsOptional()">
  Mark element as optional
</button>
```

### Reading properties from component

```typescript
import { RequiredDirective } from '@headlessng/primitives/required';

@Component({
  import: [RequiredDirective],
  selector: 'app-some',
  template: `<div hRequired tabindex="0"></div>`
})
export class SomeComponent implements AfterViewInit {
  @ViewChild(RequiredDirective) requiredRef: RequiredDirective;

  ngAfterViewInit() {
    console.log(
      this.requiredRef.required() ? 'The element is required.' : 'The element is not required.'
    );
  }
}
```

### Reading properties from template

```html
<div hRequired #hRequiredRef="hRequiredRef">Element</div>

<ng-container *ngIf="hRequiredRef.required()">The element is required.</ng-container>
```

### Styling with data attributes

```html
<div hRequired class="element" [required]="true">Element</div>

<style>
  .element[data-required] {
  }
</style>
```

### Styling with own classes

```html
<div
  hRequired
  #hRequiredRef="hRequiredRef"
  class="element"
  [class.element--required]="hRequiredRef.required()">
  Element
</div>

<style>
  .element--required {
  }
</style>
```
