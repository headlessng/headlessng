import { effect, ElementRef, inject, Injector, signal, Signal } from '@angular/core';

import { FieldDirective } from './field.directive';

export type FieldRefType = 'control' | 'description' | 'label';

const typedRefId = (refType: FieldRefType) => {
  let index = 0;
  return () => `h-${refType}-${index++}`;
};

const controlRefId = typedRefId('control');
const descriptionRefId = typedRefId('description');
const labelRefId = typedRefId('label');

export abstract class FieldRef {
  protected readonly _injector = inject(Injector);

  protected readonly _fieldRef = inject(FieldDirective, { optional: true });
  private readonly _fieldRefEffect = effect(
    () => {
      this._fieldRef?.register(this);
    },
    {
      allowSignalWrites: true,
      injector: this._injector
    }
  );

  public readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  public abstract readonly id: Signal<string>;
  public abstract readonly refType: FieldRefType;
}

export abstract class ControlFieldRef extends FieldRef {
  private readonly _id = signal(controlRefId());
  public readonly id = this._id.asReadonly();
  public readonly refType: FieldRefType = 'control';

  public abstract handleLabelClick(): void;
}

export abstract class DescriptionFieldRef extends FieldRef {
  private readonly _id = signal(descriptionRefId());
  public readonly id = this._id.asReadonly();
  public readonly refType: FieldRefType = 'description';
}

export abstract class LabelFieldRef extends FieldRef {
  private readonly _id = signal(labelRefId());
  public readonly id = this._id.asReadonly();
  public readonly refType: FieldRefType = 'label';
}

export const inType = (type: FieldRefType) => (ref: FieldRef) => ref.refType === type;
export const inControlType = inType('control');
export const inDescriptionType = inType('description');
export const inLabelType = inType('label');
