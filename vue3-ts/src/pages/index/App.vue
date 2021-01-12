<template>
  <div>
    <!-- 页面 -->
    <div id="page">
      <!--banner-->
      <banner :shareUrl="state.shareUrl" @tab="handleTabChange"/>
    </div>
    
    <!-- 弹窗 -->
    <dialog-login v-if="store.state.dialogLogin.visible"></dialog-login>
  </div>
</template>

<script lang="ts">
import DialogLogin from '@/components/DialogLogin/index.vue'

import Banner from "./views/Banner.vue"

import { inject, reactive, createApp, computed, defineComponent, onBeforeMount } from 'vue'
import { Store } from './store/index'

import { expiresToken } from '@/api/token'
import { search } from '@/lib/query'
import { requestEncrypt, requestDecrypt, EncryptDataType, DecryptDataType } from "@/lib/fuse.auth"

const SHARE_KEY = 'SHARE0HW0HD'

export default {
  setup() {
    const store:Store = inject("store") as Store;
    const state = reactive({
      shareUrl: computed(():string => {  
        if(store.state.token && 1 == store.state.user_type){
          const share:string = (requestEncrypt(JSON.stringify(store.state.share), SHARE_KEY) as EncryptDataType).e
          return `${window.location.origin+window.location.pathname}?share=${encodeURIComponent(share)}`
        }
        return ''
      })
    })

    onBeforeMount(async () => {
      await store.init();
    
      const share:string = search('share');
      if(share){
        store.setTabActive(1)
        try{
          store.setInviterData(JSON.parse((requestDecrypt(share, SHARE_KEY) as DecryptDataType).d))
          await store.auth()
        }catch(err){
          console.error('The share code is error.')
        }
      }else if(store.state.user_id){//携带user_id信息的通过授权反查用户信息
        await store.auth()
      }else if(store.state.token){
        //授权回来5s内需要打开选择角色框
        await store.auth({ dialogLogin: expiresToken(5000), noJump: true })
      }
    })
    
    return {
      state,
      store,
      handleTabChange(index){
        store.setTabActive(index)
      }
    };
  },
  components: {
    Banner,
    DialogLogin,
  }
}
</script>

<style lang="less">
@import '~@/assets/styles/reset.less';

html, body{
  overflow-y: auto;
  -webkit-overflow-scrolling : touch;
}
body{
  background-color: #fff;
}

.btn{
	display: inline-block;
	background-size: 100%;
	border: none;
	outline: none;
  background-color: transparent;

	&:active{
		filter: brightness(90%);
  }
  
  &[disabled],
  &.disabled{
    filter: grayscale(1) !important;
  }
}
.box-text{
  position: relative;
  display: inline-block;
  min-width: 240px;
  padding: 6px 20px;
  font-size: 22px;
  border-radius: 6px;
  background-color: #227b83;
  color: #fff;

  &:before{
      content: '';
      position: absolute;
      left: 4px;
      top: 4px;
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 6px;
      border: 1px solid #227b83;
  }
}
</style>