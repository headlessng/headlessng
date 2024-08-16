import { Component, signal, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { CheckboxIndicatorDirective } from './checkbox-indicator.directive';
import { CheckboxDirective, CheckboxState } from './checkbox.directive';

class CheckboxDirectiveMock {
  public readonly state = signal<CheckboxState>('unchecked');
}

@Component({
  imports: [FormsModule, CheckboxIndicatorDirective],
  standalone: true,
  template: `
    <div class="container">
      <ng-container *hCheckboxIndicator="'checked'">checked</ng-container>
      <ng-container *hCheckboxIndicator="'mixed'">mixed</ng-container>
      <ng-container *hCheckboxIndicator="'unchecked'">unchecked</ng-container>
    </div>
  `,
  providers: [
    {
      provide: CheckboxDirective,
      useClass: CheckboxDirectiveMock
    }
  ]
})
class CheckboxIndicatorSpecComponent {}

describe('@headlessng/primitives/checkbox', () => {
  describe('CheckboxIndicatorDirective', () => {
    let fixture: ComponentFixture<CheckboxIndicatorSpecComponent>;
    let checkbox: CheckboxDirective;
    let container: HTMLDivElement;

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        imports: [CheckboxIndicatorSpecComponent]
      }).createComponent(CheckboxIndicatorSpecComponent);

      checkbox = fixture.debugElement.injector.get(CheckboxDirective);
      container = fixture.debugElement.query(By.css('.container')).nativeElement;
      fixture.autoDetectChanges();
    });

    it('should display the correct element for a specific checkbox state', async () => {
      const states: CheckboxState[] = ['checked', 'mixed', 'unchecked'];
      for (const state of states) {
        (checkbox.state as WritableSignal<CheckboxState>).set(state);
        await fixture.whenStable();
        fixture.detectChanges();
        expect(container.textContent).toBe(state);
      }
    });
  });
});
