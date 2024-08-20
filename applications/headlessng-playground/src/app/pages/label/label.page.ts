import { Component } from '@angular/core';
import { LabelComponent } from '@headlessng/examples';

@Component({
  imports: [LabelComponent],
  selector: 'app-label-page',
  templateUrl: 'label.page.html',
  standalone: true
})
export class LabelPage {}
