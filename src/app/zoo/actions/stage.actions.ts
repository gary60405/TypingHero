import { createAction, props } from '@ngrx/store';
import { Animal } from '../models';

export const setGameState = createAction('[Zoo] Set GameState',
  props<{ gameState: string }>()
);

export const clearAnimalList = createAction('[Zoo] Clear Animals List');
export const appendAnimalToList = createAction('[Zoo] Append Animals To List',
  props<{ animal: Animal }>()
);
export const deleteAnimalFromList = createAction('[Zoo] Delete Animal From List',
  props<{ code: string }>()
);


