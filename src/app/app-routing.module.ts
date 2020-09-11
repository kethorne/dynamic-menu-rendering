import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './services/authguard.service';

const routes: Routes = [
    {
        path: 'log-in',
        loadChildren: () => import('./home/login-logout/log-in/log-in.module').then(m => m.LogInPageModule)
    },
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
