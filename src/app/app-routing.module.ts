import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherComponent } from './features/weather/weather.component';
import { FavoritesComponent } from './features/favorites/favorites.component';

const routes: Routes = [
  {
    path: '',
    component: WeatherComponent
  },
  {
    path: 'favorites',
    component: FavoritesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
