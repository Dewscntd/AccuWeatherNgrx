import { createAction, props } from '@ngrx/store';

import { Weather } from '../../models/weather.model';

export const loadWeather = createAction(
  '[AutoComplete] Load Weather'
);

export const loadWeatherSuccess = createAction(
  '[Weather Effect] Load Weather Success',
  props<{ currentConditions: Weather }>()
);

export const loadWeatherFailure = createAction(
  '[Weather Effect] Load Weather Failure',
  props<{ error: any }>()
);
