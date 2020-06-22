import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { WeatherService } from 'src/app/services/weather.service';
import * as fromWeatherActions from './weather.actions';

@Injectable()
export class WeatherEffects {

  loadWeather$ = createEffect(() => this.actions$.pipe(
    ofType(fromWeatherActions.loadWeather),
    mergeMap(() => this.weatherService.getCurrentWeatherData()
      .pipe(
        map(weather => {
          return fromWeatherActions.loadWeatherSuccess({ weather });
          }
        ),
        catchError((error) => of(fromWeatherActions.loadWeatherFailure(error)))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) { }
}
