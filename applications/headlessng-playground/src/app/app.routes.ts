import { Route } from '@angular/router';

import { PlaygroundLayout } from './layouts';
import { CheckboxPage, DescriptionPage, LabelPage } from './pages';

export const appRoutes: Route[] = [
  {
    path: '',
    component: PlaygroundLayout,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'checkbox'
      },
      {
        path: 'checkbox',
        component: CheckboxPage
      },
      {
        path: 'description',
        component: DescriptionPage
      },
      {
        path: 'label',
        component: LabelPage
      }
    ]
  }
];
