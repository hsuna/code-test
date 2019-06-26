<template>
    <div id="banner">
        <a class="music" :class="{'off':!isPlay}" @click="toggleMusic"></a>
        <button @click="handlerGetClick" type="button" class="btn btn-main" title="预约抽红包"></button>
        <div class="title" :class="{'ios':is_ios}"></div>
        <div v-if="!is_ios" class="btn-group">
            <button @click="scrollTo('section1')" type="button" class="btn btn-schb" title="预约抽红包"></button>
            <button @click="scrollTo('section2')" type="button" class="btn btn-xszk" title="预约赢手机"></button>
            <button @click="scrollTo('section3')" type="button" class="btn btn-jrhb" title="精彩抢先看"></button>
        </div>
        <div v-else class="btn-group2">
            <button @click="scrollTo('section1')" type="button" class="btn btn-schb" title="预约抽红包"></button>
            <button @click="scrollTo('section3')" type="button" class="btn btn-jrhb" title="精彩抢先看"></button>
        </div>
    </div>
</template>

<script lang="ts">
import { AUDIO_LOCAL_STORAGE } from '@/config/prehot'

import scrollToTarget from "@/lib/scroll2Target";

import { Component, Watch, Vue } from 'vue-property-decorator'
import { State, Action, Mutation, namespace } from 'vuex-class'

const PreloadStore = namespace('Preload')

@Component
export default class Banner extends Vue {
    @PreloadStore.State is_ios;
    @PreloadStore.State is_book;
    @PreloadStore.State is_recv;
    @PreloadStore.Mutation openDialog;
    @PreloadStore.Action('GET_BOOK_PRIZE_RECV') getBookPrizeRecv;
    

    target:any = {}; //元素缓存
    isPlay:boolean = 'false' === localStorage.getItem('AUDIO_LOCAL_STORAGE') ? false : true;

    @Watch('isPlay')
    onIsPlayChange(value){
        /* if(window.audio){
            if(value){
                window.audio.play();
            }else{
                window.audio.pause();
            }
            localStorage.setItem(AUDIO_LOCAL_STORAGE, value);
        } */
    }

    scrollTo(id){
        if(!this.target.container){
            this.target.container=document.getElementById("page");
        }
        if(!this.target[id]){
            this.target[id]=document.getElementById(id);
        }
        if(!this.target.container||!this.target[id]){
            return
        }
        scrollToTarget(this.target[id], this.target.container, 'auto')
    }

    toggleMusic(){
        this.isPlay = !this.isPlay;
    }

    openDialogSuccess(type:string, data:any={}){
        return new Promise(success => {
            this.openDialog({ type, data: { ...data, success } })
        })
    }

    async handlerGetClick(){
        if(1 != this.is_book){
            //this.log(16003);
            this.openDialogSuccess('PreCheck')
            .then(res => {
                return this.openDialogSuccess('PreSuccee', { type: 0 })
            })
            .then(res => {
                this.handlerGetClick()
            })
        }else if(1 != this.is_recv){
            const error = await this.getBookPrizeRecv()
            if(error){
               // if(true !== error) this.toast(error)
            }else{
                this.openDialog({ 
                    type: 'PreRedbag', 
                    data: {
                        animat: true
                    }
                })
            }
        }else{
            this.openDialog('PreRedbag')
        }
    }
}
</script>

<style lang="scss">
#banner{
    position: relative;
    width: 7.5rem;
    height:12.40rem;
    background-image: url(~@/assets/prehot/img/img-banner.jpg);
    background-size: 100%;

    .title{
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        top: 9.8rem;
        width: 6.13rem;
        height: 1.52rem;
        background-image: url(~@/assets/prehot/img/img-title_1-1.png);
        background-size: 100%;

        &.ios{
            background-image: url(~@/assets/prehot/img/img-title_1-2.png);
        }
    }


    .music{
        display: block;
        position: absolute;
        top: .22rem;
        right: .30rem;
        width: .8rem;
        height: .8rem;
        background-image: url(~@/assets/prehot/img/icon-muics_2.png);
        background-size: 100% 100%;
        animation: music 3s linear infinite;
        z-index: 4;

        &.off{
            background-image:url(~@/assets/prehot/img/icon-muics_1.png);
            animation:none;
        }
    }

    @keyframes music {
        0%{
            transform: rotate(0);
        }
        100%{
            transform: rotate(360deg);
        }
    }

    .btn-main{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 2.66rem;
        z-index: 4;
        margin: 0 auto;
        width: 3.51rem;
        height: 1.09rem;
        background-image: url(~@/assets/prehot/img/btn-banner_main.png);
    }

    .btn-group,
    .btn-group2{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        line-height: 1;
        z-index: 5;
        font-size: 0;
        text-align: center;
        .btn{
            vertical-align: bottom;
        }
    }
    
    .btn-group{
        .btn{
            width: 2.29rem;
            height: .76rem;
        }
        .btn-schb{
            background-image: url(~@/assets/prehot/img/btn-banner_1-1.png);
        }
        .btn-xszk{
            background-image: url(~@/assets/prehot/img/btn-banner_1-2.png);
        }
        .btn-jrhb{
            background-image: url(~@/assets/prehot/img/btn-banner_1-3.png);
        }
    } 

    .btn-group2{
        .btn{
            width: 2.40rem;
            height: .68rem;
            margin: 0 .15rem;
        }

        .btn-schb{
            background-image: url(~@/assets/prehot/img/btn-banner_2-1.png);
        }
        .btn-jrhb{
            background-image: url(~@/assets/prehot/img/btn-banner_2-2.png);
        }
    } 
}
</style>
