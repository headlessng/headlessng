import { Directive, ElementRef, inject, OnDestroy, OnInit, signal, Signal } from '@angular/core';

import { FieldDirective } from './field.directive';

export type FieldElementType = 'control' | 'description' | 'error-message' | 'label';

const typedElementId = (type: FieldElementType) => {
  let index = 0;
  return () => `h-${type}-${index++}`;
};

const controlElementId = typedElementId('control');
const descriptionElementId = typedElementId('description');
const errorMessageElementId = typedElementId('error-message');
const labelElementId = typedElementId('label');

export const isType = (type: FieldElementType) => (x: FieldElement) => x.elementType === type;
export const isControl = isType('control');
export const isDescription = isType('description');
export const isErrorMessage = isType('error-message');
export const isLabel = isType('label');

@Directive({
  host: {
    '[attr.id]': 'id()'
  }
})
export abstract class FieldElement implements OnInit, OnDestroy {
  protected readonly _fieldRef = inject(FieldDirective, { optional: true });

  public readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  public abstract readonly id: Signal<string>;
  public abstract readonly elementType: FieldElementType;

  public ngOnInit(): void {
    this._fieldRef?.register(this);
  }

  public ngOnDestroy(): void {
    this._fieldRef?.unregister(this);
  }
}

export abstract class ControlElement extends FieldElement {
  private readonly _id = signal(controlElementId());
  public readonly id = this._id.asReadonly();
  public readonly elementType = 'control';

  public abstract readonly handleLabelClick: () => void;
}

export abstract class DescriptionElement extends FieldElement {
  private readonly _id = signal(descriptionElementId());
  public readonly id = this._id.asReadonly();
  public readonly elementType = 'description';
}

export abstract class ErrorMessageElement extends FieldElement {
  private readonly _id = signal(errorMessageElementId());
  public readonly id = this._id.asReadonly();
  public readonly elementType = 'error-message';
}

export abstract class LabelElement extends FieldElement {
  private readonly _id = signal(labelElementId());
  public readonly id = this._id.asReadonly();
  public readonly elementType = 'label';
}
