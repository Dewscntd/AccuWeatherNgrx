import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EffectsModule } from '@ngrx/effects';


import { ComponentsModule } from '../../components/components.module';
import { WeatherComponent } from './weather.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ForecastComponent } from './forecast/forecast.component';
import { ForecastItemComponent } from './forecast/forecast-item/forecast-item.component';
import { MaterialModule } from 'src/app/material.module';
import * as fromWeatherState from './store/weather.reducer';
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
    EffectsModule.forFeature([WeatherEffects]),
    StoreModule.forFeature(
      fromWeatherState.weatherStateFeatureKey,
      fromWeatherState.weatherReducer),
  ],
  exports: [
    WeatherComponent
  ]
})
export class WeatherModule { }
