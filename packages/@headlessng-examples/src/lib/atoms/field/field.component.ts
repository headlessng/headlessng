import { Component } from '@angular/core';
import { FieldDirective } from '@headlessng/primitives/field';

@Component({
  imports: [FieldDirective],
  selector: 'h-field',
  hostDirectives: [FieldDirective],
  templateUrl: 'field.component.html',
  standalone: true
})
export class FieldComponent {}
