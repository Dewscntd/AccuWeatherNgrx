import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ComponentsModule } from '../../components/components.module';
import { WeatherComponent } from './weather.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ForecastComponent } from './forecast/forecast.component';
import { ForecastItemComponent } from './forecast/forecast-item/forecast-item.component';
import { MaterialModule } from 'src/app/material.module';
import * as fromWeather from './store/weather.reducer';
import { WeatherEffects } from './store/weather.effects';

@NgModule({
  declarations: [
    WeatherComponent,
    CurrentWeatherComponent,
    ForecastComponent,
    ForecastItemComponent
  ],
  imports: [
    MaterialModule,
    FlexLayoutModule,
    ComponentsModule,
    CommonModule,
    StoreModule.forFeature(
      fromWeather.weathersFeatureKey,
      fromWeather.reducer,
       {
          // metaReducers: fromWeatherState.metaReducers
     }),
    // EffectsModule.forFeature([WeatherEffects]),
    StoreModule.forFeature(fromWeather.weathersFeatureKey, fromWeather.reducer),
    EffectsModule.forFeature([WeatherEffects]),
  ],
  exports: [
    WeatherComponent
  ]
})
export class WeatherModule { }
