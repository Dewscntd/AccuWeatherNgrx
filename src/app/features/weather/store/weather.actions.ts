import { createAction, props } from '@ngrx/store';

import { Weather } from '../../models/weather.model';

export const loadWeather = createAction(
  '[AutoComplete] Load Weathers'
  );

export const loadWeatherSuccess = createAction(
  '[Weather/API] Load Weather',
  props<{ weather: Weather }>()
);

export const loadWeatherFail = createAction(
  '[Weather/API] Load Weather',
  props<{ error: Error }>()
);
