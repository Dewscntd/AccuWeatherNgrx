import {
  MetaReducer,
  createReducer,
  on,
  Action
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { Favorite } from 'src/app/features/models/favorite.model';
import * as fromFavoritesActions from './favorites.actions';

export const favoritesStateFeatureKey = 'favoritesState';

export interface FavoritesState {
  favorites: Favorite[];
}

const initialState: FavoritesState = {
  favorites: []
};

const favoritesReducer = createReducer(
  initialState,
  on(fromFavoritesActions.addFavorite, (state, action) => ({
    ...state,
    favorites: [...state.favorites, action.payload]
  })),
  on(fromFavoritesActions.deleteFavorite, (state, action) => {
    return {
      ...state
    };
  }),
);

export function reducer(state: FavoritesState | undefined, action: Action) {
  return favoritesReducer(state, action);
}

export const metaReducers: MetaReducer<FavoritesState>[] = !environment.production ? [] : [];
