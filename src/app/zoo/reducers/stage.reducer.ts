import { createReducer, on } from '@ngrx/store';
import { StageActions } from '../actions';
import { Animal } from '../models';

export const stageFeatureKey = 'stage';

export interface State {
  animals: Animal[];
  score: number;
  display: boolean;
  gameState: string;
  // isStart: boolean;
  // isDie: boolean;
}

const initialState: State = {
  animals: [],
  score: 0,
  display: false,
  gameState: 'PENDING',
  // isStart: false,
  // isDie: false
};

export const reducer = createReducer(
  initialState,
  on(StageActions.setGameState, (state, { gameState }) => ({
    ...state,
    gameState
  })),
  on(StageActions.clearAnimalList, (state) => ({
    ...state,
    animals: []
  })),
  on(StageActions.appendAnimalToList, (state, { animal }) => ({
    ...state,
    animals: [
      ...state.animals,
      animal
    ]
  })),
  on(StageActions.deleteAnimalFromList, (state, { code }) => {
    const idx = state.animals.findIndex((animal: Animal) => animal.code === code);
    state.animals.splice(idx, 1);
    return {
      ...state,
      animals: [
        ...state.animals
      ]
    };
  }),
);

export const selectScore = (state: State): number => state.score;
export const selectGameState = (state: State): string => state.gameState;
export const selectAnimalsList = (state: State): Animal[] => state.animals;
