import { Component, viewChild } from '@angular/core';
import { DescriptionDirective } from '@headlessng/primitives/description';

@Component({
  imports: [DescriptionDirective],
  selector: 'h-description',
  standalone: true,
  templateUrl: 'description.component.html',
  styleUrl: 'description.component.css'
})
export class DescriptionComponent {
  public readonly descriptionRef = viewChild(DescriptionDirective);
}
