import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { ErrorMessageComponent } from '../../atoms';
import { ValidationMessagePipe } from '../../pipes';

@Component({
  imports: [CommonModule, ErrorMessageComponent, ValidationMessagePipe],
  selector: 'h-error-messages',
  templateUrl: 'error-messages.component.html',
  standalone: true
})
export class ErrorMessagesComponent {
  public readonly control = input.required<AbstractControl>();
}
