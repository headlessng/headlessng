import { Component, DebugElement, ElementRef, runInInjectionContext } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  ControlElement,
  DescriptionElement,
  ErrorMessageElement,
  LabelElement
} from './field-element.directive';
import { FieldDirective } from './field.directive';

class ControlElementMock extends ControlElement {
  public readonly handleLabelClick = () => undefined;
}

class DescriptionElementMock extends DescriptionElement {}
class ErrorMessageElementMock extends ErrorMessageElement {}

class LabelElementMock extends LabelElement {
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

    let controlRef: ControlElementMock;
    let descriptionRef: DescriptionElementMock;
    let firstErrorMessageRef: ErrorMessageElementMock;
    let secondErrorMessageRef: ErrorMessageElementMock;
    let labelRef: LabelElementMock;

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        imports: [FieldSpecComponent]
      }).createComponent(FieldSpecComponent);

      debug = fixture.debugElement.query(By.directive(FieldDirective));
      directive = debug.injector.get(FieldDirective);

      runInInjectionContext(debug.injector, () => {
        controlRef = new ControlElementMock();
        descriptionRef = new DescriptionElementMock();
        firstErrorMessageRef = new ErrorMessageElementMock();
        secondErrorMessageRef = new ErrorMessageElementMock();
        labelRef = new LabelElementMock();
      });
    });

    it('should render the field element', () => {
      expect(debug.nativeElement).toBeDefined();
    });

    it('should not register a control element more than once', () => {
      expect(directive['_elements']().length).toBe(0);
      directive.register(controlRef);
      expect(directive['_elements']().length).toBe(1);
      directive.register(controlRef);
      expect(directive['_elements']().length).toBe(1);
    });

    it('should not register a description element more than once', () => {
      expect(directive['_elements']().length).toBe(0);
      directive.register(descriptionRef);
      expect(directive['_elements']().length).toBe(1);
      directive.register(descriptionRef);
      expect(directive['_elements']().length).toBe(1);
    });

    it('should not register a label element more than once', () => {
      expect(directive['_elements']().length).toBe(0);
      directive.register(labelRef);
      expect(directive['_elements']().length).toBe(1);
      directive.register(labelRef);
      expect(directive['_elements']().length).toBe(1);
    });

    it('should not register an element with the same id more than once', () => {
      expect(directive['_elements']().length).toBe(0);
      directive.register(firstErrorMessageRef);
      expect(directive['_elements']().length).toBe(1);
      directive.register(firstErrorMessageRef);
      expect(directive['_elements']().length).toBe(1);
    });

    it('should allow register an error message element more than once', () => {
      expect(directive['_elements']().length).toBe(0);
      directive.register(firstErrorMessageRef);
      expect(directive['_elements']().length).toBe(1);
      directive.register(secondErrorMessageRef);
      expect(directive['_elements']().length).toBe(2);
    });

    it('should register the control reference and set its identifier correctly, and then unregister it', () => {
      expect(directive.controlId()).toBe(undefined);
      directive.register(controlRef);
      fixture.detectChanges();
      expect(directive.controlId()).toBe(controlRef.id());
      directive.unregister(controlRef);
      fixture.detectChanges();
      expect(directive.controlId()).toBe(undefined);
    });

    it('should register the description reference and set its identifier correctly, and then unregister it', () => {
      expect(directive.descriptionId()).toBe(undefined);
      directive.register(descriptionRef);
      fixture.detectChanges();
      expect(directive.descriptionId()).toBe(descriptionRef.id());
      directive.unregister(descriptionRef);
      fixture.detectChanges();
      expect(directive.descriptionId()).toBe(undefined);
    });

    it('should register a reference to error messages and set their identifiers correctly, and then unregister them', () => {
      expect(directive.errorMessageIds()).toBe(undefined);
      directive.register(firstErrorMessageRef);
      directive.register(secondErrorMessageRef);
      fixture.detectChanges();
      expect(directive.errorMessageIds()?.includes(firstErrorMessageRef.id())).toBe(true);
      expect(directive.errorMessageIds()?.includes(secondErrorMessageRef.id())).toBe(true);
      directive.unregister(firstErrorMessageRef);
      fixture.detectChanges();
      expect(directive.errorMessageIds()?.includes(firstErrorMessageRef.id())).toBe(false);
      directive.unregister(secondErrorMessageRef);
      fixture.detectChanges();
      expect(directive.errorMessageIds()).toBe(undefined);
    });

    it('should register the label reference and set its identifier correctly, and then unregister it', () => {
      expect(directive.labelId()).toBe(undefined);
      directive.register(labelRef);
      fixture.detectChanges();
      expect(directive.labelId()).toBe(labelRef.id());
      directive.unregister(labelRef);
      fixture.detectChanges();
      expect(directive.labelId()).toBe(undefined);
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
