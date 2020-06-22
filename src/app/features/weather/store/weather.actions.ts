import { createAction, props } from '@ngrx/store';

import { Weather } from '../../models/weather.model';

export const loadWeather = createAction(
  '[Weather autocomplete] Load Weathers'
);

export const loadWeatherSuccess = createAction(
  '[Weather] Load Weathers Success',
  props<{ weather: Weather }>()
);

export const loadWeatherFailure = createAction(
  '[Weather] Load Weathers Failure',
  props<{ error: any }>()
);
