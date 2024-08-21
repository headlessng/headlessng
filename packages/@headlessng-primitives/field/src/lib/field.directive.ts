import {
  computed,
  Directive,
  effect,
  inject,
  Injector,
  runInInjectionContext,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

import {
  ControlFieldRef,
  DescriptionFieldRef,
  ErrorMessageFieldRef,
  FieldRef,
  FieldRefType,
  inControlType,
  inDescriptionType,
  inErrorMessageType,
  inLabelType,
  inType,
  LabelFieldRef
} from './field-ref';

@Directive({
  exportAs: 'hFieldRef',
  selector: '[hField]',
  standalone: true
})
export class FieldDirective {
  private readonly _injector = inject(Injector);
  private readonly _refs = signal<FieldRef[]>([]);

  private readonly _controlRef = computed<ControlFieldRef | undefined>(
    () => this._refs().find(inControlType) as ControlFieldRef
  );

  private readonly _descriptionRef = computed<DescriptionFieldRef | undefined>(
    () => this._refs().find(inDescriptionType) as DescriptionFieldRef
  );

  private readonly _errorMessageRefs = computed<ErrorMessageFieldRef[]>(
    () => this._refs().filter(inErrorMessageType) as ErrorMessageFieldRef[]
  );

  private readonly _labelRef = computed<LabelFieldRef | undefined>(
    () => this._refs().find(inLabelType) as LabelFieldRef
  );

  public readonly controlId = computed(() => this._controlRef()?.id());
  public readonly descriptionId = computed(() => this._descriptionRef()?.id());
  public readonly errorMessageIds = computed(() => {
    const refs = this._errorMessageRefs();
    return refs.length ? refs.map(x => x.id()).join(' ') : undefined;
  });
  public readonly labelId = computed(() => this._labelRef()?.id());

  private readonly _connectControlWithLabelEffect = effect(
    () => {
      const controlRef = this._controlRef();
      const labelRef = this._labelRef();
      if (!controlRef || !labelRef) {
        return;
      }

      runInInjectionContext(this._injector, () => {
        fromEvent(labelRef.elementRef.nativeElement, 'click')
          .pipe(takeUntilDestroyed())
          .subscribe(() => controlRef.handleLabelClick());
      });
    },
    {
      injector: this._injector
    }
  );

  public register(ref: FieldRef): void {
    const refs = this._refs();
    const existsWithId = refs.some(x => x.id() === ref.id());
    if (existsWithId) {
      return;
    }

    const manyAllowedInTypes: FieldRefType[] = ['error-message'];
    const manyAllowed = manyAllowedInTypes.includes(ref.refType);
    const existsWithType = refs.some(inType(ref.refType));
    if (manyAllowed || !existsWithType) {
      this._refs.set([...refs, ref]);
    }
  }

  public unregister(ref: FieldRef): void {
    const refs = this._refs();
    this._refs.set(refs.filter(x => x.id !== ref.id));
  }
}
