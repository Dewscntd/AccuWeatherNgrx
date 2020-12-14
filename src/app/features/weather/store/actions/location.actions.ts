import { createAction, props } from '@ngrx/store';

export const GetCityKeyFromGeolocationApiStart = createAction(
  '[Current-Weather Component] Get city key from geolocation api started',
  props<{coords: {lat: number, lon: number }}>()
);

export const GetCityKeyFromGeolocationApiSuccess = createAction(
  '[Location Effects] Get city key from geolocation api successful',
  props<{locationData: {locationKey: string, locationName: string}}>()
);

export const GetCityKeyFromGeolocationApiFail = createAction(
  '[Location Effects] Get city key from geolocation api failed',
  props<{error: Error}>()
);

export const GetCityKeyFromAutocompleteApiStart = createAction(
  '[Autocomplete Component] Get city key from autocomplete api started',
  props<{userInput: string}>()
);

export const GetCityKeyFromAutocompleteApiSuccess = createAction(
  '[Location Effects] Get city key from autocomplete api successful',
  props<{locationData: {locationKey: string, locationName: string}}>()
);

export const GetCityKeyFromAutocompleteApiFail = createAction(
  '[Location Effects] Get city key from autocomplete api failed',
  props<{error: Error}>()
);
