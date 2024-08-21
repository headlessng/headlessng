import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ErrorMessageDirective } from './error-message.directive';

@Component({
  imports: [ErrorMessageDirective],
  standalone: true,
  template: `
    <span hErrorMessage #hErrorMessageRef="hErrorMessageRef"></span>
    <span hErrorMessage #hErrorMessageRef="hErrorMessageRef"></span>
    <span hErrorMessage #hErrorMessageRef="hErrorMessageRef"></span>
  `
})
class ErrorMessageSpecComponent {}

describe('@headlessng/primitives/error-message', () => {
  describe('ErrorMessageDirective', () => {
    let fixture: ComponentFixture<ErrorMessageSpecComponent>;
    let debugs: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        imports: [ErrorMessageSpecComponent]
      }).createComponent(ErrorMessageSpecComponent);

      debugs = fixture.debugElement.queryAll(By.directive(ErrorMessageDirective));
    });

    // This test should be run first due to the generation of unique prefixes that are stored in memory.
    it('should generate correct "id" attribute for each element when not passed in input', () => {
      debugs.forEach((x, i) => {
        fixture.detectChanges();
        expect(x.nativeElement.getAttribute('id')).toBe(`h-error-message-${i}`);
      });
    });

    it('should render the correct error-message elements', () => {
      debugs.forEach(x => expect(x.nativeElement).toBeInstanceOf(HTMLSpanElement));
    });

    it('should forward a references to the directive instance', () => {
      debugs.forEach(x =>
        expect(x.references['hErrorMessageRef']).toBeInstanceOf(ErrorMessageDirective)
      );
    });
  });
});
