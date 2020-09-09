import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeoplePage } from './people.page';

const routes: Routes = [
  {
    path: '',
    component: PeoplePage,
    children: [
      {
        path: '',
        redirectTo: 'people-details'
      },
      {
        path: 'people-details',
        loadChildren: () => import('./people-details/people-details.module').then( m => m.PeopleDetailsPageModule)
      },
      {
        path: 'people-details/:birthYear',
        loadChildren: () => import('./people-details/people-details.module').then( m => m.PeopleDetailsPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeoplePageRoutingModule {}
