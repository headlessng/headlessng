import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FieldDirective } from '../../../field/src';

import { LabelDirective } from './label.directive';

class FieldMockDirective {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public registerLabelRef(ref: LabelDirective): void {
    return;
  }
}

@Component({
  imports: [LabelDirective],
  standalone: true,
  template: `
    <label hLabel #hLabelRef="hLabelRef"></label>
    <label hLabel #hLabelRef="hLabelRef"></label>
    <label hLabel #hLabelRef="hLabelRef" class="custom" id="custom-id"></label>
  `,
  providers: [
    {
      provide: FieldDirective,
      useClass: FieldMockDirective
    }
  ]
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
      // fixture.autoDetectChanges();
    });

    // This test should be run first due to the generation of unique prefixes that are stored in memory.
    it('should generate correct "id" attribute for each element when not passed in input', () => {
      debugs
        .map(x => x.nativeElement as HTMLLabelElement)
        .filter(x => !x.classList.contains('custom'))
        .forEach((x, i) => {
          fixture.detectChanges();
          expect(x.getAttribute('id')).toBe(`h-label-${i}`);
        });
    });

    it('should set correct "id" attribute when they are passed to inputs', () => {
      debugs
        .map(x => x.nativeElement as HTMLLabelElement)
        .filter(x => x.classList.contains('custom'))
        .forEach(x => {
          fixture.detectChanges();
          expect(x.getAttribute('id')).toBe('custom-id');
        });
    });

    it('should render the correct label elements', () => {
      debugs.forEach(x => expect(x.nativeElement).toBeInstanceOf(HTMLLabelElement));
    });

    it('should forward a references to the directive instance', () => {
      debugs.forEach(x => expect(x.references['hLabelRef']).toBeInstanceOf(LabelDirective));
    });

    it('should correctly register own reference in the field directive', () => {
      debugs
        .map(x => x.references['hLabelRef'] as LabelDirective)
        .forEach(x => {
          const registerFn = jest.spyOn(x['_fieldRef'] as FieldDirective, 'registerLabelRef');
          fixture.detectChanges();
          expect(registerFn).toHaveBeenCalledWith(x);
        });
    });
  });
});
