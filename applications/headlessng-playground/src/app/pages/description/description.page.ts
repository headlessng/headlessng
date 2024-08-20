import { Component } from '@angular/core';
import { DescriptionComponent } from '@headlessng/examples';

@Component({
  imports: [DescriptionComponent],
  selector: 'app-description-page',
  templateUrl: 'description.page.html',
  standalone: true
})
export class DescriptionPage {}
