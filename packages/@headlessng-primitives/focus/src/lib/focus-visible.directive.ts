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
  host: {
    '[attr.data-focus-visible]': 'focusVisible() || undefined'
  },
  selector: '[hFocusVisible]',
  standalone: true
})
export class FocusVisibleDirective implements AfterContentInit, OnDestroy {
  private readonly _elementRef = inject(ElementRef);
  private readonly _focusMonitor = inject(FocusMonitor);

  private readonly _focusVisible = signal<boolean>(false);
  public readonly focusVisible = this._focusVisible.asReadonly();

  public readonly onFocusVisible = output<void>();

  public ngAfterContentInit(): void {
    this._focusMonitor.monitor(this._elementRef).subscribe(focusOrigin => {
      const focusShouldBeVisible = focusOrigin === 'keyboard' || focusOrigin === 'program';
      if (!focusShouldBeVisible) {
        this._focusVisible.set(false);
        return;
      }

      this._focusVisible.set(true);
      this.onFocusVisible.emit();
    });
  }

  public ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
}
