<template>
    <div id="section1" class="section">
        <div class="title">
            <h4>活动时间：<strong>{{is_ios?'4月1日10:00-游戏上线':'4月1日10：00-4月3日23：59'}}</strong></h4>
            <p>活动期间只要完成预约即可获得一次抽奖机会，抽奖有机会获得随机现金红包、游戏礼包、K钻等，最高可得<strong>888</strong>元现金红包。</p>
        </div>
        <div class="content">
            <img src="~@/assets/prehot/img/img-person_1.jpg" @click="handlerImageClick"/>
        </div>
        <div class="btn-group">
            <button v-if="1 != is_book" type="button" class="btn btn-crazy" @click="handlerCrazyClick" title="拼手气"></button>
            <button v-else-if="1 != is_recv" type="button" class="btn btn-crazy2" @click="handlerGetClick" title="领取奖励"></button>
            <button v-else type="button" class="btn btn-crazy3" @click="handlerLookClick" title="查看奖励"></button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const PreloadStore = namespace('Preload')

@Component
export default class Section1 extends Vue {
    @PreloadStore.State is_ios;
    @PreloadStore.State is_book;
    @PreloadStore.State is_recv;
    @PreloadStore.Mutation openDialog
    @PreloadStore.Action('GET_BOOK_PRIZE_RECV') getBookPrizeRecv

    openDialogSuccess(type:string, data:any={}): Promise<any>{
        return new Promise(success => {
            this.openDialog({ type, data: { ...data, success } })
        })
    }
    handlerImageClick(){
        if(1 != this.is_book){
            this.handlerCrazyClick()
        }else if(1 != this.is_recv){
            this.handlerGetClick()
        }else{
            this.handlerLookClick()
        }
    }
    handlerCrazyClick(){
       // this.log(16003);
        this.openDialogSuccess('PreCheck')
        .then(res => {
            return this.openDialogSuccess('PreSuccee', { type: 0 })
        })
        .then(res => {
            this.handlerGetClick()
        })
    }
    async handlerGetClick(){
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
    }
    handlerLookClick(){
        this.openDialog('PreRedbag')
    }
}
</script>

<style lang="scss" scoped>
.section{
    position: relative;
    width: 7.5rem;
    height:9.21rem;
    background-image: url(~@/assets/prehot/img/img-bg_1.jpg);
    background-size: 100%;

    .title{
        height: 1.5rem;
        padding: 1.6rem 1.2rem .2rem .86rem;
        text-align: justify;
        color: #1a1a1a;
       
        h4{
            margin-bottom: .16rem;
            font-size: .24rem;
        }

        strong{
            font-weight: normal;
            color: #ff4200;
        }
    }

    .content{
        text-align: center;
        img{
            width: 2.94rem;
            height: 3.55rem;
        }
        .tips{
            margin-top: .14rem;
            text-align: center;
            font-size: .18rem;
            color: #a68837;
        }
    }

    .btn-group{
        position: absolute;
        left: 0;
        right: 0;
        bottom: .94rem;
        text-align: center;
        font-size: 0;

        .btn{
            width: 2.72rem;
            height: .83rem;
        }
        .btn-crazy{
            background-image: url(~@/assets/prehot/img/btn-crazy.png);
        }
        .btn-crazy2{
            background-image: url(~@/assets/prehot/img/btn-crazy_2.png);
        }
        .btn-crazy3{
            background-image: url(~@/assets/prehot/img/btn-crazy_3.png);
        }
    }
}
</style>
