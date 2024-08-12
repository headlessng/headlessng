import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DisabledDirective } from './disabled.directive';

@Component({
  imports: [DisabledDirective],
  standalone: true,
  template: `<div hDisabled [disabled]="disabled"></div>`
})
export class DisabledSpecComponent {
  public disabled = false;
}

describe('@headlessng/primitives/disabled', () => {
  describe('DisabledDirective', () => {
    let fixture: ComponentFixture<DisabledSpecComponent>;
    let component: DisabledSpecComponent;
    let debug: DebugElement;
    let directive: DisabledDirective;
    let host: HTMLDivElement;

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        imports: [DisabledSpecComponent]
      }).createComponent(DisabledSpecComponent);

      component = fixture.componentInstance;
      debug = fixture.debugElement.query(By.directive(DisabledDirective));
      directive = debug.injector.get(DisabledDirective);
      host = debug.nativeElement;

      fixture.autoDetectChanges();
    });

    it('should render the host element correctly', () => {
      expect(host).toBeInstanceOf(HTMLDivElement);
    });

    it('should have the "aria-disabled", "data-disabled" and "disabled" signal set to "true" when the value passed to input is "true"', async () => {
      expect(host.getAttribute('aria-disabled')).toBe(null);
      expect(host.getAttribute('data-disabled')).toBe(null);
      expect(directive.disabled()).toBe(false);
      component.disabled = true;
      fixture.detectChanges();
      await fixture.whenStable();
      expect(host.getAttribute('aria-disabled')).toBe('true');
      expect(host.getAttribute('data-disabled')).toBe('true');
      expect(directive.disabled()).toBe(true);
    });

    it('should have the "aria-disabled", "data-disabled" and "disabled" signal set to "false" when the value passed to input is "false"', async () => {
      component.disabled = true;
      fixture.detectChanges();
      await fixture.whenStable();
      expect(host.getAttribute('aria-disabled')).toBe('true');
      expect(host.getAttribute('data-disabled')).toBe('true');
      expect(directive.disabled()).toBe(true);

      component.disabled = false;
      fixture.detectChanges();
      await fixture.whenStable();
      expect(host.getAttribute('aria-disabled')).toBe(null);
      expect(host.getAttribute('data-disabled')).toBe(null);
      expect(directive.disabled()).toBe(false);
    });

    it('should have the "aria-disabled", "data-disabled" and "disabled" signal set to "true" when the "disable" method was called', async () => {
      expect(host.getAttribute('aria-disabled')).toBe(null);
      expect(host.getAttribute('data-disabled')).toBe(null);
      expect(directive.disabled()).toBe(false);
      directive.disable();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(host.getAttribute('aria-disabled')).toBe('true');
      expect(host.getAttribute('data-disabled')).toBe('true');
      expect(directive.disabled()).toBe(true);
    });

    it('should have the "aria-disabled", "data-disabled" and "disabled" signal set to "false" when the "enable" method was called', async () => {
      component.disabled = true;
      fixture.detectChanges();
      await fixture.whenStable();
      expect(host.getAttribute('aria-disabled')).toBe('true');
      expect(host.getAttribute('data-disabled')).toBe('true');
      expect(directive.disabled()).toBe(true);

      directive.enable();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(host.getAttribute('aria-disabled')).toBe(null);
      expect(host.getAttribute('data-disabled')).toBe(null);
      expect(directive.disabled()).toBe(false);
    });
  });
});
