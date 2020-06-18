import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    AutoCompleteComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    AutoCompleteComponent
  ]
})

export class ComponentsModule { }
