import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Weather } from '../../models/weather.model';
import { WeatherState } from '../store';
import * as fromWeather from '../store/index';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {
  currentCondition$: Observable<Weather>;
  constructor(private store: Store<WeatherState>) { }

  ngOnInit(): void {
    this.currentCondition$ = this.store.pipe(select(fromWeather.selectCurrentCondition));
  }

}
