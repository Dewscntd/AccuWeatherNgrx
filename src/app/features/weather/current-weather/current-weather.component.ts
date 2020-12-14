import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Weather } from '../../models/weather.model';
import { WeatherService } from 'src/app/services/weather.service';

import * as fromApp from '../../../store/app.reducer';
import * as locationActions from '../../weather/store/actions/location.actions';
import * as WeatherActions from '../store/actions/weather.actions';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {
  currentCondition$: Observable<Weather>;
  locationName$: Observable<string>;

constructor(
  private store: Store<fromApp.AppState>,
  private service: WeatherService
  ) { }

  ngOnInit(): void {
    this.getGeolocationCityKey();
    this.store.pipe(select(fromApp.getLocationCityKey)).subscribe(locationKey => {
      this.store.dispatch(WeatherActions.loadWeather({cityKey: locationKey}));
    });
    this.currentCondition$ = this.store.pipe(
      select( state => state.weather.currentCondition),
    );
    this.locationName$ = this.store.pipe(
      select(fromApp.getLocationCityName)
      );
  }

  addToFavorites() {
  }

  private getCurrentConditionsFromStore() {
    this.currentCondition$ = this.store.pipe(
      select(fromApp.getCurrentCondition)
      );
  }

  private getCurrentLocationName() {}

  private getGeolocationCityKey() {
    this.service.getGeoLocalPosition().then(({coords}) => {
      this.store.dispatch(locationActions.GetCityKeyFromGeolocationApiStart({
        coords: {
          lat: coords.latitude,
          lon: coords.longitude
        }
      }));
    });
  }

}
