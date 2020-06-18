import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherComponent } from './features/weather/weather.component';

const routes: Routes = [
  {
    path: '',
    component: WeatherComponent
  },
  {
    path: 'favorites',
    loadChildren:  () => import('./features/favorites/favorites.module').then(mod => mod.FavoritesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
