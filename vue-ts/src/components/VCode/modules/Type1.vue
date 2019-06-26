<template>
    <div class="vcode-type vcode-type-1">
        <div class="vcode-img" ref="vcodeImage" >
            <img :src="url" @load="handlerImageLoad" />
            <div class="vcode-tips" :class="{error: !!errorTimer}">{{error}}</div>
        </div>
        <div class="vcode-control">
            <div class="vcode-control-top">
                <div class="vcode-text"><input type="text" v-model="code" placeholder="输入以上图片的字符" /></div>
                <div class="vcode-refresh"><a @click="$emit('refresh')">看不清，换一张</a></div>
            </div>
            <div class="vcode-control-bottom">
                <button class="vcode-btn-primary" type="button" @click="handlerSumbitClick">提交</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'k-vcode-type-1',
    props:{
        url: String,
        sumbit: Function,
    },
    data(){
        return {
            lock: false,
            code: '',

            errorTimer: null,
            error: '',
        }
    },
    mounted(){
        this.$vcodeImage = this.$refs['vcodeImage']
    },
    methods: {
        showError(msg){
            this.error = msg
            
            clearTimeout(this.errorTimer)
            this.errorTimer = setTimeout(_ => {
                clearTimeout(this.errorTimer)
                this.errorTimer = null
            }, 2000)
        },
        reset(){
            this.lock = false
            this.code = ''
        },
        handlerImageLoad(evt){
            const img = evt.target
            const w = this.$vcodeImage.offsetWidth
            const h = img.height/img.width*w
            img.width = w-2;
            img.height = h-2;
            this.reset()
        },
        handlerSumbitClick(){
            if(!this.code){
                this.error = '验证码不能为空'
                return 
            }
            this.lock = true
            this.sumbit && this.sumbit(this.code, error => {
                this.showError(error)
            })
        }
    }
}
</script>

<style lang="less" scope>
@import '../styles/_var.less';

.vcode-type-1{
    .vcode-img{
        overflow: hidden;
        position: relative;
        width: 100%;
        border: 1px solid #afafaf;
        margin-bottom: .8em;
        min-height: 4em;

        .vcode-tips{
            position: absolute;
            left: 0;
            right: 0;
            bottom: -2em;
            width: 100%;
            height: 2em;
            padding: .4em .8em;
            box-sizing: border-box;
            transition: bottom .4s;
            background-color: rgba(255, 0, 0, .5);
            color: #fff;

            &.error{
                bottom: 0;
            }
        }
    }

    .vcode-control-top{
        margin-bottom: .8em;

        .vcode-tips{
            margin-bottom: .4em;
            color: #afafaf;
        }
        .vcode-text{
            display: inline-block;
            width: 13em;
            height: 2em;
            line-height: 2em;
            margin-right: 1em;
            border: 1px solid @vcode-color-primary;;

            input{
                width: 100%;
                box-sizing: border-box;
                padding: 0 .4em;
            }
        }
        .vcode-refresh{
            display: inline-block;
            color: @vcode-color-primary;;
            text-decoration: underline;
        }
    }

    .vcode-control-bottom{
        .vcode-btn-primary{
            width: 100%;
            height: 2.4em;
            font-size: 1.2em;
            color: #fff;
            background: @vcode-color-primary;;
            border: none;
            border-radius: .3em;
        }
    }

}
</style>