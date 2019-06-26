<template>
    <k-dialog class="k-flex k-flex-v">
		<div id="dialogPreRedbag" :class="dialogData.animat?'play-animat':'skip-animat'">
            <div class="animat-wrap"><div class="img"></div></div>
            <div class="panel-wrap">
                <button @click="close" class="btn btn-close"></button>
                <template v-if="3 == state.p_type">
                    <div class="title">恭喜获得K钻</div>
                    <div class="img"><img :src="state.p_img" width="100%" height="100%"/></div>
                    <div class="name">{{state.kz_num}}K钻</div>
                    <div class="tips">K钻已发放社区账户<br/>请注意查看</div>
                </template>
                <template v-else-if="2 == state.p_type">
                    <div class="title">恭喜获得预约礼包</div>
                    <div class="name2">礼包码：{{state.code}}</div>
                    <a id="redbagCopy" class="copy" :data-clipboard-text="state.code">复制</a>
                    <div class="tips">预约礼包码已发送至您的预约手机</div>
                </template>
                <template v-else-if="7 == state.p_type"> 
                    <div class="title">恭喜获得现金红包</div>    
                    <div class="number">现金：{{state.red_num}}元</div>
                    <div class="tips">红包已发放至微信账户<br>请进入微信查收</div>
                </template>
                <div class="content">{{
                    state.is_ios
                    ?'各位主公，点击下方按钮“炫耀一下”分享喜悦吧~'
                    :'各位主公，领取到奖励的同时也不要忘记预约还有机会抽取华为P20 pro哦！点击下方查看预约编号了解活动。'
                    }}</div>
                <div class="btn-group">
                    <button class="btn btn-share" @click="handlerShareClick"></button>
                    <button class="btn btn-look" @click="handlerLookClick" v-if="!state.is_ios"></button>
                </div>
            </div>
		</div>
	</k-dialog>
</template>

<script>
import FN from "src/js/common/fn";
import KDialog from '@/components/Base/Dialog/index.vue';
/* import scrollToTarget from "src/js/common/scroll2Target.js"; */

export default {
    name: 'dialog-pre-redbag',
    data() {
        return {
            dialogData: this.$store.state.dialogPreRedbag || {}
        }
    },
    computed: {
        state(){
            return this.$store.state
        }
    },
    mounted(){
        /* this.clipboard = new Clipboard("#redbagCopy");
		this.clipboard.on("success", e => {
			this.toast("复制成功");
			e.clearSelection();
		});
		this.clipboard.on("error", e => {
			this.toast("复制失败");
        }); */
    },
    destroyed(){
        if(this.clipboard){
            this.clipboard.destroy()
            this.clipboard = null
        }
    },
    methods:{
        async handlerLookClick(){
            this.close()
            await FN.sleep(100)
            scrollToTarget(document.getElementById('section2'), document.getElementById("page"));
        },
        handlerShareClick(){
            this.close()
            this.log(16004);
            this.$store.commit('openDialog', 'PreShare')
        },
        close() {
            this.$store.commit('closeDialog', 'PreRedbag')
        },
    },
    components: {
        KDialog
    }
}
</script>

<style lang="scss" scoped>
#dialogPreRedbag {
    position: relative;
    box-sizing: border-box;

    &.play-animat{
        .animat-wrap{
            display: block;
            opacity: 0;
            animation: animat-redpack 2.0s linear;
            .img{
                transform: scaleX(0);
                animation: animat-redpack-img 2.0s linear;
            }
        }
        .panel-wrap{
            animation: animat-award 2.0s linear;
            transform: scale(1);
        }

        @keyframes animat-redpack {
            0% {opacity: 1;}
            96% {opacity: 1;}
            100% {opacity: 0;}
        }
        @keyframes animat-redpack-img {
            0% {transform: scaleX(1);}
            10% {transform: scaleX(0);}
            20% {transform: scaleX(1);}
            30% {transform: scaleX(0);}
            40% {transform: scaleX(1);}
            50% {transform: scaleX(0);}
            60% {transform: scaleX(1);}
            70% {transform: scaleX(0);}
            80% {transform: scaleX(1);}
            90% {transform: scaleX(0);}
            100% {transform: scaleX(1);}
        }
        @keyframes animat-award{
            0% {transform: scale(0);}
            96% {transform: scale(0);}
            100% {transform: scale(1);}
        }
    }
    &.skip-animat{
        .panel-wrap{
            transform: none;
        }
    }

    .animat-wrap{
        display: none;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -2.25rem;
        margin-top: -2.61rem;
        width: 4.49rem;
        height: 5.22rem;
        background-image: url('~@/assets/prehot/img/dialogPreRedbag/back.jpg');
        background-size: 100%;
        z-index: 8;

        .img{
            position: absolute;
            left: 1.58rem;
            top: 1.36rem;
            width: 1.34rem;
            height: 1.34rem;
            background-image: url('~@/assets/prehot/img/dialogPreRedbag/icon-gold.png');
            background-size: 100%;
        }
    }

    .panel-wrap{
        position: relative;
        width: 5.63rem;
        height: 6.75rem;
        margin-top: -2.0rem;
        text-align: center;
        background: url('~@/assets/prehot/img/dialogPreRedbag/bg.png') no-repeat center/100% 100%;
        font-size: .2rem;
        transform: scale(0);
        z-index: 9;

        .btn-close{
            position: absolute;
            top: 0;
            right: 0;
            width: .71rem;
            height: .48rem;
            background-image: url('~@/assets/prehot/img/img-close_1.png');
        }
        
        .title{
            margin-left: .22rem;
            line-height: 1.6;
            padding-top: 1.6rem;
            font-size: .30rem;
            font-weight: bold;
            color: #c7371b;
        }
        .img{
            width: .88rem;
            height: .88rem;
            margin: 0 auto;
        }
        .name,
        .name2,
        .copy{
            line-height: 1.6;
            font-size: .24rem;
            color: #a68837;
        }
        .name2{
            margin-top: .8em;
            line-height: 2;
        }
        .number{
            margin-top: .4em;
            line-height: 2;
            font-size: .38rem;
            font-weight: bold;
            color: #a68837;
        }
        .copy{
            text-decoration: underline;
        }
        .tips{
            position: absolute;
            bottom: .3rem;
            left: 0;
            right: 0;
            line-height: 1.8;
            font-size: .20rem;
            color: #ff9b88;
        }
        .content{
            position: absolute;
            left: .6rem;
            right: .4rem;
            bottom: 1.15rem;
            line-height: 1.8;
            text-align: justify;
            font-size: .24rem;
            color: #ff9b88;
        }
        .btn-group{
            position: absolute;
            left: .2rem;
            right: 0;
            top: 6.9rem;
            text-align: center;

            .btn{
                display: inline-block;
                width: 3.88rem;
                height: .82rem;
                margin: .10rem 0;
                background-size: 100%;
            }
            .btn-look{
                background-image: url('~@/assets/prehot/img/dialogPreRedbag/btn-look.png');
            }
            .btn-share{
                background-image: url('~@/assets/prehot/img/dialogPreRedbag/btn-share.png');
            }
        }
    }
}
</style>
