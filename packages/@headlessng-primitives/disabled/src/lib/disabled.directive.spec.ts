import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DisabledDirective } from './disabled.directive';

@Component({
  imports: [DisabledDirective],
  standalone: true,
  template: `<div hDisabled #hDisabledRef="hDisabledRef" [disabled]="disabled"></div>`
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

    it('should forward a reference to the directive instance', () => {
      expect(debug.references['hDisabledRef']).toBeInstanceOf(DisabledDirective);
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

    it('should emit "onEnabled" and should not emit "onDisabled" when the value passed to input is changed to "false"', async () => {
      component.disabled = true;
      fixture.detectChanges();
      await fixture.whenStable();

      const onEnabled = jest.spyOn(directive.onEnabled, 'emit');
      const onDisabled = jest.spyOn(directive.onDisabled, 'emit');
      component.disabled = false;
      fixture.detectChanges();
      await fixture.whenStable();
      expect(onEnabled).toHaveBeenCalledTimes(1);
      expect(onDisabled).not.toHaveBeenCalled();
    });

    it('should emit "onDisabled" and should not emit "onEnabled" when the value passed to input is changed to "true"', async () => {
      const onEnabled = jest.spyOn(directive.onEnabled, 'emit');
      const onDisabled = jest.spyOn(directive.onDisabled, 'emit');
      component.disabled = true;
      fixture.detectChanges();
      await fixture.whenStable();

      expect(onEnabled).not.toHaveBeenCalled();
      expect(onDisabled).toHaveBeenCalledTimes(1);
    });

    it('should emit "onEnabled" and should not emit "onDisabled" when the "enable" method was called', async () => {
      component.disabled = true;
      fixture.detectChanges();
      await fixture.whenStable();

      const onEnabled = jest.spyOn(directive.onEnabled, 'emit');
      const onDisabled = jest.spyOn(directive.onDisabled, 'emit');
      directive.enable();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(onEnabled).toHaveBeenCalledTimes(1);
      expect(onDisabled).not.toHaveBeenCalled();
    });

    it('should emit "onDisabled" and should not emit "onEnabled" event when the "disable" method was called', async () => {
      const onEnabled = jest.spyOn(directive.onEnabled, 'emit');
      const onDisabled = jest.spyOn(directive.onDisabled, 'emit');
      directive.disable();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(onEnabled).not.toHaveBeenCalled();
      expect(onDisabled).toHaveBeenCalledTimes(1);
    });
  });
});
