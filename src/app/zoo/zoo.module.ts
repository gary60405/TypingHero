import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ZooRoutingModule } from './zoo-routing.module';

import { MaterialModule } from './../core/material';
// import {
//   ,
// } from './components';
import {
  StageComponent,
  ScoreBoardComponent,
} from './containers';

import * as fromZoo from './reducers';
import { ComputersEffects } from './effects';
import { ZooService } from './services/zoo.service';

export const COMPONENTS = [
];

export const CONTAINERS = [
  StageComponent,
  ScoreBoardComponent,
  // ZooComponent
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    ZooRoutingModule,
    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature(fromZoo.zooFeatureKey, fromZoo.reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([ComputersEffects]),
  ],
  declarations: [COMPONENTS, CONTAINERS],
  providers: [
    { provide: ZooService },
  ]

})
export class ZooModule {}
