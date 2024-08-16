import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  Injector,
  runInInjectionContext,
  Signal,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

export interface FieldElementRef {
  readonly elementRef: ElementRef<HTMLElement> | undefined;
  readonly id: Signal<string>;
}

@Directive({
  selector: '[hField]',
  standalone: true
})
export class FieldDirective {
  private readonly _injector = inject(Injector);
  private readonly _descriptionRef = signal<FieldElementRef | undefined>(undefined);
  private readonly _labelRef = signal<FieldElementRef | undefined>(undefined);
  private readonly _labelRefEffect = effect(
    () => {
      const label = this._labelRef()?.elementRef?.nativeElement;
      if (label) {
        runInInjectionContext(this._injector, () => {
          fromEvent(label, 'click')
            .pipe(takeUntilDestroyed())
            .subscribe(() => this._onLabelClicked?.());
        });
      }
    },
    {
      injector: this._injector
    }
  );

  public readonly descriptionId = computed(() => this._descriptionRef()?.id());
  public readonly labelId = computed(() => this._labelRef()?.id());

  private _onLabelClicked: (() => void) | undefined;

  /**
   * Registers references to the `DescriptionDirective`.
   *
   * For internal use only.
   * @private
   */
  public registerDescriptionRef(ref: FieldElementRef): void {
    this._descriptionRef.set(ref);
  }

  /**
   * Registers references to the `LabelDirective`.
   *
   * For internal use only.
   * @private
   */
  public registerLabelRef(ref: FieldElementRef): void {
    this._labelRef.set(ref);
  }

  /**
   * Registers a callback function for the click event on a field label.
   *
   * For internal use only.
   * @private
   */
  public registerOnLabelClicked(fn: () => void): void {
    this._onLabelClicked = fn;
  }
}
