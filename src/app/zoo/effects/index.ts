import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LayoutActions } from '../../core/actions';
import { StageActions } from '../actions';
import { map, switchMap } from 'rxjs/operators';


@Injectable()
export class ComputersEffects {

  constructor(
    private actions$: Actions,
  ) {}
}
