import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';

import { AngularFireModule } from '@angular/fire';

import { MaterialModule } from './material';
import { firebaseConfig } from './../../environments/firebaseConfig';

import {
  ToolbarComponent,
} from './components';

import {
  AppComponent,
  NotFoundPageComponent
} from './containers';


export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  ToolbarComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {}
