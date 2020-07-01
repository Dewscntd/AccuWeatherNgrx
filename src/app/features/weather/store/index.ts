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

export interface CurrentWeatherState {
  currentCondition: Weather;
  isLoading: boolean;
  error: Error;
}

const initialState: CurrentWeatherState = {
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

export const getCurrentConditions = (state: CurrentWeatherState) => state.currentCondition;

export const selectCurrentConditionFeatureState = createFeatureSelector<CurrentWeatherState>(weatherStateFeatureKey);
export const selectCurrentCondition = createSelector(
  selectCurrentConditionFeatureState,
  (state: CurrentWeatherState) => state.currentCondition
);

export const getAllCurrentCondition = createSelector(selectCurrentConditionFeatureState, getCurrentConditions);


export const metaReducers: MetaReducer<CurrentWeatherState>[] = !environment.production ? [] : [];
