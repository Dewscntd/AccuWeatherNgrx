import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

import * as fromWeatherActions from '../../features/weather/store/weather.actions';
import { WeatherState } from 'src/app/features/weather/store';


@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {
  searchForm: FormGroup;
  englishOnly = /^[a-zA-Z]+$/;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<WeatherState>
  ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: [null, [Validators.required, Validators.pattern(this.englishOnly)]],
    });
    this.searchForm.get('search').valueChanges.subscribe( data => {
      // get weather data according to search term
      this.store.dispatch(fromWeatherActions.loadWeather());
    });
  }
}
