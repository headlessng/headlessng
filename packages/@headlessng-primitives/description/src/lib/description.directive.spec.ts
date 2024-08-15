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
    <span hDescription #hDescriptionRef="hDescriptionRef" class="custom" id="custom-id"></span>
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
      fixture.autoDetectChanges();
    });

    // This test should be run first due to the generation of unique prefixes that are stored in memory.
    it('should generate correct "id" attribute for each element when not passed in input', () => {
      debugs
        .map(x => x.nativeElement as HTMLSpanElement)
        .filter(x => !x.classList.contains('custom'))
        .forEach((x, i) => expect(x.getAttribute('id')).toBe(`h-description-${i}`));
    });

    it('should set correct "id" attribute when they are passed to inputs', () => {
      debugs
        .map(x => x.nativeElement as HTMLSpanElement)
        .filter(x => x.classList.contains('custom'))
        .forEach(x => expect(x.getAttribute('id')).toBe('custom-id'));
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
