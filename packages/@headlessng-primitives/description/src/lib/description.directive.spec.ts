import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DescriptionDirective } from './description.directive';

@Component({
  imports: [DescriptionDirective],
  standalone: true,
  template: `
    <span hDescription #hDescriptionRef="hDescriptionRef"></span>
    <span hDescription #hDescriptionRef="hDescriptionRef"></span>
    <span hDescription #hDescriptionRef="hDescriptionRef"></span>
  `
})
class DescriptionSpecComponent {}

describe('@headlessng/primitives/description', () => {
  describe('DescriptionDirective', () => {
    let fixture: ComponentFixture<DescriptionSpecComponent>;
    let debugs: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        imports: [DescriptionSpecComponent]
      }).createComponent(DescriptionSpecComponent);

      debugs = fixture.debugElement.queryAll(By.directive(DescriptionDirective));
    });

    // This test should be run first due to the generation of unique prefixes that are stored in memory.
    it('should generate correct "id" attribute for each element when not passed in input', () => {
      debugs.forEach((x, i) => {
        fixture.detectChanges();
        expect(x.nativeElement.getAttribute('id')).toBe(`h-description-${i}`);
      });
    });

    it('should render the correct description elements', () => {
      debugs.forEach(x => expect(x.nativeElement).toBeInstanceOf(HTMLSpanElement));
    });

    it('should forward a references to the directive instance', () => {
      debugs.forEach(x =>
        expect(x.references['hDescriptionRef']).toBeInstanceOf(DescriptionDirective)
      );
    });
  });
});
