import {
  AfterViewInit,
  booleanAttribute,
  Directive,
  ElementRef,
  inject,
  Input
} from '@angular/core';

@Directive({
  selector: '[hAutoFocus]',
  standalone: true
})
export class AutoFocusDirective implements AfterViewInit {
  @Input({ alias: 'hAutoFocus', transform: booleanAttribute })
  public autoFocus = false;

  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);

  public ngAfterViewInit(): void {
    if (!this.autoFocus) {
      this.host.nativeElement.removeAttribute('autofocus');
      return;
    }

    this.host.nativeElement.setAttribute('autofocus', 'true');
    this.host.nativeElement.focus();
  }
}
