import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DisabledDirective } from './disabled.directive';

@Component({
  imports: [DisabledDirective],
  standalone: true,
  template: `<div hDisabled #ref="hDisabledRef" [disabled]="disabled"></div>`
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
      expect(debug.references['ref']).toBeInstanceOf(DisabledDirective);
    });

    it('should set the correct attributes when the disabled state changes', () => {
      const expectValue = (value: 'true' | null) => {
        expect(host.getAttribute('aria-disabled')).toBe(value);
        expect(host.getAttribute('data-disabled')).toBe(value);
        expect(host.getAttribute('disabled')).toBe(value);
      };

      const changeTo = (disabled: boolean) => {
        directive.setDisabled(disabled);
        fixture.detectChanges();
      };

      changeTo(true);
      expectValue('true');

      changeTo(false);
      expectValue(null);
    });

    it('should update the disabled state when the input value changes', () => {
      const checkFor = (disabled: boolean) => {
        component.disabled = disabled;
        fixture.detectChanges();
        expect(directive.disabled()).toBe(disabled);
      };

      checkFor(true);
      checkFor(false);
    });
  });
});
