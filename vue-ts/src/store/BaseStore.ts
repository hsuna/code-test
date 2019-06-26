import Vue from 'vue';
import Vuex, { Store } from 'vuex'

import { getModule } from 'vuex-module-decorators';

Vue.use(Vuex)

export default class BaseStore<T> extends Store<T> {
    constructor(modules:any[]){
      super({
        modules: Object.assign({}, ...modules.map((module:any) => ({[module.name]: module})))
      })
      modules.forEach((module:any) => getModule(module, this))
    }
  }