import { createReducer, on, Action } from '@ngrx/store';

import * as fromLocationActions from '../actions/location.actions';

export interface LocationKeyState {
  locationKey: string;
  locationName: string;
  error: Error;
}

const initialState: LocationKeyState  = {
  locationKey: null,
  locationName: null,
  error: null,
};


const scoreboardReducer = createReducer(
  initialState,
  on(fromLocationActions.GetCityKeyFromGeolocationApiStart, state => ({...state})),
  on(fromLocationActions.GetCityKeyFromGeolocationApiFail, (state, {error}) => ({...state, error })),
  on(fromLocationActions.GetCityKeyFromGeolocationApiSuccess, (state, action) => {
    return {
      ...state,
      locationKey: action.locationData.locationKey,
      locationName: action.locationData.locationName
    };
  }),
  on(fromLocationActions.GetCityKeyFromAutocompleteApiStart, state => ({...state})),
  on(fromLocationActions.GetCityKeyFromAutocompleteApiSuccess, (state, {locationData}) => {
    return {
      ...state,
      locationKey: locationData.locationKey,
      locationName: locationData.locationName
    };
  }),
  on(fromLocationActions.GetCityKeyFromAutocompleteApiFail, (state, { error }) => ({...state, error}))
);

export function reducer(state: LocationKeyState | undefined, action: Action) {
  return scoreboardReducer(state, action);
}

export const getLocationKey = (state: LocationKeyState) => state.locationKey;
export const getLocationName = (state: LocationKeyState) => state.locationName;
export const getWeatherLoadingError = (state: LocationKeyState) => state.error;
