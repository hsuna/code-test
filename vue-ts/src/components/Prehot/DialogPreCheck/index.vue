<template>
    <k-dialog class="k-flex k-flex-v">
		<div id="dialogPreCheck">
            <button @click="close" class="btn btn-close"></button>
            <div class="form">
                <div class="form-group">
                    <input class="form-control" type="text" v-model="phone" placeholder="请填写手机号码" />
                </div>
                <div class="form-group k-flex">
                    <div class="k-flex-item"><input class="form-control" v-model="code" type="number" placeholder="请填写验证码" @input="code=code.slice(0,6)"/></div>
                    <div><button class="btn btn-timer" @click="handlerGetVerifyCode" :disabled="coleTime>0">{{coleTime>0?`${coleTime}s`:'获取验证码'}}</button></div>
                </div>
            </div>
            <div class="btn-group">
                <button class="btn btn-submit" @click="handlerSubmitClick"></button>
            </div>
		</div>
	</k-dialog>
</template>

<script>
import KDialog from 'src/components/Base/Dialog';
export default {
    name: 'dialog-pre-check',
    data() {
        const { coleTimestamp=0 } = this.$store.state
        return {
            dialogData: this.$store.state.dialogPreCheck || {},

            timeout: null,
            coleTime: coleTimestamp>Date.now()?Math.ceil((coleTimestamp-Date.now())/1000):0,

            phone: '',
            code: ''
        }
    },
    created(){
        if(this.coleTime>0){
            this.runTimer()
        }
    },
    computed: {
        state(){
            return this.$store.state
        }
    },
    methods:{
        runTimer(){
            this.clearTimer()
            this.timeout = setInterval(() => {
                this.coleTime--
                if(this.coleTime <= 0){
                    this.clearTimer()
                }
            }, 1000)
        },
        clearTimer(){
            if(this.timeout){
                clearInterval(this.timeout)
                this.timeout = null  
            }
        },
        async handlerGetVerifyCode(){
            if(!this.phone){
                return this.toast('手机号码不能为空')
            }
            if(!/^1[\d]{10}$/.test(this.phone)){
                return this.toast('手机号码有误，请重新填写')
            }
            const error = await this.$store.dispatch('GET_SEND_VERIFY_CODE', {
                phone: this.phone,
            })
            if(error){
                this.toast(error)
			}else{
				this.coleTime = 60
                this.$store.commit('setColeTimestamp', Date.now()+this.coleTime*1000)
                this.runTimer()
              
                this.toast('验证码已发送，请注意查收')
			}
        },
        async handlerSubmitClick(){
            if(!this.phone){
                return this.toast('手机号码不能为空')
            }
            if(!/^1[\d]{10}$/.test(this.phone)){
                return this.toast('手机号码有误，请重新填写')
            }
            if(!this.code){
                return this.toast('验证码不能为空')
            }

            const error = await this.$store.dispatch('GET_SUBMIT_BOOK', {
                phone: this.phone,
                code: this.code
            })
            if(error){
                this.toast(error)
            }else{
                this.close()
                if('function' === typeof this.dialogData.success){
                    this.dialogData.success()
                }
            }
        },
        close() {
            this.$store.commit('closeDialog', 'PreCheck')
        },
    },
    destroyed(){
        this.clearTimer()
    },
    components: {
        KDialog
    }
}
</script>

<style lang="less" scoped>
#dialogPreCheck {
    position: relative;
    width: 5.76rem;
    height: 4.74rem;
    box-sizing: border-box;
	text-align: center;
    background: url('~@/assets/prehot/img/dialogPreCheck/bg.png') no-repeat center/100% 100%;

    .btn-close{
        position: absolute;
        top: -.56rem;
        right: .1rem;
        width: .71rem;
        height: .48rem;
        background-image: url('~@/assets/prehot/img/img-close_1.png');
    }

    .form{
        padding-top: 1.29rem;
        font-size: .24rem;

        .form-group{
            width: 3.0rem;
            margin-bottom: .47rem;
            padding-left: 2.05rem;
        }

        .form-control{
            width: 100%;
            height: .5rem;
            line-height: .5rem;
            background-color: transparent;
        }

        .btn-timer{
            display: block;
            height: .43rem;
            line-height: .43rem;
            padding: 0 .1rem;
            border-radius: .06rem;
            background-color: #ffd71d;
            white-space: nowrap;
            font-size: .22rem;
            color: #fff;

            &[disabled]{
                background-color: #c0c0c0;
            }
        }
    }

    .btn-group{
        position: absolute;
        left: 0;
        right: 0;
        bottom: .84rem;
        text-align: center;
        font-size: 0;

        .btn{
            display: inline-block;
            width: 2.21rem;
            height: .64rem;
            background-size: 100%;
        }
        .btn-submit{
            background-image: url('~@/assets/prehot/img/dialogPreCheck/btn-submit.png');
        }
    }
}
</style>
