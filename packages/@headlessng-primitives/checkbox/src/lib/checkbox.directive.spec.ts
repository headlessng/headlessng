import { Component, DebugElement, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { DisabledDirective } from '../../../disabled/src';
import { FieldDirective } from '../../../field/src';
import { FocusDirective } from '../../../focus/src';
import { RequiredDirective } from '../../../required/src';

import { CheckboxDirective } from './checkbox.directive';
import { stateFromChecked, CheckboxChecked } from './checkbox.interface';

class FieldMockDirective {
  public readonly descriptionId = signal('description-id');
  public readonly errorMessageIds = signal('error-message-id');
  public readonly labelId = signal('label-id');

  public register(): void {
    return;
  }

  public unregister(): void {
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
    [(ngModel)]="checked"></div>`,
  providers: [
    {
      provide: FieldDirective,
      useClass: FieldMockDirective
    }
  ]
})
class CheckboxSpecComponent {
  public disabled = false;
  public checked: CheckboxChecked = false;
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

      fixture.autoDetectChanges();
    });

    it('should render the checkbox element', () => {
      expect(debug.nativeElement).toBeDefined();
    });

    it('should forward a reference to the directive instance', () => {
      expect(debug.references['hCheckboxRef'] instanceof CheckboxDirective).toBe(true);
    });

    it('should have the correct role attribute set', () => {
      expect(host.getAttribute('role')).toBe('checkbox');
    });

    it('should have the correct id attribute set', () => {
      expect(host.getAttribute('id')?.startsWith('h-control-')).toBe(true);
    });

    it('should have the correct aria-describedby attribute set', () => {
      expect(host.getAttribute('aria-describedby')).toBe('description-id');
    });

    it('should have the correct aria-errormessage attribute set', () => {
      expect(host.getAttribute('aria-errormessage')).toBe('error-message-id');
    });

    it('should have the correct aria-labelledby attribute set', () => {
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

    it('should handle clicking on the label element correctly', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleChange = jest.spyOn(directive as any, '_handleChange');
      directive.handleLabelClick();
      expect(handleChange).toHaveBeenCalled();
    });

    it('should have the correct tabindex attribute set depending on the disabled state', async () => {
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

    it('should have the correct attributes set after changing its value', async () => {
      const check = async (checked: CheckboxChecked) => {
        const state = stateFromChecked(checked);
        component.checked = checked;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(host.getAttribute('aria-checked')).toBe(`${checked}`);
        expect(host.getAttribute('data-state')).toBe(state);
        expect(directive.checked()).toBe(checked);
        expect(directive.state()).toBe(state);
      };

      await check('mixed');
      await check(true);
      await check(false);
    });

    it('should change checked value correctly after pressing space when it is enabled', () => {
      expect(directive.checked()).toBe(false);
      debug.triggerEventHandler('keydown.space');
      expect(directive.checked()).toBe(true);
      debug.triggerEventHandler('keydown.space');
      expect(directive.checked()).toBe(false);
    });

    it('should not change checked value after pressing space when it is disabled', async () => {
      component.disabled = true;
      fixture.detectChanges();
      await fixture.whenStable();
      expect(directive.checked()).toBe(false);
      debug.triggerEventHandler('keydown.space');
      expect(directive.checked()).toBe(false);
    });

    it('should change checked value correctly after clicking on the element when it is enabled', () => {
      expect(directive.checked()).toBe(false);
      debug.triggerEventHandler('click');
      expect(directive.checked()).toBe(true);
      debug.triggerEventHandler('click');
      expect(directive.checked()).toBe(false);
    });

    it('should not change checked value after clicking on the element when it is disabled', async () => {
      component.disabled = true;
      fixture.detectChanges();
      await fixture.whenStable();
      expect(directive.checked()).toBe(false);
      debug.triggerEventHandler('click');
      expect(directive.checked()).toBe(false);
    });

    it('should emit an event after its value changes', async () => {
      const checkedChange = jest.spyOn(directive.checkedChange, 'emit');
      expect(directive.checked()).toBe(false);
      component.checked = true;
      fixture.detectChanges();
      await fixture.whenStable();
      expect(directive.checked()).toBe(true);
      expect(checkedChange).toHaveBeenCalled();
    });

    it('should correctly register and handle the on change event for value accessor', async () => {
      directive.registerOnChange(() => undefined);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fn = jest.spyOn(directive as any, '_onChange');
      component.checked = true;
      fixture.detectChanges();
      await fixture.whenStable();
      expect(fn).toHaveBeenCalledWith(true);
    });

    it('should correctly register and handle the on touched event for value accessor', async () => {
      directive.registerOnTouched(() => undefined);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fn = jest.spyOn(directive as any, '_onTouched');
      debug.triggerEventHandler('click');
      expect(fn).toHaveBeenCalled();
    });
  });
});
