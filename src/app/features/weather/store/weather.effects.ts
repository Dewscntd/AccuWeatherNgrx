import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as fromWeatherActions from './weather.actions';
import { WeatherService } from 'src/app/services/weather.service';
import { Weather } from '../../models/weather.model';

@Injectable()
export class WeatherEffects {

  loadCurrentCondition$ = createEffect(() => this.actions$.pipe(
    ofType(fromWeatherActions.loadWeather),
    mergeMap(() => this.weatherService.getCurrentWeatherData()
      .pipe(
        map( (currentCondition: Weather) => fromWeatherActions.loadWeatherSuccess({
          cityName: currentCondition.cityName,
          currentCondition: currentCondition.currentCondition,
          forecast: currentCondition.forecast
        }),
          catchError(() => EMPTY)
        ))
    )
  ));

  constructor(private actions$: Actions, private weatherService: WeatherService) { }

}
