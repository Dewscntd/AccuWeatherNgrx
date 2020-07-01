import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { Weather } from '../../models/weather.model';
import * as fromWeatherActions from './weather.actions';

export const weatherStateFeatureKey = 'weatherState';

export interface WeatherState {
  currentCondition: Weather;
  isLoading: boolean;
  error: Error;
}

const initialState: WeatherState = {
  currentCondition: null,
  isLoading: false,
  error: null
};

export const reducers = createReducer(
  initialState,
  on(fromWeatherActions.loadWeather, (state, action) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(fromWeatherActions.loadWeatherSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      currentCondition: {...action.payload}
    };
  }),
  on(fromWeatherActions.loadWeatherFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error
    };
  })
);

export const selectCurrentConditionFeature = createFeatureSelector<WeatherState>(weatherStateFeatureKey);
export const selectCurrentCondition = createSelector(
  selectCurrentConditionFeature,
  (state: WeatherState) => state.currentCondition
);

export const metaReducers: MetaReducer<WeatherState>[] = !environment.production ? [] : [];
