import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { reducers, metaReducers } from './store/reducers';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';
import { HeaderComponent } from './shared/header/header.component';
import { WeatherComponent } from './features/weather/weather.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { WeatherService } from './services/weather.service';
import { AppEffects } from './app.effects';

@NgModule({
  declarations: [
    AppComponent,
    AutoCompleteComponent,
    HeaderComponent,
    WeatherComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
