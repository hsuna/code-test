<template>
    <k-dialog class="k-flex k-flex-v">
		<div id="dialogPreJump">
           	<div class="content">
                页面即将跳转公众号，点击<strong>「3K游戏」</strong>公众号头像关注后，请留意4月4日中奖名单公布结果，大奖也许就属于你哟~
           	</div>
		</div>
	</k-dialog>
</template>

<script>
import FN from "src/js/common/fn";
import KDialog from 'src/components/Base/Dialog';
import { WEIXIN_MP_URL } from 'src/config/prehot'

export default {
    name: 'dialog-pre-check',
    data() {
        return {
            dialogData: this.$store.state.dialogPreJump || {},
        }
    },
    async created(){
        await FN.sleep(2000) //2s后跳转页面
        window.location.href = WEIXIN_MP_URL
    },
    computed: {
        state(){
            return this.$store.state
        }
    },
    methods:{
        close() {
            this.$store.commit('closeDialog', 'PreJump')
        },
    },
    destroyed(){
    },
    components: {
        KDialog
    }
}
</script>

<style lang="less" scoped>
#dialogPreJump {
    position: relative;
    width: 5.77rem;
    height: 2.34rem;
    box-sizing: border-box;
	text-align: center;
    background: url('~@/assets/prehot/img/dialogPreJump/bg.png') no-repeat center/100% 100%;

    .content{
        line-height: .40rem;
        padding: .5rem .56rem 0;
        font-size: .24rem;
        text-align: justify;
        color: #1a1a1a;

        strong{
            font-weight: normal;
            color: #ff4200;
        }
    }
}
</style>
