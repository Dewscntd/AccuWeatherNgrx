import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { WeatherService } from 'src/app/services/weather.service';
import * as fromWeatherActions from './weather.actions';

@Injectable()
export class WeatherEffects {

  loadWeather$ = createEffect(() => this.actions$
  .pipe(
    ofType(fromWeatherActions.LOAD_WEATHER),
    mergeMap(() => this.weatherService.getCurrentData().pipe(
        map(weather => new fromWeatherActions.LoadWeatherSuccess({
          cityName: weather.cityName,
          currentCondition: weather.currentCondition,
          forecast: weather.forecast
        })),
        catchError((error) => of(new fromWeatherActions.LoadWeatherFailure(error)))
      ))
    )
  );

  constructor(private actions$: Actions, private weatherService: WeatherService) { }

}
