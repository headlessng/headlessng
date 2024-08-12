import { FocusOrigin } from '@angular/cdk/a11y';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { FocusVisibleDirective } from './focus-visible.directive';

@Component({
  imports: [FocusVisibleDirective],
  standalone: true,
  template: `<div tabindex="0" hFocusVisible></div>`
})
class FocusVisibleSpecComponent {}

describe('@headlessng/primitives/focus', () => {
  describe('FocusVisibleDirective', () => {
    let fixture: ComponentFixture<FocusVisibleSpecComponent>;
    let debug: DebugElement;
    let directive: FocusVisibleDirective;
    let host: HTMLDivElement;

    let focusMonitorValue$: BehaviorSubject<FocusOrigin>;

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        imports: [FocusVisibleSpecComponent]
      }).createComponent(FocusVisibleSpecComponent);

      debug = fixture.debugElement.query(By.directive(FocusVisibleDirective));
      directive = debug.injector.get(FocusVisibleDirective);
      host = debug.nativeElement;

      focusMonitorValue$ = new BehaviorSubject<FocusOrigin>(null);
      jest
        .spyOn(directive['_focusMonitor'], 'monitor')
        .mockImplementation(() => focusMonitorValue$);
    });

    it('should render the host element correctly', () => {
      expect(host).toBeInstanceOf(HTMLDivElement);
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
  });
});
