# @headlessng/primitives/disabled

Manages all attributes, parameters, methods and events necessary to handle disabled state.

## Usage

`DisabledDirective` is a standalone directive, so you can import it directly in a component or an entire module.

```typescript
import { DisabledDirective } from '@headlessng/primitives/disabled';

@Component({
  import: [DisabledDirective],
  selector: 'app-some',
  template: `<div role="checkbox" hDisabled></div>`
})
export class SomeComponent {}
```

## API reference

### DisabledDirective

Contains all the attributes, properties, methods, and events needed to read and manage disabled state.

#### Inputs

| Input      | Type    | Default value | Description                                         |
| ---------- | ------- | ------------- | --------------------------------------------------- |
| `disabled` | boolean | false         | When the 'true' is passed, the element is disabled. |

#### Properties

| Property   | Type              | Default value | Description                                                |
| ---------- | ----------------- | ------------- | ---------------------------------------------------------- |
| `disabled` | `Signal<boolean>` | `false`       | Stores information about the disabled state of an element. |

#### Methods

| Method            | Description                                         |
| ----------------- | --------------------------------------------------- |
| `enable(): void`  | When the method is called, it enables the element.  |
| `disable(): void` | When the method is called, it disables the element. |

#### Outputs

| Output       | Type                 | Description                             |
| ------------ | -------------------- | --------------------------------------- |
| `onEnabled`  | `EventEmitter<void>` | Emitted when element has been enabled.  |
| `onDisabled` | `EventEmitter<void>` | Emitted when element has been disabled. |

#### Data attributes

| Data attribute  | Values | Description                     |
| --------------- | ------ | ------------------------------- |
| `data-disabled` | `true` | Added when element is disabled. |

## Accessibility

### ARIA attributes

| ARIA attribute  | Values | Description                     |
| --------------- | ------ | ------------------------------- |
| `aria-disabled` | `true` | Added when element is disabled. |

## Examples

### Call method from component

```typescript
import { DisabledDirective } from '@headlessng/primitives/disabled';

@Component({
  import: [DisabledDirective],
  selector: 'app-some',
  template: `<div hDisabled [disabled]="true"></div>`
})
export class SomeComponent implements AfterViewInit {
  @ViewChild(DisabledDirective) disabledRef: DisabledDirective;

  ngAfterViewInit() {
    this.disabledRef.enable();
  }
}
```

### Call method from template

```html
<div hDisabled #hDisabledRef="hDisabledRef">Element</div>

<button *ngIf="!hDisabledRef.disabled()" (click)="hDisabledRef.disable()">Disable element</button>
<button *ngIf="hDisabledRef.disabled()" (click)="hDisabledRef.enable()">Enable element</button>
```

### Handling the output event

```typescript
import { DisabledDirective } from '@headlessng/primitives/disabled';

@Component({
  import: [DisabledDirective],
  selector: 'app-some',
  template: `<div hDisabled (onEnabled)="handleEnabled()" (onDisabled)="handleDisabled()"></div>`
})
export class SomeComponent {
  onEnabled() {
    console.log('element is enabled');
  }
  onDisabled() {
    console.log('element is disabled');
  }
}
```

### Reading properties from component

```typescript
import { DisabledDirective } from '@headlessng/primitives/disabled';

@Component({
  import: [DisabledDirective],
  selector: 'app-some',
  template: `<div hDisabled tabindex="0"></div>`
})
export class SomeComponent implements AfterViewInit {
  @ViewChild(DisabledDirective) disabledRef: DisabledDirective;

  ngAfterViewInit() {
    console.log(
      this.disabledRef.disabled() ? 'The element is disabled.' : 'The element is enabled.'
    );
  }
}
```

### Reading properties from template

```html
<div hDisabled #hDisabledRef="hDisabledRef">Element</div>

<ng-container *ngIf="hDisabledRef.disabled()">The element is disabled.</ng-container>
```

### Styling with data attributes

```html
<div hDisabled class="element" [disabled]="true">Element</div>

<style>
  .element[data-disabled] {
  }
</style>
```

### Styling with own classes

```html
<div
  hDisabled
  #hDisabledRef="hDisabledRef"
  class="element"
  [class.element--disabled]="hDisabledRef.disabled()">
  Element
</div>

<style>
  .element--disabled {
  }
</style>
```
