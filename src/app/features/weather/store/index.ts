import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { environment } from '../../../../environments/environment';
import { Weather } from '../../models/weather.model';
import * as fromWeatherActions from './weather.actions';
import { CurrentCondition } from '../../models/current-condition.model';

export const weatherStateFeatureKey = 'weatherState';

export interface WeatherState extends EntityState<Weather> {
  error: Error;
}

export const adapter: EntityAdapter<Weather> = createEntityAdapter<Weather>();

export const initialState = adapter.getInitialState({
  error: undefined
});

export const reducers = createReducer(
  initialState,
  on(fromWeatherActions.loadWeather, (state) => state),
  on(fromWeatherActions.loadWeatherSuccess, (state, { weather }) => adapter.addOne(weather, state)),
  on(fromWeatherActions.loadWeatherFailure, (state, { error }) => adapter.addOne(error, state))
);

const getCurrentWeatherFeature = createFeatureSelector<WeatherState>(
  weatherStateFeatureKey
);

export const getCurrentWeatherState = createSelector(
  getCurrentWeatherFeature,
  adapter.getSelectors().selectAll
);

export const metaReducers: MetaReducer<WeatherState>[] = !environment.production
  ? []
  : [];
