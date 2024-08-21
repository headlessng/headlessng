import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CheckboxChecked,
  CheckboxDirective,
  CheckboxIndicatorDirective
} from '@headlessng/primitives/checkbox';

@Component({
  imports: [CommonModule, ReactiveFormsModule, CheckboxDirective, CheckboxIndicatorDirective],
  selector: 'h-checkbox',
  templateUrl: 'checkbox.component.html',
  styleUrl: 'checkbox.component.css',
  standalone: true
})
export class CheckboxComponent {
  public readonly control = input.required<FormControl<CheckboxChecked>>();
  public readonly required = input<boolean>(false);
}
