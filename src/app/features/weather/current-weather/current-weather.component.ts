import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Weather } from '../../models/weather.model';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {
  currentCondition$: Observable<Weather[]>;
  constructor() { }

  ngOnInit(): void {
    // this.currentCondition$ = this.store.pipe(select(fromWeather.getCurrentWeatherState));
    // this.store.pipe(select(fromWeather.getCurrentWeatherState)).subscribe(data => console.log(data));
  }

}
