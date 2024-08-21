import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { InvalidDirective } from './invalid.directive';

@Component({
  imports: [ReactiveFormsModule, InvalidDirective],
  standalone: true,
  template: `<input #ref="hInvalidRef" hInvalid [formControl]="control" />`
})
export class InvalidSpecComponent {
  public readonly control = new FormControl('', [Validators.required]);
}

describe('@headlessng/primitives/invalid', () => {
  describe('InvalidDirective', () => {
    let fixture: ComponentFixture<InvalidSpecComponent>;
    let component: InvalidSpecComponent;
    let debug: DebugElement;
    let directive: InvalidDirective;
    let host: HTMLInputElement;

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        imports: [InvalidSpecComponent]
      }).createComponent(InvalidSpecComponent);

      component = fixture.componentInstance;
      debug = fixture.debugElement.query(By.directive(InvalidDirective));
      directive = debug.injector.get(InvalidDirective);
      host = debug.nativeElement;

      fixture.autoDetectChanges();
    });

    it('should render the host element correctly', () => {
      expect(host).toBeInstanceOf(HTMLInputElement);
    });

    it('should forward a reference to the directive instance', () => {
      expect(debug.references['ref']).toBeInstanceOf(InvalidDirective);
    });

    it('should not set attributes when the control is invalid but not touched', () => {
      expect(component.control.invalid).toBe(true);
      expect(component.control.touched).toBe(false);
      expect(directive.invalid()).toBe(null);
      expect(host.getAttribute('aria-invalid')).toBe(null);
      expect(host.getAttribute('data-invalid')).toBe(null);
    });

    it('should not set attributes when the control is valid and touched', () => {
      host.value = 'some value';
      host.dispatchEvent(new Event('input'));
      component.control.markAsTouched();
      expect(component.control.invalid).toBe(false);
      expect(component.control.touched).toBe(true);
      expect(directive.invalid()).toBe(false);
      expect(host.getAttribute('aria-invalid')).toBe(null);
      expect(host.getAttribute('data-invalid')).toBe(null);
    });

    it('should set the correct attributes when the control is invalid and touched', async () => {
      host.value = 'some value';
      host.dispatchEvent(new Event('input'));
      component.control.markAsTouched();
      host.value = '';
      host.dispatchEvent(new Event('input'));
      expect(component.control.invalid).toBe(true);
      expect(component.control.touched).toBe(true);
      expect(directive.invalid()).toBe(true);
      expect(host.getAttribute('aria-invalid')).toBe('true');
      expect(host.getAttribute('data-invalid')).toBe('true');
    });

    it('should emit an event when the invalid state changes', async () => {
      const event = jest.spyOn(directive.invalidChange, 'emit');
      host.value = 'some value';
      host.dispatchEvent(new Event('input'));
      component.control.markAsTouched();
      expect(event).toHaveBeenCalledWith(false);

      host.value = '';
      host.dispatchEvent(new Event('input'));
      expect(event).toHaveBeenCalledWith(true);
    });
  });
});
