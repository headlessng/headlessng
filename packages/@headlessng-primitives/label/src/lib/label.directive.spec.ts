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
    <label hLabel #hLabelRef="hLabelRef"></label>
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
    });

    // This test should be run first due to the generation of unique prefixes that are stored in memory.
    it('should generate correct "id" attribute for each element', () => {
      debugs.forEach((x, i) => {
        fixture.detectChanges();
        expect(x.nativeElement.getAttribute('id')).toBe(`h-label-${i}`);
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
