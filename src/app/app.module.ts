import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { WeatherService } from './services/weather.service';
import { WeatherModule } from './features/weather/weather.module';
import { HeaderComponent } from './shared/header/header.component';
import { environment } from '../environments/environment';
import { AppEffects } from './app.effects';

import * as fromApp from './store/app.reducer';
import { FavoritesModule } from './features/favorites/favorites.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    WeatherModule,
    MatInputModule,
    FavoritesModule,
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
