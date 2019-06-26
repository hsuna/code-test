import BaseStore from './BaseStore'

import Toast, { IToastState } from './modules/Toast';
import Preload, { IPreloadState } from './modules/Preload';

export interface IPreloadStates {
  Toast: IToastState
  Preload: IPreloadState
}

export default new BaseStore<IPreloadStates>([
  Toast,
  Preload,
])