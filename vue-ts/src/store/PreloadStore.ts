import Vue from 'vue';
import Vuex, { Store } from 'vuex'

import ToastModule, { IToastState } from './modules/Toast';
import PreloadModule, { IPreloadState } from './modules/Preload';
import { Module, getModule } from 'vuex-module-decorators';

Vue.use(Vuex)

export interface IPreloadStates {
  Toast: IToastState
  Preload: IPreloadState
}

@Module({ name: 'Preload', namespaced: true }) 
class Preload extends PreloadModule{}

@Module({ name: 'Toast', namespaced: true }) 
class Toast extends ToastModule{}

debugger;

export default new Store<IPreloadStates>({
  modules:{
    Preload,
    Toast
  }
})