import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { Weather } from '../../models/weather.model';
import * as fromWeatherActions from './weather.actions';
import { CurrentCondition } from '../../models/current-condition.model';

export const weatherStateFeatureKey = 'weatherState';

export interface WeatherState {
  currentWeather: Weather;
  error: Error;
}

const initialState: WeatherState = {
  currentWeather: null,
  error: null,
};

export const reducers = createReducer(
  initialState,
  on(fromWeatherActions.loadWeather, (state) => {
    return {
      ...state,
    };
  }),
  on(fromWeatherActions.loadWeatherSuccess, (state, { weather }) => {
    return {
      ...state,
      currentWeather: weather,
    };
  }),
  on(fromWeatherActions.loadWeatherFailure, (state, { error }) => {
    return {
      ...state,
      error,
    };
  })
);

const getCurrentWeather = (state: WeatherState) => state.currentWeather.currentCondition;

const getCurrentWeatherFeatureState = createFeatureSelector<WeatherState>(
  weatherStateFeatureKey
);

export const getCurrentWeatherState = createSelector(
  getCurrentWeatherFeatureState,
  getCurrentWeather
  );

export const metaReducers: MetaReducer<WeatherState>[] = !environment.production
  ? []
  : [];
