<template>
    <k-dialog class="k-flex k-flex-v">
		<div id="dialogPreNumber">
            <button @click="close" class="btn btn-close"></button>
            <div class="number">
                <p>预约编号</p>
                <strong>{{state.book_number}}</strong>
            </div>
			<div class="content">请妥善保管好您的预约编号，4月4日后可在3K游戏服务号自行查询获奖名单，点击下方“前往关注”按钮，跳转至<strong>3K游戏服务号</strong>进行关注</div>
            <div class="btn-group">
                <button class="btn btn-attent" @click="handlerAttentClick"></button>
                <button class="btn btn-flaunt" @click="handlerFlauntClick"></button>
            </div>
		</div>
	</k-dialog>
</template>

<script>
import KDialog from 'src/components/Base/Dialog';
export default {
    name: 'dialog-pre-number',
    data() {
        return {
            dialogData: this.$store.state.dialogPreNumber || {},
        }
    },
    computed: {
        state(){
            return this.$store.state
        }
    },
    methods:{
        handlerAttentClick(){
            this.close()
            this.$store.commit('openDialog', 'PreJump')
        },
        handlerFlauntClick(){
            this.close()
            this.log(16004);
            this.$store.commit('openDialog', 'PreShare')
        },
        close() {
            this.$store.commit('closeDialog', 'PreNumber')
        },
    },
    components: {
        KDialog
    }
}
</script>

<style lang="less" scoped>
#dialogPreNumber {
    position: relative;
    width: 6.31rem;
    height: 4.24rem;
    margin-top: -1.4rem;
    margin-left: -.2rem;
    box-sizing: border-box;
	text-align: center;
    background: url('~@/assets/prehot/img/dialogPreNumbr/bg.png') no-repeat center/100% 100%;
    font-size: .2rem;

    strong{
        font-weight: normal;
        color: #ff4200;
    }

    .btn-close{
        position: absolute;
        top: -.56rem;
        right: .1rem;
        width: .71rem;
        height: .48rem;
        background-image: url('~@/assets/prehot/img/img-close_1.png');
    }
    
    .number{
        height: .80rem;
        margin-left: 2.28rem;
        margin-right: 1.2rem;
        line-height: .40rem;
        padding-top: 1.2rem;
        font-size: .24rem;
        color: #1a1a1a;
    }
    .content{
        width: 4.6rem;
        height: .9rem;
        line-height: 1.6;
        margin-top: .52rem;
        padding-left: 1.08rem;
        text-align: justify;
        font-size: .22rem;
        color: #1a1a1a;
    }
    .btn-group{
        position: absolute;
        left: .4rem;
        right: 0;
        bottom: -2.3rem;
        text-align: center;


        .btn{
            display: inline-block;
           width: 3.88rem;
                height: .82rem;
                margin: .10rem 0;
            background-size: 100%;
        }
        .btn-attent{
            background-image: url('~@/assets/prehot/img/dialogPreNumbr/btn-attent.png');
        }
        .btn-flaunt{
            background-image: url('~@/assets/prehot/img/dialogPreNumbr/btn-flaunt.png');
        }
    }
}
</style>
