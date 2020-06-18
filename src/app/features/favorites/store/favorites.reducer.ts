import { Weather } from '../../models/weather.model';
import * as fromActions from './favorites.actions';

export const favoritesFeatureKey = 'favoritesState';

export interface FavoriteState {
  favoriteWeather: Weather[];
}

const initialState: FavoriteState = {
  favoriteWeather: []
};

export function favoritesReducer(
  state: FavoriteState = initialState,
  action: fromActions.FavoriteActions
) {
  switch (action.type) {
    case fromActions.FAVORITE_ADDED:
      return {
        ...state,
        favoriteWeather: state.favoriteWeather.push(action.payload)
      };
    case fromActions.FAVORITE_DELETED:
      return {
        ...state,
        favoriteWeather: state.favoriteWeather
      };
    default:
    return {
      ...state
    };
  }
}
