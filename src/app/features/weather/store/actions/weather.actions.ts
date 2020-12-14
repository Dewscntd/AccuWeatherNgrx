import { createAction, props } from '@ngrx/store';

import { Weather } from '../../../models/weather.model';

export const loadWeather = createAction(
  '[Current-weather Component] Load Weather starts',
  props<{cityKey: string }>()
  );

export const loadWeatherSuccess = createAction(
  '[Weather Effects] Load Weather successful',
  props<{ weather: Weather }>()
);

export const loadWeatherFail = createAction(
  '[Weather Effects] Load Weather failed',
  props<{ error: Error }>()
);
