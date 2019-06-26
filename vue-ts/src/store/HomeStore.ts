import BaseStore from './BaseStore'

import Toast, { IToastState } from './modules/Toast';
import Home, { IHomeState } from './modules/Home';

export interface IHomeStates {
  Toast: IToastState
  Home: IHomeState
}

export default new BaseStore<IHomeStates>([
  Toast,
  Home,
])