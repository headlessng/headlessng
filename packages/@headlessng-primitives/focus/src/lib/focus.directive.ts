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

import { FocusVisibleDirective } from './focus-visible.directive';

@Directive({
  exportAs: 'hFocusRef',
  host: {
    '[attr.data-focused]': 'focused() || undefined'
  },
  hostDirectives: [FocusVisibleDirective],
  selector: '[hFocus]',
  standalone: true
})
export class FocusDirective implements AfterContentInit, OnDestroy {
  private readonly _elementRef = inject(ElementRef);
  private readonly _focusMonitor = inject(FocusMonitor);

  private readonly _focused = signal<boolean>(false);
  public readonly focused = this._focused.asReadonly();

  public readonly onBlurred = output<void>();
  public readonly onFocused = output<void>();

  public ngAfterContentInit(): void {
    this._focusMonitor.monitor(this._elementRef).subscribe(focusOrigin => {
      if (!focusOrigin) {
        this._focused.set(false);
        this.onBlurred.emit();
        return;
      }

      this._focused.set(true);
      this.onFocused.emit();
    });
  }

  public ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
}
