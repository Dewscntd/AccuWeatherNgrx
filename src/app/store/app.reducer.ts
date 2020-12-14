import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { LocationKeyState } from '../features/weather/store/reducers/location.reducer';
import * as fromFavorites from '../features/favorites/store/favorites.reducer';
import * as fromWeather from '../features/weather/store/reducers/weather.reducer';
import * as fromLocation from '../features/weather/store/reducers/location.reducer';

export interface AppState {
  favorites: fromFavorites.FavoritesState;
  weather: fromWeather.CurrentWeatherState;
  location: fromLocation.LocationKeyState;
}

export const appReducer: ActionReducerMap<AppState> = {
  favorites: fromFavorites.reducer,
  weather: fromWeather.reducer,
  location: fromLocation.reducer
};


export const getCurrentWeatherState = (state: AppState) => state.weather.currentCondition;
export const getWeatherLoadingErrorState = (state: AppState) => state.weather.error;
export const getWeatherIsLoadingState = (state: AppState) => state.weather.isLoading;


// Weather Selectors
export const getAppState = createFeatureSelector<AppState>('weather');
export const getWeatherSFeatureState = createSelector(
  getAppState,
  (state: AppState) => state.weather
);

export const getCurrentCondition = createSelector(
  getWeatherSFeatureState,
  (state: fromWeather.CurrentWeatherState) => state.currentCondition);
export const getWeatherLoadingError = createSelector(
  getWeatherSFeatureState,
  (state) => state.error);
export const getWeatherIsLoading = createSelector(
  getWeatherSFeatureState,
  (state) => state.error);

// Location Selectors
export const selectLocationFeature = createFeatureSelector<AppState, LocationKeyState>('location');
export const selectLocationFeatureState = createSelector(
  selectLocationFeature,
  (state: LocationKeyState) => state.locationKey
);

export const getLocationCityKey = createSelector(selectLocationFeature, fromLocation.getLocationKey);
export const getLocationCityName = createSelector(selectLocationFeature, fromLocation.getLocationName);
