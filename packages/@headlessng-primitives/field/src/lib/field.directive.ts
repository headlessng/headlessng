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
  ControlElement,
  DescriptionElement,
  ErrorMessageElement,
  FieldElement,
  FieldElementType,
  isControl,
  isDescription,
  isErrorMessage,
  isLabel,
  isType,
  LabelElement
} from './field-element.directive';

@Directive({
  exportAs: 'hFieldRef',
  selector: '[hField]',
  standalone: true
})
export class FieldDirective {
  private readonly _injector = inject(Injector);
  private readonly _elements = signal<FieldElement[]>([]);

  private readonly _control = computed<ControlElement | undefined>(
    () => this._elements().find(isControl) as ControlElement
  );

  private readonly _description = computed<DescriptionElement | undefined>(
    () => this._elements().find(isDescription) as DescriptionElement
  );

  private readonly _errorMessages = computed<ErrorMessageElement[]>(
    () => this._elements().filter(isErrorMessage) as ErrorMessageElement[]
  );

  private readonly _label = computed<LabelElement | undefined>(
    () => this._elements().find(isLabel) as LabelElement
  );

  public readonly controlId = computed(() => this._control()?.id());
  public readonly descriptionId = computed(() => this._description()?.id());
  public readonly errorMessageIds = computed(
    () =>
      this._errorMessages()
        .map(x => x.id())
        .join(' ') || undefined
  );
  public readonly labelId = computed(() => this._label()?.id());

  private readonly _connectControlWithLabelEffect = effect(
    () => {
      const control = this._control();
      const label = this._label();
      if (!control || !label) {
        return;
      }

      runInInjectionContext(this._injector, () => {
        fromEvent(label.elementRef.nativeElement, 'click')
          .pipe(takeUntilDestroyed())
          .subscribe(() => control.handleLabelClick());
      });
    },
    {
      injector: this._injector
    }
  );

  public register(element: FieldElement): void {
    const elements = this._elements();
    const alreadyExistsWithId = elements.some(x => x.id() === element.id());
    if (alreadyExistsWithId) {
      return;
    }

    const manyAllowedInTypes: FieldElementType[] = ['error-message'];
    const manyAllowed = manyAllowedInTypes.includes(element.elementType);
    const alreadyExistsInType = elements.some(isType(element.elementType));
    if (!manyAllowed && alreadyExistsInType) {
      return;
    }

    this._elements.set([...elements, element]);
  }

  public unregister(element: FieldElement): void {
    const elements = this._elements();
    this._elements.set(elements.filter(x => x.id !== element.id));
  }
}
