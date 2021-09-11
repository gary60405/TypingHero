import { createReducer, on } from '@ngrx/store';
import { AlertInfo, musicStateEnum } from '../../zoo/models';
import { LayoutActions } from './../actions';

export const layoutFeatureKey = 'layout';

export interface State {
  mode: string;
  username: string;
  isMute: boolean;
  alertType: string;
  progressBarState: boolean;
  bgMusicState: musicStateEnum;
  dieMusicState: musicStateEnum;
  failMusicState: musicStateEnum;
}

const initialState: State = {
  mode: 'underText',
  username: '',
  isMute: false,
  alertType: 'NORMAL',
  progressBarState: false,
  bgMusicState: musicStateEnum.ready,
  dieMusicState: musicStateEnum.ready,
  failMusicState: musicStateEnum.ready
};

export const reducer = createReducer(
  initialState,
  on(LayoutActions.setMode, (state, { mode }) => ({
    ...state,
    mode
  })),
  on(LayoutActions.setMuteState, (state, { isMute }) => ({
    ...state,
    isMute
  })),
  on(LayoutActions.setProgressBar, (state, { progressBarState }) => ({
    ...state,
    progressBarState
  })),
  on(LayoutActions.setAlertType, (state, { alertType }) => ({
    ...state,
    alertType
  })),
  on(LayoutActions.setUsernameState, (state, { username }) => ({
    ...state,
    username
  })),
  on(LayoutActions.setBgMusicState, (state, { bgMusicState }) => ({
    ...state,
    bgMusicState
  })),
  on(LayoutActions.setFailMusicState, (state, { failMusicState }) => ({
    ...state,
    failMusicState
  })),
  on(LayoutActions.setDieMusicState, (state, { dieMusicState }) => ({
    ...state,
    dieMusicState
  })),
);

export const selectIsMute = (state: State): boolean => state.isMute;
export const selectUsername = (state: State): string => state.username;
export const selectLoaded = (state: State): boolean => state.progressBarState;
export const selectAlertInfo = (state: State): AlertInfo => {
    switch (state.alertType) {
      case 'NORMAL':
        return {
          display: false,
          colorClass: '',
          content: ''
        };
      case 'QUERY NOT IN THE RANGE':
        return {
          display: true,
          colorClass: 'alert-danger',
          content: '條件範圍內查無資料！'
        };
      case 'EMPTY DATE':
        return {
          display: true,
          colorClass: 'alert-warning',
          content: '未填日期，故顯示最近@N日的統計資料'
        };
      case 'ERROR DATE FORMAT':
        return {
          display: true,
          colorClass: 'alert-warning',
          content: '日期格式錯誤，故顯示最近@N日的統計資料'
        };
      case 'EXECUTING QUERY':
        return {
          display: true,
          colorClass: 'alert-info',
          content: '資料查詢中...'
        };
      default:
        return {
          display: false,
          colorClass: '',
          content: ''
        };
    }
};
