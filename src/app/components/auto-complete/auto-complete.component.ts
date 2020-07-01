import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CurrentWeatherState } from 'src/app/features/weather/store';
import * as fromWeatherActions from '../../features/weather/store/weather.actions';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
    private store: Store<CurrentWeatherState>
  ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: [null, [Validators.required, Validators.pattern(this.englishOnly)]],
    });
    this.searchForm.get('search').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe( data => {
      // get weather data according to search term
      this.store.dispatch(fromWeatherActions.loadWeather());
    });
  }
}
