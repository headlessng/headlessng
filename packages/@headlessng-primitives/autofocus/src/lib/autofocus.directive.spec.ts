import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AutoFocusDirective } from './autofocus.directive';

@Component({
  imports: [AutoFocusDirective],
  standalone: true,
  template: ` <div tabindex="0" [hAutoFocus]="true"></div> `
})
class AutoFocusTestComponent {}

describe('@headlessng/components/autofocus', () => {
  describe('AutoFocusDirective', () => {
    let fixture: ComponentFixture<AutoFocusTestComponent>;
    let debug: DebugElement;
    let host: HTMLDivElement;

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        imports: [AutoFocusTestComponent]
      }).createComponent(AutoFocusTestComponent);

      fixture.detectChanges();
      debug = fixture.debugElement.query(By.directive(AutoFocusDirective));
      host = debug.nativeElement as HTMLDivElement;
    });

    it('should render the host element', () => {
      expect(host).toBeDefined();
    });

    it('should have the autofocus attribute', () => {
      expect(host.hasAttribute('autofocus')).toBe(true);
    });

    it('should focus on the first render', () => {
      expect(document.activeElement === host).toBe(true);
    });
  });
});
