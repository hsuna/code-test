<template>
    <k-dialog class="k-flex k-flex-v">
		<div id="dialogPreSuccee" @click="close">
            <!-- <button @click="close" class="btn btn-close"></button> -->
            <div class="title">恭喜您预约成功</div>
			<div class="content">游戏首发当日，我们会通过您的预留信息以短信或微信通知的方式提示您参与首发活动；</div>
            <div class="tips">请点击下方按钮领取您的预约{{0 == dialogData.type?'奖励':'编号'}}</div>
            <div class="btn-group">
                <button :class="['btn', 0 == dialogData.type?'btn-get':'btn-look']" @click="handlerGetClick"></button>
            </div>
		</div>
	</k-dialog>
</template>

<script>
import KDialog from 'src/components/Base/Dialog';
export default {
    name: 'dialog-pre-succee',
    data() {
        return {
            dialogData: this.$store.state.dialogPreSuccee || {}
        }
    },
    computed: {
        state(){
            return this.$store.state
        }
    },
    methods:{
        handlerGetClick(){
            this.close()
            if('function' === typeof this.dialogData.success){
                this.dialogData.success()
            }
        },
        close() {
            this.$store.commit('closeDialog', 'PreSuccee')
        },
    },
    components: {
        KDialog
    }
}
</script>

<style lang="less" scoped>
#dialogPreSuccee {
    position: relative;
    width: 5.77rem;
    height: 4.44rem;
    margin-top: -.8rem;
    box-sizing: border-box;
	text-align: center;
    background: url('~@/assets/prehot/img/dialogPreSuccee/bg.png') no-repeat center/100% 100%;
    font-size: .24rem;

    /* .btn-close{
        position: absolute;
        top: -.56rem;
        right: .1rem;
        width: .71rem;
        height: .48rem;
        background-image: url('~@/assets/prehot/img/img-close_1.png');
    } */
    
    .title{
        line-height: .8rem;
        padding-top: .9rem;
        color: #ff4200;
    }
    .content{
        line-height: 1.8;
        padding: 0 .4rem;
        color: #1a1a1a;
    }
    .tips{
        line-height: .8rem;
        color: #ff4200;
    }
    .btn-group{
        margin-top: 1.4rem;
        text-align: center;

        .btn{
            display: inline-block;
            width: 3.07rem;
            height: .88rem;
            background-size: 100%;
        }
        .btn-get{
            background-image: url('~@/assets/prehot/img/dialogPreSuccee/btn-get.png');
        }
        .btn-look{
            background-image: url('~@/assets/prehot/img/dialogPreSuccee/btn-look.png');
        }
    }
}
</style>
