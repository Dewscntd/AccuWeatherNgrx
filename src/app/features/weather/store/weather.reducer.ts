import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as WeatherActions from './weather.actions';
import { Weather } from '../../models/weather.model';

export const weathersFeatureKey = 'weathers';

export interface CurrentWeatherState extends EntityState<Weather> {
  // additional entities state properties
  isLoading: boolean;
  error: any;
}

export const adapter: EntityAdapter<Weather> = createEntityAdapter<Weather>();

export const initialState: CurrentWeatherState = adapter.getInitialState({
  // additional entity state properties
  isLoading: false,
  error: null
});


const productReducer = createReducer(
  initialState,
  on(WeatherActions.loadWeather,
    (state, action) => {
      return {
        ...state,
        isLoading: true
      };
    }
  ),
  on(WeatherActions.loadWeatherSuccess,
    (state, action) => adapter.addOne(action.payload, state)
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


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
