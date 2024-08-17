import { Component, DebugElement, ElementRef, runInInjectionContext } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ControlFieldRef, DescriptionFieldRef, LabelFieldRef } from './field-ref';
import { FieldDirective } from './field.directive';

class ControlMock extends ControlFieldRef {
  public readonly handleLabelClick = () => undefined;
}

class DescriptionMock extends DescriptionFieldRef {}

class LabelMock extends LabelFieldRef {
  public override elementRef: ElementRef<HTMLElement> = new ElementRef(
    document.createElement('label')
  );
}

@Component({
  imports: [FieldDirective],
  standalone: true,
  template: `<div hField></div>`
})
class FieldSpecComponent {}

describe('@headlessng/primitives/field', () => {
  describe('FieldDirective', () => {
    let fixture: ComponentFixture<FieldSpecComponent>;
    let debug: DebugElement;
    let directive: FieldDirective;

    let controlRef: ControlMock;
    let descriptionRef: DescriptionMock;
    let labelRef: LabelMock;

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        imports: [FieldSpecComponent]
      }).createComponent(FieldSpecComponent);

      debug = fixture.debugElement.query(By.directive(FieldDirective));
      directive = debug.injector.get(FieldDirective);

      runInInjectionContext(debug.injector, () => {
        controlRef = new ControlMock();
        descriptionRef = new DescriptionMock();
        labelRef = new LabelMock();
      });
    });

    it('should render the field element', () => {
      expect(debug.nativeElement).toBeDefined();
    });

    it('should not register the same type twice', () => {
      expect(directive['_refs']().length).toBe(0);
      directive.register(controlRef);
      expect(directive['_refs']().length).toBe(1);
      directive.register(controlRef);
      expect(directive['_refs']().length).toBe(1);
    });

    it('should register the control reference and set its identifier correctly', () => {
      expect(directive.controlId()).toBe(undefined);
      directive.register(controlRef);
      fixture.detectChanges();
      expect(directive.controlId()).toBe(controlRef.id());
    });

    it('should register the description reference and set its identifier correctly', () => {
      expect(directive.descriptionId()).toBe(undefined);
      directive.register(descriptionRef);
      fixture.detectChanges();
      expect(directive.descriptionId()).toBe(descriptionRef.id());
    });

    it('should register the label reference and set its identifier correctly', () => {
      expect(directive.labelId()).toBe(undefined);
      directive.register(labelRef);
      fixture.detectChanges();
      expect(directive.labelId()).toBe(labelRef.id());
    });

    it('should connect control and label correctly and trigger an event when it is clicked', async () => {
      directive.register(controlRef);
      directive.register(labelRef);
      fixture.detectChanges();
      const handler = jest.spyOn(controlRef, 'handleLabelClick');
      labelRef.elementRef.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(handler).toHaveBeenCalled();
    });
  });
});
