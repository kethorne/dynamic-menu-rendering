import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
 
  {
    path: 'people',
    loadChildren: () => import('./characters/people/people.module').then( m => m.PeoplePageModule)
  },
  {
    path: 'species',
    loadChildren: () => import('./characters/species/species.module').then( m => m.SpeciesPageModule)
  },
  {
    path: 'starships',
    loadChildren: () => import('./transportation/starships/starships.module').then( m => m.StarshipsPageModule)
  },
  {
    path: 'vehicles',
    loadChildren: () => import('./transportation/vehicles/vehicles.module').then( m => m.VehiclesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
