import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CurrentCondition } from '../../models/current-condition.model';
import * as fromWeather from '../store/index';
import { Weather } from '../../models/weather.model';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {
  currentCondition$: Observable<CurrentCondition>;
  constructor(private store: Store<fromWeather.WeatherState>) { }

  ngOnInit(): void {
    this.currentCondition$ = this.store.pipe(select(fromWeather.getCurrentWeatherState));
    // this.store.pipe(select(fromWeather.getCurrentConditions)).subscribe(data => console.log(data));
  }

}
