import { createAction, props } from '@ngrx/store';

import { Favorite } from '../../models/favorite.model';

export const addFavorite = createAction(
  '[Current Weather] Add To favorites ',
  props<{ payload: Favorite }>()
);

export const deleteFavorite = createAction(
  '[Favorite] Delete From Favorites',
  props<{ id: number }>()
);
