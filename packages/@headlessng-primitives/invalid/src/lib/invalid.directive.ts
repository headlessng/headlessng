import {
  Directive,
  effect,
  inject,
  Injector,
  OnInit,
  output,
  runInInjectionContext,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';

@Directive({
  exportAs: 'hInvalidRef',
  host: {
    '[attr.aria-invalid]': 'invalid() || undefined',
    '[attr.data-invalid]': 'invalid() || undefined'
  },
  selector: '[hInvalid]',
  standalone: true
})
export class InvalidDirective implements OnInit {
  private readonly _injector = inject(Injector);
  private readonly _ngControl = inject(NgControl, { optional: true, self: true });

  private readonly _invalid = signal<boolean | null>(null);
  private readonly _invalidEffect = effect(
    () => {
      const invalid = this._invalid();
      if (invalid !== null) {
        this.invalidChange.emit(invalid);
      }
    },
    {
      injector: this._injector
    }
  );

  public readonly invalid = this._invalid.asReadonly();
  public readonly invalidChange = output<boolean>();

  public ngOnInit(): void {
    const ngControl = this._ngControl;
    if (ngControl && ngControl.statusChanges) {
      runInInjectionContext(this._injector, () => {
        ngControl.statusChanges
          ?.pipe(takeUntilDestroyed())
          .subscribe(() => this._invalid.set(ngControl.invalid && ngControl.touched));
      });
    }
  }
}
