import {  Action } from '@ngrx/store';

import { Weather } from '../../models/weather.model';

export const LOAD_WEATHER = '[Weather] Load Weather';
export const LOAD_WEATHER_SUCCESS = '[Weather] Load Weather Success';
export const LOAD_WEATHER_FAILURE = '[Weather] Load Weather Failure';


export class LoadWeather implements Action {
  readonly type = LOAD_WEATHER;
}

export class LoadWeatherSuccess implements Action {
  readonly type = LOAD_WEATHER_SUCCESS;

  constructor(public payload: Weather) {}
}

export class LoadWeatherFailure implements Action {
  readonly type = LOAD_WEATHER_FAILURE;

  constructor(public payload: Error) {}
}

export type WeatherActions =
  | LoadWeather
  | LoadWeatherSuccess
  | LoadWeatherFailure;
