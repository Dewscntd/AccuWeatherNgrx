import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FavoritesComponent } from './favorites.component';
import { MaterialModule } from 'src/app/material.module';

import { StoreModule } from '@ngrx/store';
import * as fromFavoritesState from './store/favorites.reducer';

@NgModule({
  declarations: [
    FavoritesComponent
  ],
  imports: [
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    FavoritesComponent
  ]
})
export class FavoritesModule { }
