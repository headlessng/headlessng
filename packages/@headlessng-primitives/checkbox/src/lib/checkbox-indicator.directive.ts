import {
  computed,
  Directive,
  effect,
  inject,
  Injector,
  input,
  signal,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { CheckboxDirective } from './checkbox.directive';
import { CheckboxState } from './checkbox.interface';

@Directive({
  selector: '[hCheckboxIndicator]',
  standalone: true
})
export class CheckboxIndicatorDirective {
  private readonly _injector = inject(Injector);
  private readonly _templateRef = inject(TemplateRef);
  private readonly _containerRef = inject(ViewContainerRef);
  private readonly _checkboxRef = inject(CheckboxDirective);

  public readonly forState = input.required<CheckboxState>({ alias: 'hCheckboxIndicator' });

  private readonly _shown = signal<boolean>(false);

  private readonly _shouldShow = computed(
    () => !this._shown() && this.forState() === this._checkboxRef.state()
  );

  private readonly _shouldShowEffect = effect(
    () => {
      if (this._shouldShow()) {
        this._containerRef.createEmbeddedView(this._templateRef);
        this._shown.set(true);
      }
    },
    {
      allowSignalWrites: true,
      injector: this._injector
    }
  );

  private readonly _shouldClear = computed(
    () => this._shown() && this.forState() !== this._checkboxRef.state()
  );

  private readonly _shouldClearEffect = effect(
    () => {
      if (this._shouldClear()) {
        this._containerRef.clear();
        this._shown.set(false);
      }
    },
    {
      allowSignalWrites: true,
      injector: this._injector
    }
  );
}
