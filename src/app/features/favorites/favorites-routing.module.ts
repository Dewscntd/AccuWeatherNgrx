import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoritesComponent } from './favorites.component';

const routs: Routes = [
  {
    path: '',
    component: FavoritesComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routs)
  ],
  exports: [
    RouterModule
  ]
})
export class FavoritesRoutingModule {}
