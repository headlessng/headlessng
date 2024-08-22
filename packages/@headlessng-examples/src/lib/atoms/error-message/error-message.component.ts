import { Component } from '@angular/core';
import { ErrorMessageDirective } from '@headlessng/primitives/error-message';

@Component({
  imports: [ErrorMessageDirective],
  selector: 'h-error-message',
  templateUrl: 'error-message.component.html',
  styleUrl: 'error-message.component.css',
  standalone: true
})
export class ErrorMessageComponent {}
