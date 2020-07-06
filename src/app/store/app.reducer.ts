import { ActionReducerMap } from '@ngrx/store';

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
