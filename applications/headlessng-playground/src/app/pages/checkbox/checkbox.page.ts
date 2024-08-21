import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckboxFieldComponent } from '@headlessng/examples';
import { CheckboxChecked } from '@headlessng/primitives/checkbox';

@Component({
  imports: [CommonModule, ReactiveFormsModule, CheckboxFieldComponent],
  selector: 'app-checkbox-page',
  templateUrl: 'checkbox.page.html',
  standalone: true
})
export class CheckboxPage {
  private readonly formBuilder = inject(FormBuilder);

  public readonly form = this.formBuilder.nonNullable.group({
    privacyPolicyConsent: this.formBuilder.nonNullable.control<CheckboxChecked>(
      {
        value: false,
        disabled: false
      },
      [Validators.requiredTrue]
    )
  });
}
