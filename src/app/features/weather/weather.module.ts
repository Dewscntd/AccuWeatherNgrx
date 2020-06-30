import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../../components/components.module';
import { WeatherComponent } from './weather.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ForecastComponent } from './forecast/forecast.component';
import { ForecastItemComponent } from './forecast/forecast-item/forecast-item.component';
import { MaterialModule } from 'src/app/material.module';

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
  ],
  exports: [
    WeatherComponent
  ]
})
export class WeatherModule { }
