import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';

import { FavoritesComponent } from './favorites.component';
import { MaterialModule } from 'src/app/material.module';
import { FavoritesRoutingModule } from './favorites-routing.module';
import * as fromFavorites from './store/favorites.reducer';

@NgModule({
  declarations: [
    FavoritesComponent
  ],
  imports: [
    MaterialModule,
    FavoritesRoutingModule,
    FlexLayoutModule,
    StoreModule.forFeature(fromFavorites.favoritesFeatureKey, fromFavorites.favoritesReducer)
  ],
  exports: [
    FavoritesComponent
  ]
})
export class FavoritesModule { }
