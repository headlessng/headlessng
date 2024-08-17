import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Directive,
  effect,
  ElementRef,
  inject,
  Injector,
  OnDestroy,
  output,
  signal
} from '@angular/core';

@Directive({
  exportAs: 'hFocusRef',
  host: {
    '[attr.data-focused]': 'focused() || undefined',
    '[attr.data-focus-visible]': 'focusVisible() || undefined'
  },
  selector: '[hFocus]',
  standalone: true
})
export class FocusDirective implements AfterViewInit, OnDestroy {
  private readonly _elementRef = inject(ElementRef);
  private readonly _focusMonitor = inject(FocusMonitor);
  private readonly _injector = inject(Injector);

  private readonly _focused = signal<boolean>(false);
  private readonly _focusedEffect = effect(
    () => {
      this.focusedChange.emit(this._focused());
    },
    {
      injector: this._injector
    }
  );

  private readonly _focusVisible = signal<boolean>(false);
  private readonly _focusVisibleEffect = effect(
    () => {
      this.focusVisibleChange.emit(this._focusVisible());
    },
    {
      injector: this._injector
    }
  );

  public readonly focused = this._focused.asReadonly();
  public readonly focusedChange = output<boolean>();

  public readonly focusVisible = this._focusVisible.asReadonly();
  public readonly focusVisibleChange = output<boolean>();

  public ngAfterViewInit(): void {
    this._focusMonitor.monitor(this._elementRef).subscribe(x => this._handleFocusOrigin(x));
  }

  public ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  public focus(): void {
    this._focusMonitor.focusVia(this._elementRef, 'program');
  }

  public blur(): void {
    this._focusMonitor.focusVia(this._elementRef, null);
  }

  private _handleFocusOrigin(origin: FocusOrigin): void {
    if (!origin) {
      this._focused.set(false);
      this._focusVisible.set(false);
      return;
    }

    if (origin === 'keyboard' || origin === 'program') {
      this._focusVisible.set(true);
    }

    this._focused.set(true);
  }
}
