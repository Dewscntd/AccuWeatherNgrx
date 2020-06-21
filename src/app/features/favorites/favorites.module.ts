import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FavoritesComponent } from './favorites.component';
import { MaterialModule } from 'src/app/material.module';
import { FavoritesRoutingModule } from './favorites-routing.module';

@NgModule({
  declarations: [
    FavoritesComponent
  ],
  imports: [
    MaterialModule,
    FavoritesRoutingModule,
    FlexLayoutModule,
  ],
  exports: [
    FavoritesComponent
  ]
})
export class FavoritesModule { }
