/* eslint-disable @angular-eslint/no-output-on-prefix */
import {
  computed,
  Directive,
  effect,
  forwardRef,
  HostListener,
  inject,
  Injector,
  output,
  signal
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DisabledDirective } from '@headlessng/primitives/disabled';
import { FocusDirective } from '@headlessng/primitives/focus';
import { RequiredDirective } from '@headlessng/primitives/required';

export type CheckboxState = 'checked' | 'indeterminate' | 'unchecked';
export type CheckboxValue = boolean | 'indeterminate';
export interface CheckboxChangedEvent {
  readonly originalEvent: KeyboardEvent | MouseEvent;
  readonly state: CheckboxState;
  readonly value: CheckboxValue;
}

@Directive({
  exportAs: 'hCheckboxRef',
  host: {
    '[attr.aria-checked]': 'value()',
    '[attr.data-state]': 'state()',
    '[attr.role]': '"checkbox"',
    '[attr.tabindex]': 'disabledRef.disabled() ? "-1" : "0"'
  },
  hostDirectives: [
    {
      directive: DisabledDirective,
      inputs: ['disabled'],
      outputs: ['onEnabled', 'onDisabled']
    },
    {
      directive: FocusDirective,
      outputs: ['onBlurred', 'onFocused', 'onFocusVisible']
    },
    {
      directive: RequiredDirective,
      inputs: ['required']
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
export class CheckboxDirective implements ControlValueAccessor {
  private readonly _injector = inject(Injector);

  public readonly disabledRef = inject(DisabledDirective);
  public readonly focusRef = inject(FocusDirective);
  public readonly requiredRef = inject(RequiredDirective);

  private readonly _value = signal<CheckboxValue>(false);
  public readonly value = this._value.asReadonly();
  private readonly _valueEffect = effect(
    () => {
      const value = this._value();
      this._onChange?.(value);
      this._onTouched?.();
      this.onChanged.emit(value);
    },
    {
      injector: this._injector
    }
  );

  public readonly state = computed<CheckboxState>(() => {
    switch (this._value()) {
      case false:
        return 'unchecked';
      case 'indeterminate':
        return 'indeterminate';
      case true:
        return 'checked';
    }
  });

  public readonly onChanged = output<CheckboxValue>();

  @HostListener('keyup.space')
  @HostListener('click')
  protected handleChange(): boolean | void {
    if (!this.disabledRef.disabled()) {
      this._value.set(!this._value());
    }
  }

  public _onChange: ((value: CheckboxValue) => void) | undefined;
  public _onTouched: (() => void) | undefined;

  public registerOnChange(fn: (value: CheckboxValue) => void): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  public setDisabledState?(disabled: boolean): void {
    disabled ? this.disabledRef.disable() : this.disabledRef.enable();
  }

  public writeValue(value: CheckboxValue): void {
    if (!this.disabledRef.disabled()) {
      this._value.set(value);
    }
  }
}
