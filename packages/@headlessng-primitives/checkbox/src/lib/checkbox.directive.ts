/* eslint-disable @angular-eslint/no-output-on-prefix */
import {
  computed,
  Directive,
  effect,
  forwardRef,
  HostListener,
  inject,
  output,
  signal
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DisabledDirective } from '@headlessng/primitives/disabled';
import { ControlFieldRef } from '@headlessng/primitives/field';
import { FocusDirective } from '@headlessng/primitives/focus';
import { RequiredDirective } from '@headlessng/primitives/required';

import { stateFromChecked, CheckboxChecked } from './checkbox.interface';

@Directive({
  exportAs: 'hCheckboxRef',
  host: {
    '[attr.aria-checked]': '_checked()',
    '[attr.aria-describedby]': '_fieldRef?.descriptionId()',
    '[attr.aria-labelledby]': '_fieldRef?.labelId()',
    '[attr.data-state]': 'state()',
    '[attr.id]': 'id()',
    '[attr.role]': '"checkbox"',
    '[attr.tabindex]': 'disabledRef.disabled() ? "-1" : "0"'
  },
  hostDirectives: [
    {
      directive: DisabledDirective,
      inputs: ['disabled'],
      outputs: ['disabledChange']
    },
    {
      directive: FocusDirective,
      outputs: ['focusedChange', 'focusVisibleChange']
    },
    {
      directive: RequiredDirective,
      inputs: ['required'],
      outputs: ['requiredChange']
    }
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxDirective),
      multi: true
    }
  ],
  selector: '[hCheckbox]',
  standalone: true
})
export class CheckboxDirective extends ControlFieldRef implements ControlValueAccessor {
  public readonly disabledRef = inject(DisabledDirective);
  public readonly focusRef = inject(FocusDirective);
  public readonly requiredRef = inject(RequiredDirective);

  private readonly _checked = signal<CheckboxChecked>(false);
  private readonly _checkedEffect = effect(
    () => {
      const checked = this._checked();
      this._onChange?.(checked);
      this._onTouched?.();
      this.checkedChange.emit(checked);
    },
    {
      injector: this._injector
    }
  );

  public readonly checked = this._checked.asReadonly();
  public readonly checkedChange = output<CheckboxChecked>();
  public readonly state = computed(() => stateFromChecked(this._checked()));

  public readonly handleLabelClick = () => this._handleChange();

  @HostListener('keydown.space')
  @HostListener('click')
  private _handleChange(): void {
    if (!this.disabledRef.disabled()) {
      this._checked.set(!this._checked());
    }
  }

  private _onChange: ((value: CheckboxChecked) => void) | undefined;
  public registerOnChange(fn: (value: CheckboxChecked) => void): void {
    this._onChange = fn;
  }

  private _onTouched: (() => void) | undefined;
  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  public setDisabledState?(disabled: boolean): void {
    this.disabledRef.setDisabled(disabled);
  }

  public writeValue(checked: CheckboxChecked): void {
    this._checked.set(checked);
  }
}
