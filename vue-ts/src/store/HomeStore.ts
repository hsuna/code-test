import Vue from 'vue';
import Vuex, { Store } from 'vuex'

import Toast, { IToastState } from './modules/Toast';
import Home, { IHomeState } from './modules/Home';

Vue.use(Vuex)

export interface IHomeStates {
  Toast: IToastState
  Home: IHomeState
}

export default new Store<IHomeStates>({
  modules:{
    Home,
    Toast
  }
})