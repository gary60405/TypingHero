import {
  createSelector,
  createFeatureSelector,
  combineReducers,
  Action,
} from '@ngrx/store';
import * as fromStage from './stage.reducer';
import * as fromRoot from './../../reducers';

export const zooFeatureKey = 'zoo';

export interface ZooState {
  [fromStage.stageFeatureKey]: fromStage.State;
}

export interface State extends fromRoot.State {
  [zooFeatureKey]: ZooState;
}


/** Provide reducer in AoT-compilation happy way */
export function reducers(state: ZooState | undefined, action: Action) {
  return combineReducers({
    [fromStage.stageFeatureKey]: fromStage.reducer
  })(state, action);
}

export const selectZooState = createFeatureSelector<State, ZooState>(
  zooFeatureKey
);

// Part of stage
export const selectStageEntitiesState = createSelector(
  selectZooState,
  (state) => state.stage
);

export const selectScore = createSelector(
  selectStageEntitiesState,
    fromStage.selectScore
);
export const selectGameState = createSelector(
  selectStageEntitiesState,
    fromStage.selectGameState
);
export const selectAnimalsList = createSelector(
  selectStageEntitiesState,
    fromStage.selectAnimalsList
);
