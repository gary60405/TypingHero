import { createAction, props } from '@ngrx/store';
import { musicStateEnum } from '../../zoo/models';

export const setMode = createAction('[Layout] Set Mode',
  props<{ mode: string }>()
);
export const setProgressBar = createAction('[Layout] Set Progress Bar State',
  props<{ progressBarState: boolean }>()
);
export const setAlertType = createAction('[Layout] Set Alert Type',
  props<{ alertType: string }>()
);
export const setMuteState = createAction('[Layout] Set Mute State',
  props<{ isMute: boolean }>()
);
export const setUsernameState = createAction('[Layout] Set Username State',
  props<{ username: string }>()
);
export const setBgMusicState = createAction('[Layout] Set BgMusic State',
  props<{ bgMusicState: musicStateEnum }>()
);
export const setDieMusicState = createAction('[Layout] Set DieMusic State',
  props<{ dieMusicState: musicStateEnum }>()
);
export const setFailMusicState = createAction('[Layout] Set FailMusic State',
  props<{ failMusicState: musicStateEnum }>()
);
