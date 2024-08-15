import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LabelDirective } from './label.directive';

@Component({
  imports: [LabelDirective],
  standalone: true,
  template: `
    <label hLabel #hLabelRef="hLabelRef"></label>
    <label hLabel #hLabelRef="hLabelRef"></label>
    <label
      hLabel
      #hLabelRef="hLabelRef"
      class="custom"
      id="custom-id"
      htmlFor="custom-for-id"></label>
  `
})
class LabelSpecComponent {}

describe('@headlessng/primitives/label', () => {
  describe('LabelDirective', () => {
    let fixture: ComponentFixture<LabelSpecComponent>;
    let debugs: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        imports: [LabelSpecComponent]
      }).createComponent(LabelSpecComponent);

      debugs = fixture.debugElement.queryAll(By.directive(LabelDirective));
      fixture.autoDetectChanges();
    });

    // This test should be run first due to the generation of unique prefixes that are stored in memory.
    it('should generate correct "id" attribute for each element when not passed in input', () => {
      debugs
        .map(x => x.nativeElement as HTMLLabelElement)
        .filter(x => !x.classList.contains('custom'))
        .forEach((x, i) => expect(x.getAttribute('id')).toBe(`h-label-${i}`));
    });

    it('should set correct "id" and "for" attribute when they are passed to inputs', () => {
      debugs
        .map(x => x.nativeElement as HTMLLabelElement)
        .filter(x => x.classList.contains('custom'))
        .forEach(x => {
          expect(x.getAttribute('id')).toBe('custom-id');
          expect(x.getAttribute('for')).toBe('custom-for-id');
        });
    });

    it('should render the correct label elements', () => {
      debugs.forEach(x => expect(x.nativeElement).toBeInstanceOf(HTMLLabelElement));
    });

    it('should forward a references to the directive instance', () => {
      debugs.forEach(x => expect(x.references['hLabelRef']).toBeInstanceOf(LabelDirective));
    });
  });
});
