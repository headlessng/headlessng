import { Component, DebugElement, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { DisabledDirective } from '../../../disabled/src';
import { FieldDirective } from '../../../field/src';
import { FocusDirective } from '../../../focus/src';
import { RequiredDirective } from '../../../required/src';

import { CheckboxDirective, CheckboxState, CheckboxValue } from './checkbox.directive';

class FieldMockDirective {
  public readonly descriptionId = signal('description-id');
  public readonly labelId = signal('label-id');

  public register(): void {
    return;
  }
}

@Component({
  imports: [FormsModule, CheckboxDirective],
  standalone: true,
  template: `<div
    hCheckbox
    #hCheckboxRef="hCheckboxRef"
    [disabled]="disabled"
    [(ngModel)]="value"></div>`,
  providers: [
    {
      provide: FieldDirective,
      useClass: FieldMockDirective
    }
  ]
})
class CheckboxSpecComponent {
  public disabled = false;
  public value: CheckboxValue = false;
}

describe('@headlessng/primitives/checkbox', () => {
  describe('CheckboxDirective', () => {
    let fixture: ComponentFixture<CheckboxSpecComponent>;
    let component: CheckboxSpecComponent;
    let debug: DebugElement;
    let host: HTMLDivElement;
    let directive: CheckboxDirective;

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        imports: [CheckboxSpecComponent]
      }).createComponent(CheckboxSpecComponent);

      component = fixture.componentInstance;
      debug = fixture.debugElement.query(By.directive(CheckboxDirective));
      host = debug.nativeElement;
      directive = debug.injector.get(CheckboxDirective);
    });

    it('should render the checkbox element', () => {
      expect(debug.nativeElement).toBeDefined();
    });

    it('should forward a reference to the directive instance', () => {
      expect(debug.references['hCheckboxRef'] instanceof CheckboxDirective).toBe(true);
    });

    it('should have the "role" attribute set to "checkbox"', () => {
      fixture.detectChanges();
      expect(host.getAttribute('role')).toBe('checkbox');
    });

    it('should have the "id" attribute set correctly', () => {
      fixture.detectChanges();
      expect(host.getAttribute('id')?.startsWith('h-control-')).toBe(true);
    });

    it('should have the "aria-describedby" attribute set correctly', () => {
      fixture.detectChanges();
      expect(host.getAttribute('aria-describedby')).toBe('description-id');
    });

    it('should have the "aria-labelledby" attribute set correctly', () => {
      fixture.detectChanges();
      expect(host.getAttribute('aria-labelledby')).toBe('label-id');
    });

    it('should correctly inject reference to DisabledDirective', () => {
      expect(directive.disabledRef).toBeInstanceOf(DisabledDirective);
    });

    it('should correctly inject reference to FocusDirective', () => {
      expect(directive.focusRef).toBeInstanceOf(FocusDirective);
    });

    it('should correctly inject reference to RequiredDirective', () => {
      expect(directive.requiredRef).toBeInstanceOf(RequiredDirective);
    });

    it('should have correct "aria-checked" attribute and "value" signal depending on value', async () => {
      fixture.autoDetectChanges();

      const check = async (value: CheckboxValue) => {
        component.value = value;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(host.getAttribute('aria-checked')).toBe(`${value}`);
        expect(directive.value()).toBe(value);
      };

      await check('mixed');
      await check(true);
      await check(false);
    });

    it('should have correct "data-state" attribute and "state" signal depending on value', async () => {
      fixture.autoDetectChanges();

      const values: Record<CheckboxState, CheckboxValue> = {
        unchecked: false,
        mixed: 'mixed',
        checked: true
      };

      const checkDataState = async (state: CheckboxState) => {
        component.value = values[state];
        fixture.detectChanges();
        await fixture.whenStable();
        expect(host.getAttribute('data-state')).toBe(state);
        expect(directive.state()).toBe(state);
      };

      await checkDataState('mixed');
      await checkDataState('checked');
      await checkDataState('unchecked');
    });

    it('should have correct "tabindex" attribute depending on disabled state', async () => {
      fixture.autoDetectChanges();

      component.disabled = true;
      fixture.detectChanges();
      await fixture.whenStable();
      expect(host.getAttribute('tabindex')).toBe('-1');

      component.disabled = false;
      fixture.detectChanges();
      await fixture.whenStable();
      expect(host.getAttribute('tabindex')).toBe('0');
    });

    it('should change the value correctly when pressing the "Space" key', async () => {
      expect(directive.value()).toBe(false);

      debug.triggerEventHandler('keydown.space');
      expect(directive.value()).toBe(true);

      debug.triggerEventHandler('keydown.space');
      expect(directive.value()).toBe(false);
    });

    it('should not change value when the host element is disabled', async () => {
      const disabledRef = directive.disabledRef as DisabledDirective;
      expect(disabledRef.disabled()).toBe(false);

      component.disabled = true;
      fixture.detectChanges();
      await fixture.whenStable();
      expect(disabledRef.disabled()).toBe(true);

      expect(directive.value()).toBe(false);

      debug.triggerEventHandler('click');
      expect(directive.value()).toBe(false);

      debug.triggerEventHandler('keyup.space');
      expect(directive.value()).toBe(false);
    });

    it('should emit "onChanged" event when the value was changed', async () => {
      const onChanged = jest.spyOn(directive.onChanged, 'emit');
      fixture.detectChanges();
      await fixture.whenStable();
      expect(directive.value()).toBe(false);
      component.value = true;
      fixture.detectChanges();
      await fixture.whenStable();
      expect(directive.value()).toBe(true);
      expect(onChanged).toHaveBeenCalled();
    });
  });
});
