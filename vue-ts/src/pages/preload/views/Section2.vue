<template>
    <div id="section2" class="section">
        <div class="content">
            <h4>活动时间：<strong>{{is_ios?'4月1日10:00-游戏上线':'4月1日10：00-4月3日23：59'}}</strong></h4>
            <p>1.用户完成预约后即可获得幸运编号，4月4日首发当天将会从所有参与玩家中随机抽取出获得华为Mate20的幸运玩家，并将获奖名单公布至3K游戏服务号。</p>
            <p>2.活动期间每5000人参与，即增加一台华为Mate20，上不封顶。</p>
        </div>
        <div class="person"></div>
        <div class="tips">
            已有<strong>{{book_user_num}}</strong>人参与预约   已有<strong>{{unlock_iphone_num}}</strong>台华为Mate20
        </div>
        <div class="btn-group">
            <button v-if="book_number" type="button" class="btn btn-rob2" @click="handlerLookClick"></button>
            <button v-else type="button" class="btn btn-rob" @click="handlerGetClick"></button>
            <!--   <button v-else-if="1" type="button" class="btn btn-rob3" @click="handlerBtnClick">
                <div class="number">
                    <div data-num="C"></div>
                    <div data-num="X"></div>
                    <div data-num="0"></div>
                    <div data-num="0"></div>
                    <div data-num="2"></div>
                    <div data-num="3"></div>
                    <div data-num="9"></div>
                </div>
            </button> -->
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const PreloadStore = namespace('Preload')

@Component
export default class Section2 extends Vue {
    @PreloadStore.State is_ios
    @PreloadStore.State book_user_num
    @PreloadStore.State unlock_iphone_num
    @PreloadStore.State book_number
    @PreloadStore.Mutation openDialog

    openDialogSuccess(type:string, data:any={}): Promise<any>{
        return new Promise(success => {
            this.openDialog({ type, data: { ...data, success } })
        })
    }
    handlerGetClick(){
        //this.log(16003);
        this.openDialogSuccess('PreCheck')
        .then(res => {
            return this.openDialogSuccess('PreSuccee', { type: 1 })
        })
        .then(res => {
            this.handlerLookClick()
        })
    }
    handlerLookClick(){
        this.openDialog('PreNumber')
    }
}
</script>

<style lang="scss" scoped>
.section{
    position: relative;
    width: 7.5rem;
    height:8.48rem;
    background-image: url(~@/assets/prehot/img/img-bg_2.jpg);
    background-size: 100%;

    strong{
        font-weight: normal;
        color: #ff4200;
    }

    .content{
        position: relative;
        padding: 1.86rem 1rem 0;
        color: #1a1a1a;

        h4{
            font-size: .22rem;
            font-weight: normal;
            line-height: 1.6;
        }
        
        p{
            width: 3.4rem;
            font-size: .22rem;
            line-height: 1.8;
            text-align: justify;
        }
    }
    .person{
        position: absolute;
        top: 5.14rem;
        left: 0;
        z-index: 2;
        width: 2.70rem;
        height: 2.80rem;
        background: url(~@/assets/prehot/img/img-person_2.png) center/100%;
    }
    .tips{   
        position: absolute;
        top: 5.84rem;
        left: 1.9rem;
        right: .9rem;
        text-align: center;
        font-size: .22rem;
    }

    .btn-group{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 1.05rem;
        text-align: center;
        font-size: 0;

        .btn{
            width: 2.72rem;
            height: .83rem;
        }
        .btn-rob{
            background-image: url(~@/assets/prehot/img/btn-rob.png);
        }
        .btn-rob2{
            background-image: url(~@/assets/prehot/img/btn-rob_2.png);
        }/* 
        .btn-rob3{
            width: 3.72rem;
            background-image: url(~@/assets/prehot/img/btn-rob_3.png);

            .number{
                padding-top: .05rem;
                padding-left: 1.75rem;
                text-align: left;
                font-size: 0;
            }

            [data-num]{
                display: inline-block;
                height: .3rem;
                background: url(~@/assets/prehot/img/img-number_1.png) no-repeat;
                background-size: 4.8rem .6rem;
            }
            [data-num="0"]{ width: .25rem; background-position: 0 0; }
            [data-num="1"]{ width: .16rem; background-position: -0.25rem 0; }
            [data-num="2"]{ width: .25rem; background-position: -0.41rem 0; }
            [data-num="3"]{ width: .23rem; background-position: -0.67rem 0; }
            [data-num="4"]{ width: .26rem; background-position: -0.90rem 0; }
            [data-num="5"]{ width: .25rem; background-position: -1.16rem 0; }
            [data-num="6"]{ width: .25rem; background-position: -1.41rem 0; }
            [data-num="7"]{ width: .25rem; background-position: -1.66rem 0; }
            [data-num="8"]{ width: .25rem; background-position: -1.91rem 0; }
            [data-num="9"]{ width: .25rem; background-position: -2.16rem 0; }
            [data-num="A"]{ width: .32rem; background-position: -2.41rem 0; }
            [data-num="B"]{ width: .25rem; background-position: -2.73rem 0; }
            [data-num="C"]{ width: .25rem; background-position: -2.98rem 0; }
            [data-num="D"]{ width: .28rem; background-position: -3.24rem 0; }
            [data-num="E"]{ width: .26rem; background-position: -3.52rem 0; }
            [data-num="F"]{ width: .24rem; background-position: -3.78rem 0; }
            [data-num="G"]{ width: .28rem; background-position: -4.02rem 0; }
            [data-num="H"]{ width: .28rem; background-position: -4.30rem 0; }
            [data-num="I"]{ width: .18rem; background-position: -4.58rem 0; }
            [data-num="J"]{ width: .13rem; background-position: 0 -.30rem; }
            [data-num="K"]{ width: .29rem; background-position: -0.13rem -.30rem; }
            [data-num="L"]{ width: .20rem; background-position: -0.42rem -.30rem; }
            [data-num="M"]{ width: .41rem; background-position: -0.62rem -.30rem; }
            [data-num="N"]{ width: .29rem; background-position: -1.03rem -.30rem; }
            [data-num="O"]{ width: .28rem; background-position: -1.32rem -.30rem; }
            [data-num="P"]{ width: .25rem; background-position: -1.60rem -.30rem; }
            [data-num="Q"]{ width: .28rem; background-position: -1.85rem -.30rem; }
            [data-num="R"]{ width: .28rem; background-position: -2.13rem -.30rem; }
            [data-num="S"]{ width: .26rem; background-position: -2.41rem -.30rem; }
            [data-num="T"]{ width: .27rem; background-position: -2.67rem -.30rem; }
            [data-num="U"]{ width: .28rem; background-position: -2.94rem -.30rem; }
            [data-num="V"]{ width: .30rem; background-position: -3.22rem -.30rem; }
            [data-num="W"]{ width: .41rem; background-position: -3.52rem -.30rem; }
            [data-num="X"]{ width: .29rem; background-position: -3.93rem -.30rem; }
            [data-num="Y"]{ width: .30rem; background-position: -4.24rem -.30rem; }
            [data-num="Z"]{ width: .26rem; background-position: -4.54rem -.30rem; }
        } */
    }
}

</style>
