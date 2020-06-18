import { Action } from '@ngrx/store';

import { Weather } from '../../models/weather.model';

export const FAVORITE_ADDED = '[Favorite-Item] Add to favorites';
export const FAVORITE_DELETED = '[Favorite-Item] Remove favorite';

export class FavoriteAdded implements Action {
  readonly type = FAVORITE_ADDED;

  constructor(public payload: Weather) {}
}

export class FavoriteDeleted implements Action {
  readonly type = FAVORITE_DELETED;

  // constructor(public payload: any) {}
}

export type FavoriteActions =
  | FavoriteAdded
  | FavoriteDeleted;
