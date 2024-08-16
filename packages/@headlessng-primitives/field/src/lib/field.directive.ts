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
import { DescriptionDirective } from '@headlessng/primitives/description';
import { LabelDirective } from '@headlessng/primitives/label';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[hField]',
  standalone: true
})
export class FieldDirective {
  private readonly _injector = inject(Injector);
  private readonly _descriptionRef = signal<DescriptionDirective | undefined>(undefined);
  private readonly _labelRef = signal<LabelDirective | undefined>(undefined);
  private readonly _labelRefEffect = effect(
    () => {
      const labelElement = this._labelRef()?.elementRef?.nativeElement;
      if (labelElement) {
        runInInjectionContext(this._injector, () => {
          fromEvent(labelElement, 'click')
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
  public registerDescriptionRef(ref: DescriptionDirective): void {
    this._descriptionRef.set(ref);
  }

  /**
   * Registers references to the `LabelDirective`.
   *
   * For internal use only.
   * @private
   */
  public registerLabelRef(ref: LabelDirective): void {
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
