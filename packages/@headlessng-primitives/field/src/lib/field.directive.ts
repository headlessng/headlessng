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
  FieldRef,
  inControlType,
  inDescriptionType,
  inLabelType,
  inType,
  LabelFieldRef
} from './field-ref';

@Directive({
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

  private readonly _labelRef = computed<LabelFieldRef | undefined>(
    () => this._refs().find(inLabelType) as LabelFieldRef
  );

  public readonly descriptionId = computed(() => this._descriptionRef()?.id());
  public readonly controlId = computed(() => this._controlRef()?.id());
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

  /**
   * Registers a reference to a child element of a field.
   *
   * For internal use only.
   * @private
   */
  public register(ref: FieldRef): void {
    const refs = this._refs();
    const existsWithType = refs.some(inType(ref.refType));
    if (!existsWithType) {
      this._refs.set([...refs, ref]);
    }
  }
}
