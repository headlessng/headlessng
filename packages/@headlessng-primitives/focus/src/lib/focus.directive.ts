import { FocusMonitor } from '@angular/cdk/a11y';
import {
  AfterContentInit,
  Directive,
  ElementRef,
  inject,
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
export class FocusDirective implements AfterContentInit, OnDestroy {
  private readonly _elementRef = inject(ElementRef);
  private readonly _focusMonitor = inject(FocusMonitor);

  private readonly _focused = signal<boolean>(false);
  public readonly focused = this._focused.asReadonly();
  private readonly _focusVisible = signal<boolean>(false);
  public readonly focusVisible = this._focusVisible.asReadonly();

  public readonly onBlurred = output<void>();
  public readonly onFocused = output<void>();
  public readonly onFocusVisible = output<void>();

  public ngAfterContentInit(): void {
    this._focusMonitor.monitor(this._elementRef).subscribe(focusOrigin => {
      if (!focusOrigin) {
        this._focused.set(false);
        this._focusVisible.set(false);
        this.onBlurred.emit();
        return;
      }

      if (focusOrigin === 'keyboard' || focusOrigin === 'program') {
        this._focusVisible.set(true);
        this.onFocusVisible.emit();
      }

      this._focused.set(true);
      this.onFocused.emit();
    });
  }

  public ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  public focus(options?: FocusOptions): void {
    this._focusMonitor.focusVia(this._elementRef, 'program', options);
  }

  public blur(): void {
    this._focusMonitor.focusVia(this._elementRef, null);
  }
}
