import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';

import { Weather } from '../../../models/weather.model';
import { WeatherService } from 'src/app/services/weather.service';

import * as WeatherActions from '../actions/weather.actions';
import * as LocationActions from '../actions/location.actions';

@Injectable()
export class WeatherEffects {

  loadWeatherData$ = createEffect(() => this.actions$.pipe(
    ofType(WeatherActions.loadWeather),
    mergeMap(
      (action) => this.weatherService.getCurrentConditionAndForecastForLocationKey(action.cityKey)
      .pipe(
        map(weatherData => (WeatherActions.loadWeatherSuccess({
          weather: {
            currentCondition: weatherData.currentConditions,
            forecast: weatherData.forecast
          },
        }))),
        catchError((error) => of(WeatherActions.loadWeatherFail(error)))
      ))
    )
  );

  constructor(private actions$: Actions, private weatherService: WeatherService) {}
}

