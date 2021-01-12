<template>
    <dialog-base className="dialog-login">
        <button v-if="state.dialogLogin.close" class="btn btn-close" type="button" @click="close"></button>
        <div class="select-group">
            <select-item :label="'伺服器'" :list="state.serverList" :active="state.serverIndex" @change="handlerServerChange"></select-item>
            <select-item :label="'角&nbsp;&nbsp;&nbsp;&nbsp;色'" :list="state.roleList" :active="state.roleIndex" @change="handlerRoleChange"></select-item>
        </div>
        <div class="btn-group">
            <button type="button" class="btn btn-confirm" :disabled="-1 === state.serverIndex || -1 === state.roleIndex" @click="handlerConfirmClick"></button>
        </div>
    </dialog-base>
</template>

<script lang="ts">
import DialogBase from '@/components/DialogBase/index.vue'
import SelectItem from '@/components/SelectItem/index.vue'

import { reactive, inject, computed, onMounted } from 'vue'
import { Store, DialogState } from '../../pages/index/store'

export default {
    name: 'dialogLogin',
    components: {
      DialogBase,
      SelectItem
    },
    setup(){
        const store:Store = inject("store") as Store;

        const state = reactive({
            serverIndex: -1,
            roleIndex: -1,
            dialogLogin: computed(() => store.state.dialogLogin),
            server: computed(() => state.dialogLogin.server || []),
            serverList: computed(() => state.server.map(item => ({
                value: item.server_id,
                text: item.server_name,
                data: item
            })) || []),
            roleList: computed(() => state.server[state.serverIndex] && state.server[state.serverIndex].role.map(item => ({
                value: item.role_id,
                text: item.role_name,
                data: item
            })) || []),
        })

        const handlerRoleChange = (index:number) => {
            state.roleIndex = index
        }
        const handlerServerChange = (index:number) => {
            state.serverIndex = index
            handlerRoleChange(0)
        }

        onMounted(() => {
            if(state.server.length > 0){
                handlerServerChange(0);
            }
        })

        return {
            state,
            store,
            handlerServerChange,
            handlerRoleChange,
            handlerConfirmClick(){
                const server = state.serverList[state.serverIndex]
                const role = state.roleList[state.roleIndex]
                if(role){
                    store.getUser({
                        ...server.data,
                        ...role.data,
                    })
                }
                state.dialogLogin.visible = false
            },
            close(){
                state.dialogLogin.visible = false
            }
        }
    }
}
</script>

<style lang="less">
.dialog-login{
    position: relative;
    width: 750px;
    height: 462px;
    background-image: url('~@/assets/images/img-dialog_2.png');
    background-size: 100%;
    font-size: 0;

    .btn-close{
        position: absolute;
        top: 50px;
        right: 60px;
        width: 32px;
        height: 32px;
        background-image: url('~@/assets/images/img-close_1.png');
        background-size: 100%;
    }

    .select-group{
        margin: 110px auto 60px;
        text-align: center;
        font-size: 28px;

        .select-item{
            margin-bottom: 50px;
        }
    }

    .btn-group{
        text-align: center;

        .btn-confirm{
            display: inline-block;
            width: 206px;
            height: 58px;
            background-image: url('~@/assets/images/img-btn_13.png');
            background-size: 100%;
        }
    }
}
</style>
