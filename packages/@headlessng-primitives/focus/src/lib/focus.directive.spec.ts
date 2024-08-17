import { FocusOrigin } from '@angular/cdk/a11y';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { FocusDirective } from './focus.directive';

@Component({
  imports: [FocusDirective],
  standalone: true,
  template: `<div #hFocusRef="hFocusRef" tabindex="0" hFocus></div>`
})
class FocusSpecComponent {}

describe('@headlessng/primitives/focus', () => {
  describe('FocusDirective', () => {
    let fixture: ComponentFixture<FocusSpecComponent>;
    let debug: DebugElement;
    let directive: FocusDirective;
    let host: HTMLDivElement;

    let focusMonitorValue$: BehaviorSubject<FocusOrigin>;

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        imports: [FocusSpecComponent]
      }).createComponent(FocusSpecComponent);

      debug = fixture.debugElement.query(By.directive(FocusDirective));
      directive = debug.injector.get(FocusDirective);
      host = debug.nativeElement;

      focusMonitorValue$ = new BehaviorSubject<FocusOrigin>(null);
      jest
        .spyOn(directive['_focusMonitor'], 'monitor')
        .mockImplementation(() => focusMonitorValue$);

      fixture.autoDetectChanges();
    });

    it('should render the host element correctly', () => {
      expect(host).toBeInstanceOf(HTMLDivElement);
    });

    it('should forward a reference to the directive instance', () => {
      expect(debug.references['hFocusRef']).toBeInstanceOf(FocusDirective);
    });

    it('should clear the focus monitor after it has been destroyed', () => {
      const stopMonitoring = jest.spyOn(directive['_focusMonitor'], 'stopMonitoring');
      fixture.destroy();
      expect(stopMonitoring).toHaveBeenCalled();
    });

    it('should set focus when the focus method is called', () => {
      const focusVia = jest.spyOn(directive['_focusMonitor'], 'focusVia');
      directive.focus();
      fixture.detectChanges();
      expect(focusVia).toHaveBeenCalledWith(directive['_elementRef'], 'program');
    });

    it('should remove focus when the blur method is called', () => {
      const focusVia = jest.spyOn(directive['_focusMonitor'], 'focusVia');
      directive.blur();
      fixture.detectChanges();
      expect(focusVia).toHaveBeenCalledWith(directive['_elementRef'], null);
    });

    it('should have the correct state and attributes when focus is set via program', () => {
      expect(directive.focused()).toBe(false);
      expect(directive.focusVisible()).toBe(false);
      expect(host.getAttribute('data-focused')).toBe(null);
      expect(host.getAttribute('data-focus-visible')).toBe(null);
      focusMonitorValue$.next('program');
      fixture.detectChanges();
      expect(directive.focused()).toBe(true);
      expect(directive.focusVisible()).toBe(true);
      expect(host.getAttribute('data-focused')).toBe('true');
      expect(host.getAttribute('data-focus-visible')).toBe('true');
    });

    it('should have the correct state and attributes when focus is set via keyboard', () => {
      expect(directive.focused()).toBe(false);
      expect(directive.focusVisible()).toBe(false);
      expect(host.getAttribute('data-focused')).toBe(null);
      expect(host.getAttribute('data-focus-visible')).toBe(null);
      focusMonitorValue$.next('keyboard');
      fixture.detectChanges();
      expect(directive.focused()).toBe(true);
      expect(directive.focusVisible()).toBe(true);
      expect(host.getAttribute('data-focused')).toBe('true');
      expect(host.getAttribute('data-focus-visible')).toBe('true');
    });

    it('should have the correct state and attributes when focus is set via mouse', () => {
      expect(directive.focused()).toBe(false);
      expect(directive.focusVisible()).toBe(false);
      expect(host.getAttribute('data-focused')).toBe(null);
      expect(host.getAttribute('data-focus-visible')).toBe(null);
      focusMonitorValue$.next('mouse');
      fixture.detectChanges();
      expect(directive.focused()).toBe(true);
      expect(directive.focusVisible()).toBe(false);
      expect(host.getAttribute('data-focused')).toBe('true');
      expect(host.getAttribute('data-focus-visible')).toBe(null);
    });

    it('should have the correct state and attributes when focus is set via touch', () => {
      expect(directive.focused()).toBe(false);
      expect(directive.focusVisible()).toBe(false);
      expect(host.getAttribute('data-focused')).toBe(null);
      expect(host.getAttribute('data-focus-visible')).toBe(null);
      focusMonitorValue$.next('touch');
      fixture.detectChanges();
      expect(directive.focused()).toBe(true);
      expect(directive.focusVisible()).toBe(false);
      expect(host.getAttribute('data-focused')).toBe('true');
      expect(host.getAttribute('data-focus-visible')).toBe(null);
    });

    it('should emit correct events when focus is set via program', () => {
      const focusedChange = jest.spyOn(directive.focusedChange, 'emit');
      const focusVisibleChange = jest.spyOn(directive.focusVisibleChange, 'emit');
      focusMonitorValue$.next('program');
      fixture.detectChanges();
      expect(focusedChange).toHaveBeenCalled();
      expect(focusVisibleChange).toHaveBeenCalled();
    });

    it('should emit correct events when focus is set via keyboard', () => {
      const focusedChange = jest.spyOn(directive.focusedChange, 'emit');
      const focusVisibleChange = jest.spyOn(directive.focusVisibleChange, 'emit');
      focusMonitorValue$.next('keyboard');
      fixture.detectChanges();
      expect(focusedChange).toHaveBeenCalled();
      expect(focusVisibleChange).toHaveBeenCalled();
    });

    it('should emit correct events when focus is set via mouse', () => {
      const focusedChange = jest.spyOn(directive.focusedChange, 'emit');
      const focusVisibleChange = jest.spyOn(directive.focusVisibleChange, 'emit');
      focusMonitorValue$.next('mouse');
      fixture.detectChanges();
      expect(focusedChange).toHaveBeenCalled();
      expect(focusVisibleChange).not.toHaveBeenCalled();
    });

    it('should emit correct events when focus is set via touch', () => {
      const focusedChange = jest.spyOn(directive.focusedChange, 'emit');
      const focusVisibleChange = jest.spyOn(directive.focusVisibleChange, 'emit');
      focusMonitorValue$.next('touch');
      fixture.detectChanges();
      expect(focusedChange).toHaveBeenCalled();
      expect(focusVisibleChange).not.toHaveBeenCalled();
    });
  });
});
