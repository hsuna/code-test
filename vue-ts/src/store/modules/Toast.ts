import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

export interface IToastState {
    message: string
    preList: string[]
}

@Module({ name: 'Toast', namespaced: true }) 
export default class Toast extends VuexModule implements IToastState{
    createMsg(message:any):any {
        return {
            msg:message,
            time:new Date().getTime()
        }
    }
    ///////////////////////////////////////////
    //////////  ///// state   ////// //////////
    //////////////////////////////////////////
    message:string = ''
    preList:string[] = []

    //////////////////////////////////////////
    /////////////// mutation  ////////////////
    //////////////////////////////////////////
    @Mutation
    toast(state:any, messages:never[]) {
        if(!state.message){
            state.message = this.createMsg(messages.shift());
        }
        state.preList=[].concat(state.preList, messages)
    }
    @Mutation
    shift(state:any){
        if(state.preList.length){
            state.message = this.createMsg(state.preList.shift());
        }else{
            state.message = null;
        }
    }
    @Mutation
    cleanList(state:any){
        state.preList=[];
    }
}