import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpeciesPage } from './species.page';

const routes: Routes = [
  {
    path: '',
    component: SpeciesPage,
    children: [
      {
        path: '',
        redirectTo: 'species-details'
      },
      {
        path: 'species-details',
        loadChildren: () => import('./species-details/species-details.module').then( m => m.SpeciesDetailsPageModule)
      },
      {
        path: 'species-details/:designation',
        loadChildren: () => import('./species-details/species-details.module').then( m => m.SpeciesDetailsPageModule)
      }
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpeciesPageRoutingModule {}
