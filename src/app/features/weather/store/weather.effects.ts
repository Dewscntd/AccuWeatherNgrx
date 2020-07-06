import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { WeatherService } from 'src/app/services/weather.service';
import * as fromWeatherActions from './weather.actions';
import { Weather } from '../../models/weather.model';

@Injectable()
export class WeatherEffects {

  loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType(fromWeatherActions.loadWeather),
    mergeMap(() => this.weatherService.getCurrentWeatherData()
      .pipe(
        map(( currentConditions: Weather) =>  fromWeatherActions.loadWeatherSuccess({ weather: {
          cityName: currentConditions.cityName,
          currentCondition: currentConditions.currentCondition,
          forecast: currentConditions.forecast
        }})),
        catchError((error) => of(fromWeatherActions.loadWeatherFail({error})))
      ))
    )
  );

  constructor(private actions$: Actions, private weatherService: WeatherService) {}
}
