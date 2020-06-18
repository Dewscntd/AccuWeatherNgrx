import { Weather } from '../../models/weather.model';
import * as fromWeatherActions from './weather.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const weatherStateFeatureKey = 'weatherState';

export interface WeatherState {
  currentWeather: Weather;
}
export const initialState: WeatherState = {
  currentWeather: null,
};

export function weatherReducer(
  state: WeatherState = initialState,
  action: fromWeatherActions.WeatherActions
) {
  switch ( action.type ) {
    case fromWeatherActions.LOAD_WEATHER:
      return {
        ...state
      };
    case fromWeatherActions.LOAD_WEATHER_SUCCESS:
      return {
        ...state,
        currentWeather: action.payload
      };
    case fromWeatherActions.LOAD_WEATHER_FAILURE:
      return {
        ...state
      };
    default:
      return state;
  }
}

const getCurrentWeatherFeatureState = createFeatureSelector<WeatherState>('currentWeather');

export const getCurrentConditions = createSelector(
  getCurrentWeatherFeatureState,
  (state: WeatherState) => state.currentWeather.currentCondition
);

export const getForecast = createSelector(
  getCurrentWeatherFeatureState,
  (state: WeatherState) => state.currentWeather.forecast
);

export const getCityName = createSelector(
  getCurrentWeatherFeatureState,
  (state: WeatherState) => state.currentWeather.cityName
);


