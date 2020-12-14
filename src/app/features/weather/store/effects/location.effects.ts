import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { WeatherService } from 'src/app/services/weather.service';
import { GeoLocationApi } from 'src/app/features/models/geoLocation.model';
import { AutoComplete } from 'src/app/features/models/autocomplete.model';
import * as locationActions from '../actions/location.actions';
import * as fromApp from '../../../../store/app.reducer';

@Injectable()
export class LocationEffects {

  loadLocationKeyFromGeolocation$ = createEffect(() => this.actions$.pipe(
    ofType(locationActions.GetCityKeyFromGeolocationApiStart),
    mergeMap(({coords}) =>
      this.weatherService.getCityKeyFromGeolocationApi(coords.lat, coords.lon)
      .pipe(
        map( (locationData: GeoLocationApi) => (locationActions.GetCityKeyFromGeolocationApiSuccess(
          {
           locationData: {
             locationKey: locationData.Key,
              locationName: locationData.LocalizedName}
            }
          )
        )),
        catchError((error) => (of(locationActions.GetCityKeyFromGeolocationApiFail(error))))
      ))
    )
  );

  loadLocationKeyFromAutoComplete$ = createEffect(() => this.actions$.pipe(
    ofType(locationActions.GetCityKeyFromAutocompleteApiStart),
    mergeMap((action) =>
      this.weatherService.getCityKEyFromAutoCompleteApi(action.userInput)
      .pipe(
        map( (locationData: AutoComplete) =>
        (locationActions.GetCityKeyFromAutocompleteApiSuccess(
          {
            locationData: {
              locationKey: locationData.Key,
              locationName: locationData.LocalizedName
            }
          })
        )),
        catchError((error) => (of(locationActions.GetCityKeyFromAutocompleteApiFail(error))))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService,
    private store: Store<fromApp.AppState>
  ) { }
}
