import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RequiredDirective } from './required.directive';

@Component({
  imports: [RequiredDirective],
  standalone: true,
  template: `<div hRequired #hRequiredRef="hRequiredRef" [required]="required"></div>`
})
export class RequiredSpecComponent {
  public required = false;
}

describe('@headlessng/primitives/required', () => {
  describe('RequiredDirective', () => {
    let fixture: ComponentFixture<RequiredSpecComponent>;
    let component: RequiredSpecComponent;
    let debug: DebugElement;
    let directive: RequiredDirective;
    let host: HTMLDivElement;

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        imports: [RequiredSpecComponent]
      }).createComponent(RequiredSpecComponent);

      component = fixture.componentInstance;
      debug = fixture.debugElement.query(By.directive(RequiredDirective));
      directive = debug.injector.get(RequiredDirective);
      host = debug.nativeElement;

      fixture.autoDetectChanges();
    });

    it('should render the host element correctly', () => {
      expect(host).toBeInstanceOf(HTMLDivElement);
    });

    it('should forward a reference to the directive instance', () => {
      expect(debug.references['hRequiredRef']).toBeInstanceOf(RequiredDirective);
    });

    it('should set the correct attributes when the required state changes', () => {
      const expectValue = (value: 'true' | null) => {
        expect(host.getAttribute('aria-required')).toBe(value);
        expect(host.getAttribute('data-required')).toBe(value);
        expect(host.getAttribute('required')).toBe(value);
      };

      const changeTo = (required: boolean) => {
        directive.setRequired(required);
        fixture.detectChanges();
      };

      changeTo(true);
      expectValue('true');

      changeTo(false);
      expectValue(null);
    });

    it('should emit an event when the required state changes', () => {
      const event = jest.spyOn(directive.requiredChange, 'emit');
      const checkFor = (value: boolean) => {
        directive.setRequired(value);
        fixture.detectChanges();
        expect(event).toHaveBeenCalledWith(value);
      };

      checkFor(true);
      checkFor(false);
    });

    it('should update the required state when the input value changes', () => {
      const checkFor = (required: boolean) => {
        component.required = required;
        fixture.detectChanges();
        expect(directive.required()).toBe(required);
      };

      checkFor(true);
      checkFor(false);
    });
  });
});
