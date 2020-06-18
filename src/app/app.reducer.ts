import { ActionReducerMap } from '@ngrx/store';

import * as fromWeather from './features/weather/store/weather.reducer';
import * as fromFavorites from './features/favorites/store/favorites.reducer';

export interface State {
  currentWeather: fromWeather.WeatherState;
  favorites: fromFavorites.FavoriteState;
}

export const reducers: ActionReducerMap<State> = {
  currentWeather: fromWeather.weatherReducer,
  favorites: fromFavorites.favoritesReducer
};


