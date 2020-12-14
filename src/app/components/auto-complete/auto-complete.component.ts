import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as locationActions from '../../features/weather/store/actions/location.actions';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  userInputSub: Subscription;
  englishOnly = /^[a-zA-Z]+$/;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: [null, [Validators.required, Validators.pattern(this.englishOnly)]],
    });

    this.userInputSub =  this.searchForm
    .get('search').valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
      )
      .subscribe( userInput => this.store.dispatch(locationActions.GetCityKeyFromAutocompleteApiStart(userInput)));
  }

  ngOnDestroy() {
    this.userInputSub.unsubscribe();
  }
}
