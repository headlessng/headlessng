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
    });

    it('should render the host element correctly', () => {
      expect(host).toBeInstanceOf(HTMLDivElement);
    });

    it('should forward a reference to the directive instance', () => {
      expect(debug.references['hFocusRef']).toBeInstanceOf(FocusDirective);
    });

    it('should clear the focus monitor subscription on the component destroy', () => {
      const stopMonitoring = jest.spyOn(directive['_focusMonitor'], 'stopMonitoring');
      fixture.destroy();
      expect(stopMonitoring).toHaveBeenCalled();
    });

    it('should have the "focused" signal set to "true" when focus is programmatically set to the host element', () => {
      expect(directive.focused()).toBe(false);
      focusMonitorValue$.next('program');
      fixture.detectChanges();
      expect(directive.focused()).toBe(true);
    });

    it('should have the "focused" signal set to "true" when focus is set via keyboard to the host element', () => {
      expect(directive.focused()).toBe(false);
      focusMonitorValue$.next('keyboard');
      fixture.detectChanges();
      expect(directive.focused()).toBe(true);
    });

    it('should have the "focused" signal set to "true" when focus is set via touch to the host element', () => {
      expect(directive.focused()).toBe(false);
      focusMonitorValue$.next('touch');
      fixture.detectChanges();
      expect(directive.focused()).toBe(true);
    });

    it('should have the "focused" signal set to "true" when focus is set via mouse to the host element', () => {
      expect(directive.focused()).toBe(false);
      focusMonitorValue$.next('mouse');
      fixture.detectChanges();
      expect(directive.focused()).toBe(true);
    });

    it('should have the "focused" signal set to "false" when focus is removed from host element', async () => {
      focusMonitorValue$.next('program');
      fixture.detectChanges();
      expect(directive.focused()).toBe(true);
      focusMonitorValue$.next(null);
      fixture.detectChanges();
      expect(directive.focused()).toBe(false);
    });

    it('should have the "focusVisible" signal set to "true" when focus is programmatically set to the host element', () => {
      expect(directive.focusVisible()).toBe(false);
      focusMonitorValue$.next('program');
      fixture.detectChanges();
      expect(directive.focusVisible()).toBe(true);
    });

    it('should have the "focusVisible" signal set to "true" when focus is set via keyboard to the host element', () => {
      expect(directive.focusVisible()).toBe(false);
      focusMonitorValue$.next('keyboard');
      fixture.detectChanges();
      expect(directive.focusVisible()).toBe(true);
    });

    it('should have the "focusVisible" signal set to "false" when focus is set via touch to the host element', () => {
      expect(directive.focusVisible()).toBe(false);
      focusMonitorValue$.next('touch');
      fixture.detectChanges();
      expect(directive.focusVisible()).toBe(false);
    });

    it('should have the "focusVisible" signal set to "false" when focus is set via mouse to the host element', () => {
      expect(directive.focusVisible()).toBe(false);
      focusMonitorValue$.next('mouse');
      fixture.detectChanges();
      expect(directive.focusVisible()).toBe(false);
    });

    it('should have the "focusVisible" signal set to "false" when focus is removed from host element', async () => {
      focusMonitorValue$.next('program');
      fixture.detectChanges();
      expect(directive.focusVisible()).toBe(true);
      focusMonitorValue$.next(null);
      fixture.detectChanges();
      expect(directive.focusVisible()).toBe(false);
    });

    it('should have the "data-focused" attribute set to "true" when focus is programmatically set to the host element', () => {
      expect(host.getAttribute('data-focused')).toBe(null);
      focusMonitorValue$.next('program');
      fixture.detectChanges();
      expect(host.getAttribute('data-focused')).toBe('true');
    });

    it('should have the "data-focused" attribute set to "true" when focus is set via keyboard to the host element', () => {
      expect(host.getAttribute('data-focused')).toBe(null);
      focusMonitorValue$.next('keyboard');
      fixture.detectChanges();
      expect(host.getAttribute('data-focused')).toBe('true');
    });

    it('should have the "data-focused" attribute set to "true" when focus is set via touch to the host element', () => {
      expect(host.getAttribute('data-focused')).toBe(null);
      focusMonitorValue$.next('touch');
      fixture.detectChanges();
      expect(host.getAttribute('data-focused')).toBe('true');
    });

    it('should have the "data-focused" attribute set to "true" when focus is set via mouse to the host element', () => {
      expect(host.getAttribute('data-focused')).toBe(null);
      focusMonitorValue$.next('mouse');
      fixture.detectChanges();
      expect(host.getAttribute('data-focused')).toBe('true');
    });

    it('should not have the "data-focused" attribute when focus is removed from host element', async () => {
      focusMonitorValue$.next('program');
      fixture.detectChanges();
      expect(host.getAttribute('data-focused')).toBe('true');
      focusMonitorValue$.next(null);
      fixture.detectChanges();
      expect(host.getAttribute('data-focused')).toBe(null);
    });

    it('should have the "data-focus-visible" attribute set to "true" when focus is programmatically set to the host element', () => {
      expect(host.getAttribute('data-focus-visible')).toBe(null);
      focusMonitorValue$.next('program');
      fixture.detectChanges();
      expect(host.getAttribute('data-focus-visible')).toBe('true');
    });

    it('should have the "data-focus-visible" attribute set to "true" when focus is set via keyboard to the host element', () => {
      expect(host.getAttribute('data-focus-visible')).toBe(null);
      focusMonitorValue$.next('keyboard');
      fixture.detectChanges();
      expect(host.getAttribute('data-focus-visible')).toBe('true');
    });

    it('should not have the "data-focus-visible" attribute when focus is set via touch to the host element', () => {
      expect(host.getAttribute('data-focus-visible')).toBe(null);
      focusMonitorValue$.next('touch');
      fixture.detectChanges();
      expect(host.getAttribute('data-focus-visible')).toBe(null);
    });

    it('should not have the "data-focus-visible" attribute when focus is set via mouse to the host element', () => {
      expect(host.getAttribute('data-focus-visible')).toBe(null);
      focusMonitorValue$.next('mouse');
      fixture.detectChanges();
      expect(host.getAttribute('data-focus-visible')).toBe(null);
    });

    it('should not have the "data-focus-visible" attribute when focus is removed from host element', async () => {
      focusMonitorValue$.next('program');
      fixture.detectChanges();
      expect(host.getAttribute('data-focus-visible')).toBe('true');
      focusMonitorValue$.next(null);
      fixture.detectChanges();
      expect(host.getAttribute('data-focus-visible')).toBe(null);
    });

    it('should emit "onFocused" event when focus is programmatically set to the host element', () => {
      const emitter = jest.spyOn(directive.onFocused, 'emit');
      focusMonitorValue$.next('program');
      fixture.detectChanges();
      expect(emitter).toHaveBeenCalledTimes(1);
    });

    it('should emit "onFocused" event when focus is set via keyboard to the host element', () => {
      const emitter = jest.spyOn(directive.onFocused, 'emit');
      focusMonitorValue$.next('keyboard');
      fixture.detectChanges();
      expect(emitter).toHaveBeenCalledTimes(1);
    });

    it('should emit "onFocused" event when focus is set via touch to the host element', () => {
      const emitter = jest.spyOn(directive.onFocused, 'emit');
      focusMonitorValue$.next('touch');
      fixture.detectChanges();
      expect(emitter).toHaveBeenCalledTimes(1);
    });

    it('should emit "onFocused" event when focus is set via mouse to the host element', () => {
      const emitter = jest.spyOn(directive.onFocused, 'emit');
      focusMonitorValue$.next('mouse');
      fixture.detectChanges();
      expect(emitter).toHaveBeenCalledTimes(1);
    });

    it('should not emit "onFocus" event when focus is removed from host element', () => {
      const emitter = jest.spyOn(directive.onFocused, 'emit');
      focusMonitorValue$.next(null);
      fixture.detectChanges();
      expect(emitter).not.toHaveBeenCalled();
    });

    it('should emit "onFocusVisible" event when focus is programmatically set to the host element', () => {
      const emitter = jest.spyOn(directive.onFocusVisible, 'emit');
      focusMonitorValue$.next('program');
      fixture.detectChanges();
      expect(emitter).toHaveBeenCalledTimes(1);
    });

    it('should emit "onFocusVisible" event when focus is set via keyboard to the host element', () => {
      const emitter = jest.spyOn(directive.onFocusVisible, 'emit');
      focusMonitorValue$.next('keyboard');
      fixture.detectChanges();
      expect(emitter).toHaveBeenCalledTimes(1);
    });

    it('should not emit "onFocusVisible" event when focus is set via touch to the host element', () => {
      const emitter = jest.spyOn(directive.onFocusVisible, 'emit');
      focusMonitorValue$.next('touch');
      fixture.detectChanges();
      expect(emitter).not.toHaveBeenCalled();
    });

    it('should not emit "onFocusVisible" event when focus is set via mouse to the host element', () => {
      const emitter = jest.spyOn(directive.onFocusVisible, 'emit');
      focusMonitorValue$.next('mouse');
      fixture.detectChanges();
      expect(emitter).not.toHaveBeenCalled();
    });

    it('should not emit "onFocusVisible" event when focus is removed from host element', () => {
      const emitter = jest.spyOn(directive.onFocusVisible, 'emit');
      focusMonitorValue$.next(null);
      fixture.detectChanges();
      expect(emitter).not.toHaveBeenCalled();
    });

    it('should not emit "onBlurred" event when focus is programmatically set to the host element', () => {
      const emitter = jest.spyOn(directive.onBlurred, 'emit');
      focusMonitorValue$.next('program');
      fixture.detectChanges();
      expect(emitter).not.toHaveBeenCalled();
    });

    it('should not emit "onBlurred" event when focus is set via keyboard to the host element', () => {
      const emitter = jest.spyOn(directive.onBlurred, 'emit');
      focusMonitorValue$.next('keyboard');
      fixture.detectChanges();
      expect(emitter).not.toHaveBeenCalled();
    });

    it('should not emit "onBlurred" event when focus is set via touch to the host element', () => {
      const emitter = jest.spyOn(directive.onBlurred, 'emit');
      focusMonitorValue$.next('touch');
      fixture.detectChanges();
      expect(emitter).not.toHaveBeenCalled();
    });

    it('should not emit "onBlurred" event when focus is set via mouse to the host element', () => {
      const emitter = jest.spyOn(directive.onBlurred, 'emit');
      focusMonitorValue$.next('mouse');
      fixture.detectChanges();
      expect(emitter).not.toHaveBeenCalled();
    });

    it('should emit "onBlurred" event when focus is removed from host element', () => {
      const emitter = jest.spyOn(directive.onBlurred, 'emit');
      focusMonitorValue$.next(null);
      fixture.detectChanges();
      expect(emitter).toHaveBeenCalledTimes(1);
    });

    it('should set focus to the host element when the "focus" method is called', () => {
      const focusVia = jest.spyOn(directive['_focusMonitor'], 'focusVia');
      const options: FocusOptions = { preventScroll: true };
      directive.focus(options);
      fixture.detectChanges();
      expect(focusVia).toHaveBeenCalledWith(directive['_elementRef'], 'program', options);
    });

    it('should remove focus from the host element when the "blur" method is called', () => {
      const focusVia = jest.spyOn(directive['_focusMonitor'], 'focusVia');
      directive.blur();
      fixture.detectChanges();
      expect(focusVia).toHaveBeenCalledWith(directive['_elementRef'], null);
    });
  });
});
