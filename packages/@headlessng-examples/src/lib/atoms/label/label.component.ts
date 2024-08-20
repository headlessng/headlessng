import { Component, viewChild } from '@angular/core';
import { LabelDirective } from '@headlessng/primitives/label';

@Component({
  imports: [LabelDirective],
  selector: 'h-label',
  standalone: true,
  templateUrl: 'label.component.html',
  styleUrl: 'label.component.css'
})
export class LabelComponent {
  public readonly labelRef = viewChild(LabelDirective);
}
