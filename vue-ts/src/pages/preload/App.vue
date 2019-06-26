<template>
    <div id="prehot">
		<!-- <div class="video-wrap" :class="{play: isPlay}">
			<video id="video" src="~src/assets/prehot/media/ysy.mp4" 
				width="100%"
				height="100%"
				preload="true" 
				x5-video-orientation="portraint" 
				controls
			></video>
			<button type="button" class="btn video-close" @click="handlerVideoClose"></button>
			 x5-video-player-type="h5" 
			x5-video-player-fullscreen="true"
		</div> -->
		<Main/>
        
		<!-- <k-mask v-if="state.isShowMask" :canTouch="false"></k-mask>
		<k-toast></k-toast> -->
		<!-- 弹窗 -->
		<!-- <dialog-pre-check v-if="state.dialogPreCheck" /> --><!-- 信息验证 -->
		<!-- <dialog-pre-jump v-if="state.dialogPreJump" /> --><!-- 公众号跳转 -->
 		<!-- <dialog-pre-number v-if="state.dialogPreNumber" /> --><!-- 预约编号 -->
		<!-- <dialog-pre-redbag v-if="state.dialogPreRedbag" /> --><!-- 预约红包 -->
		<!-- <dialog-pre-succee v-if="state.dialogPreSuccee" /> --><!-- 预约成功 -->
		<!-- <dialog-pre-share v-if="state.dialogPreShare" /> --><!-- 分享 -->
		<!-- <dialog-img-preview v-if="state.dialogImgPreview" /> --><!-- 图片预览 -->
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, namespace } from 'vuex-class'


import Main from "./views/Main.vue";
/* import KMask from "@/components/Base/Mask/index.vue";
import KToast from "@/components/Base/Toast/index.vue";

import DialogPreCheck from "@/components/Prehot/DialogPreCheck/index.vue";
import DialogPreRedbag from "@/components/Prehot/DialogPreRedbag/index.vue";
import DialogPreJump from "@/components/Prehot/DialogPreJump/index.vue";
import DialogPreNumber from "@/components/Prehot/DialogPreNumber/index.vue";
import DialogPreSuccee from "@/components/Prehot/DialogPreSuccee/index.vue";
import DialogPreShare from "@/components/Prehot/DialogPreShare/index.vue";
import DialogImgPreview from "@/components/Prehot/DialogImgPreview/index.vue"; */

const PreloadStore = namespace('Preload')

@Component({
  components: { 
    Main,
    /* KMask,
    KToast,
    DialogPreCheck,
    DialogPreRedbag,
    DialogPreJump,
    DialogPreNumber,
    DialogPreSuccee,
    DialogPreShare,
    DialogImgPreview, */
  },
})
export default class Prehot extends Vue {
    @PreloadStore.State isShowMask
    @PreloadStore.State dialogPreCheck
    @PreloadStore.State dialogPreJump
    @PreloadStore.State dialogPreNumber
    @PreloadStore.State dialogPreRedbag
    @PreloadStore.State dialogPreSuccee
    @PreloadStore.State dialogPreShare
    @PreloadStore.State dialogImgPreview
    
    @PreloadStore.Mutation('init') initMutation
    @PreloadStore.Action('INIT') initAction
    
    private isPlay:boolean=false
    private video!:HTMLVideoElement
	
	created() {
		window.addEventListener("loadinghide", this.init)
	}
	mounted(){
		this.video = document.getElementById('video') as HTMLVideoElement
		if(this.video){
			this.video.addEventListener("play", evt => {
                this.isPlay = true
            })/* 
            this.video.addEventListener("pause", evt => {
                this.isPlay = false
            }) */
        }
	}
	destroyed(){
	}
    
    async init() {
        const {code, error, data}= await this.initAction()
        if(0 !== code){
            //this.toast(error);
            return
        }

        //分享处理
        /* wxShare({
            title: '抽红包啦 | 零氪金手游《潮爆战纪》全网预约正式开启',
            desc: '参与《潮爆战纪》手游预约，即可抽取最高888元微信现金红包，快来抢先预约吧~',
            img: location.origin + require('./assets/prehot/img/app-share.jpg'),
            link: location.href.replace(/(\?|&)is_share=([^&]*)(&|$)/, '$1') + `&is_share=${data.uid}`,
            success: res => {
                this.$store.commit("closeDialog", "PreShare");
            },
        }) */

        //this.init(data);
    }
    handlerVideoClose(){
        this.video && this.video.pause()
        this.isPlay = false
    }
}
</script>

<style lang="scss">
body{
	overflow-y: auto;
	background-color: #1c153f;
}

#prehot {
	/* width: 7.50rem;
	height: 47.25rem;
	background-image: url('~@/assets/prehot/img/img-test.jpg'); */
	background-size: cover;
	background-color: #2c3343;
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
}
</style>
