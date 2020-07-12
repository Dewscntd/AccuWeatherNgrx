import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromFavorites from '../features/favorites/store/favorites.reducer';
import * as fromWeather from '../features/weather/store/weather.reducer';

export interface AppState {
  favorites: fromFavorites.FavoritesState;
  weather: fromWeather.CurrentWeatherState;
}

export const appReducer: ActionReducerMap<AppState> = {
  favorites: fromFavorites.reducer,
  weather: fromWeather.reducer
};

export const getAppState = createFeatureSelector<AppState>('weather');

export const getWeatherState = createSelector(
  getAppState,
  (state: AppState) => state.weather
);

export const getCurrentCondition = createSelector(getWeatherState, fromWeather.getCurrentWeather);
export const getWeatherLoadingError = createSelector(getWeatherState, fromWeather.getWeatherLoadingError);
export const getWeatherIsLoading = createSelector(getWeatherState, fromWeather.getWeatherIsLoading);
