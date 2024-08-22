import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CheckboxChecked } from '@headlessng/primitives/checkbox';

import {
  CheckboxComponent,
  DescriptionComponent,
  FieldComponent,
  LabelComponent
} from '../../atoms';
import { ErrorMessagesComponent } from '../error-messages';

@Component({
  imports: [
    CommonModule,
    CheckboxComponent,
    DescriptionComponent,
    ErrorMessagesComponent,
    FieldComponent,
    LabelComponent
  ],
  selector: 'h-checkbox-field',
  templateUrl: 'checkbox-field.component.html',
  styleUrl: 'checkbox-field.component.css',
  standalone: true
})
export class CheckboxFieldComponent {
  public readonly control = input.required<FormControl<CheckboxChecked>>();
  public readonly description = input<string | undefined>();
  public readonly label = input.required<string>();
  public readonly required = input<boolean>(false);
}
