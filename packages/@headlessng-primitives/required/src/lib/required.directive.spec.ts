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

    it('should have the "aria-required", "data-required" and "required" signal set to "true" when the value passed to input is "true"', async () => {
      expect(host.getAttribute('aria-required')).toBe(null);
      expect(host.getAttribute('data-required')).toBe(null);
      expect(directive.required()).toBe(false);
      component.required = true;
      fixture.detectChanges();
      await fixture.whenStable();
      expect(host.getAttribute('aria-required')).toBe('true');
      expect(host.getAttribute('data-required')).toBe('true');
      expect(directive.required()).toBe(true);
    });

    it('should have the "aria-required", "data-required" and "required" signal set to "false" when the value passed to input is "false"', async () => {
      component.required = true;
      fixture.detectChanges();
      await fixture.whenStable();
      expect(host.getAttribute('aria-required')).toBe('true');
      expect(host.getAttribute('data-required')).toBe('true');
      expect(directive.required()).toBe(true);

      component.required = false;
      fixture.detectChanges();
      await fixture.whenStable();
      expect(host.getAttribute('aria-required')).toBe(null);
      expect(host.getAttribute('data-required')).toBe(null);
      expect(directive.required()).toBe(false);
    });

    it('should have the "aria-required", "data-required" and "required" signal set to "true" when the "markAsRequired" method was called', async () => {
      expect(host.getAttribute('aria-required')).toBe(null);
      expect(host.getAttribute('data-required')).toBe(null);
      expect(directive.required()).toBe(false);
      directive.markAsRequired();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(host.getAttribute('aria-required')).toBe('true');
      expect(host.getAttribute('data-required')).toBe('true');
      expect(directive.required()).toBe(true);
    });

    it('should have the "aria-required", "data-required" and "required" signal set to "false" when the "markAsOptional" method was called', async () => {
      component.required = true;
      fixture.detectChanges();
      await fixture.whenStable();
      expect(host.getAttribute('aria-required')).toBe('true');
      expect(host.getAttribute('data-required')).toBe('true');
      expect(directive.required()).toBe(true);

      directive.markAsOptional();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(host.getAttribute('aria-required')).toBe(null);
      expect(host.getAttribute('data-required')).toBe(null);
      expect(directive.required()).toBe(false);
    });
  });
});
