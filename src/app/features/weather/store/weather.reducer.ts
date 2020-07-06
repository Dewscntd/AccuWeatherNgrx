import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as WeatherActions from './weather.actions';
import { Weather } from '../../models/weather.model';

export const weathersFeatureKey = 'weathers';

export interface CurrentWeatherState {
  currentCondition: Weather;
  isLoading: boolean;
  error: any;
}


export const initialState: CurrentWeatherState = {
  currentCondition: null,
  isLoading: false,
  error: null
};


const productReducer = createReducer(
  initialState,
  on(WeatherActions.loadWeather,
    state => {
      return {
        ...state,
        isLoading: true
      };
    }
  ),
  on(WeatherActions.loadWeatherSuccess,
    (state, { weather }) => {
      return {
        ...state,
        currentCondition: weather,
        isLoading: false
      };
    }
  ),
  on(WeatherActions.loadWeatherFail,
    (state, action) => {
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    }
  )
);

export function reducer(state: CurrentWeatherState | undefined, action: Action) {
  return productReducer(state, action);
}
