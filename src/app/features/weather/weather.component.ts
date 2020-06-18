import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { WeatherState } from './store/weather.reducer';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  constructor(private store: Store<WeatherState>) { }

  ngOnInit() {
  }

}
