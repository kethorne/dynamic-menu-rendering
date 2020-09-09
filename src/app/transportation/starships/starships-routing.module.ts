import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StarshipsPage } from './starships.page';

const routes: Routes = [
  {
    path: '',
    component: StarshipsPage
  },
  {
    path: 'starship-details',
    loadChildren: () => import('./starship-details/starship-details.module').then( m => m.StarshipDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StarshipsPageRoutingModule {}
