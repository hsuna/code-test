<template>
    <div id="banner">
        <div class="fb-group">
            <div class="fb-like-wrap">
                <div ga-event="Click-FB點贊" class="fb-like" :style="{transform: state.fbLikeScale}" data-href="https://www.facebook.com/WuXiaGame/" data-width="200" data-layout="button_count" data-action="like" data-size="large" data-show-faces="false" data-share="false"></div>
            </div>
            <a ga-event="Click-FB分享" class="btn fb-share" :href="state.fbShareUrl"></a>
        </div>
        <div class="nav-group">
            <button ga-event="Click-活動說明" class="btn btn-hdsm" type="button" @click="handleOpenRule"></button>
            <button ga-event="Click-立即下載" class="btn btn-ljxz" type="button" @click="handleDownload"></button>
            <a ga-event="Click-FB粉絲頁" class="btn btn-fbfsy" :href="store.state.facebook_url"></a>
        </div>
        <div class="tab-group">
            <button ga-event="Click-我要邀請新玩家" class="btn btn-yqxwj" type="button" @click="$emit('tab', 0)" :class="{disabled: 0 != store.state.tabActive}"></button>
            <button ga-event="Click-我是新玩家" class="btn btn-wsxwj" type="button" @click="$emit('tab', 1)" :class="{disabled: 1 != store.state.tabActive}"></button>
        </div>
        <div class="step-group">
            <button ga-event="Click-登入FB賬號" class="btn btn-fbzh" type="button" @click="handleLoginFacebook">
                <span v-if="store.state.server_id">
                    <strong>{{store.state.server_name}}</strong>
                    <strong>{{store.state.role_name}}</strong>
                    <strong>[切換]</strong>
                </span>
                <span v-else-if="store.state.user_info.length>0">請選擇伺服器及角色</span>
                <span class="fb-text" v-else-if="store.state.token">已登入FB賬號</span>
                <img v-else src="@/assets/images/img-title_1.png" />
            </button>
            <div v-if="state.isOldPlayer" ga-event="Click-生成專屬連結" ref="copyBtn" class="btn btn-fxlj" @click="handleCopy"><input type="text" :value="state.shareUrl" readonly placeholder="登入FB賬號并選角取得個人專屬邀請網址"/></div>
            <button v-else ga-event="Click-下載遊戲" class="btn btn-xzyx" type="button" @click="handleDownload"></button>
        </div>
    </div>
</template>

<script lang="ts">
import { inject, reactive, onMounted, computed } from 'vue';
import { Store } from '../store';
import ClipboardJS from 'clipboard'

export default {
    name: 'banner',
    props: {
        shareUrl: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const store:Store = inject("store") as Store;
        const state = reactive({
            fbShareUrl: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(location.origin+location.pathname)}`,
            clipboard: null,
            fbLikeScale: computed(() => `scale(${window.innerWidth*180/750/90})`),
            isOldPlayer: computed(() => 1 == store.state.user_type || (0 == store.state.user_type && 0 == store.state.tabActive))
        }) as {
            fbShareUrl: string,
            clipboard: ClipboardJS,
            fbLikeScale: string,
            isOldPlayer: boolean,
        }

        onMounted(() => {
            //一键复制功能
            state.clipboard = new ClipboardJS('.virtual-dom', {
                text:() => {
                    return props.shareUrl || '複製成功';
                }
            });
            state.clipboard.on('success', e => {
                if(!store.state.token) return this.$toast('請先登入Facebook帳號')
                if(!store.state.role_id) return this.$toast('請選擇伺服器和角色')
                this.$toast('複製成功');
            });
            state.clipboard.on('error', e => {
                this.$toast('複製失敗');
            });
        })

        return {
            state,
            store,
            async handleLoginFacebook(){
                await store.auth({ dialogLogin: true })
            },
            async handleDownload(){
                if(store.state.download_url){
                    try{
                        //如果是被邀请用户，则记录打点
                        await store.recordDownload()
                    }catch(e){
                        console.log('記錄打點失敗')
                    }finally{
                        window.location.href = store.state.download_url
                    }
                }
            },
            handleOpenRule(){
                store.openDialog({
                    dialog: 'dialogRule',
                    data: {
                        content: store.state.activity_desc
                    }
                })
            },
            handleCopy(evt){
                state.clipboard.onClick(evt)
            }
        }
    }

}
</script>

<style lang="less" scoped>
#banner{
    position: relative;
    width: 750px;
    min-height: 1331px;
    font-size: 0;
    background-image: url(~@/assets/images/img-banner.jpg);
    background-size: 100%;

    .fb-group{
        position: absolute;
        top:  20px;
        left: 20px;

        .fb-like-wrap{
            float: left;
            width: 180px;
            height: 56px;
            background: url(~@/assets/images/img-loading_1.gif) center no-repeat;
            background-color: #4167b5;
            background-size: 18%;
            border-radius: 10px;

            .fb-like{
                display: inline-block !important;
                transform-origin: 0 0;
            }
        }
        .fb-share{
            float: left;
            margin-left: 15px;
            width: 180px;
            height: 56px;
            background: url(~@/assets/images/img-btn_12.png) center no-repeat;
            background-color: #4167b5;
            background-size: 100%;
            border-radius: 10px;
        }
    }

    .nav-group{
        position: absolute;
        top:  720px;
        left: 0;
        right: 0;
        margin: 0 auto;
        text-align: center;
        font-size: 0;
        .btn{
            display: inline-block;
            width: 210px;
            height: 70px;
            margin: 0 15px;
            background-size: 100%;
            vertical-align: middle;
        }

        .btn-hdsm{
            background-image: url(~@/assets/images/img-btn_1.png);
        }
        .btn-ljxz{
            background-image: url(~@/assets/images/img-btn_2.png);
        }
        .btn-fbfsy{
            background-image: url(~@/assets/images/img-btn_3.png);
        }
    }

    .tab-group{
        position: absolute;
        top: 890px;
        left: 0;
        right: 0;
        margin: 0 auto;
        text-align: center;
        font-size: 0;
        .btn{
            display: inline-block;
            width: 320px;
            height: 70px;
            margin: 0 15px;
            background-size: 100%;
        }

        .btn-yqxwj{
            background-image: url(~@/assets/images/img-btn_4.png);
        }
        .btn-wsxwj{
            background-image: url(~@/assets/images/img-btn_5.png);
        }
    }

    .step-group{
        position: absolute;
        top: 990px;
        left: 0;
        right: 0;

        .btn{
            display: block;
            width: 670px;
            height: 102px;
            margin: 0 auto;
            background-size: 100%;
        }
        .btn-fbzh{
            padding-left: 230px;
            text-align: left;
            font: bold 32px SimSun;
            background-image: url(~@/assets/images/img-btn_6.png);
            color: #fff;

            strong{
                word-break: keep-all;
            }

            .fb-text{
                font-size: 40px;
            }

            img{
                width: 252px;
                height: 47px;
            }
        }
        .btn-fxlj{
            position: relative;
            margin-top: 30px;
            height: 175px;
            background-image: url(~@/assets/images/img-btn_7.png);

            input{
                position: absolute;
                left: 24px;
                bottom: 34px;
                width: 580px;
                height: 51px;
                font-size: 26px;
                line-height: 51px;
                padding: 0 20px;
                background-color: transparent;
            }
        }
        .btn-xzyx{
            margin-top: 40px;
            background-image: url(~@/assets/images/img-btn_8.png);
        }
    }
}
</style>
