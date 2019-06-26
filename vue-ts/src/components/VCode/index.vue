<template>
    <div :class="['vcode', className]" v-if="isShow" :style="`font-size: ${fontSize}`">
        <div class="vcode-wrap">
            <div v-if="canClose" class="vcode-close" @click="close"></div>
            <type-1 v-if="1 === type" :url="url" :sumbit="handlerSumbit" @refresh="handlerRefresh" /><!-- 英文数字验证码 -->
            <type-2 v-else-if="2 === type" :url="url" :fonts="fonts" :sumbit="handlerSumbit" @refresh="handlerRefresh"/><!-- 图片文字点击验证码 -->
            <type-3 v-else-if="3 === type" :url="url" :sumbit="handlerSumbit" @refresh="handlerRefresh"/><!-- 滑块验证码 -->
        </div>
    </div>
</template>

<script>
import Type1 from "./modules/Type1"
import Type2 from "./modules/Type2"
import Type3 from "./modules/Type3"

export default {
    name: 'k-vcode',
    props: {
        className:{
            type: String, 
            default: ''
        },
        canClose: {
            type: Boolean,
            default: true
        },
        defaultType: {
            type: Number,
            default: 0
        },
        fontSize: {
            type: String,
            default: '0.24rem'
        },
        refresh: Function,
    },
    data(){
        return {
            payload: {},
            isShow: false,
            type: 0,
            url: '',
            fonts: [],
            sumbit: () => {}
        }
    },
    created(){
    },
    methods: {
        open(sumbit=()=>{}){
            this.sumbit = sumbit
            this.isShow =  true
            this.type = this.defaultType || Math.floor(Math.random()*3)+1
            this.handlerRefresh();
        },
        close(bool=true){
            this.isShow =  false
            bool && this.$emit('close')
        },
        async handlerRefresh(){
            if(this.refresh){
                const data = await this.refresh(this.type)
                const { image, fonts } = data || {}
                this.url = image
                this.fonts = fonts
            }
        },
        async handlerSumbit(code, callback){
            if(this.sumbit){
                const error = await this.sumbit(code) || {}
                if(error){
                    callback(error)
                    this.handlerRefresh();
                }else{
                    this.isShow = false
                }
            }
        }
    },
    components: {
        Type1,
        Type2,
        Type3
    }
}
</script>

<style lang="less" scope>
.vcode{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
    background-color: rgba(0, 0, 0, .5);
    
    @width: 24em;
    @height: 20em;
    .vcode-wrap{
        position: absolute;
        top: 50%;
        left: 50%;
        width: @width;
        box-sizing: border-box;
        padding: 1em;
        margin-left: -@width/2;
        z-index: 2;
        border-radius: 1em;
        background-color: #fff;
        transform: translateY(-50%)
    }

    .vcode-close{
        position: absolute;
        right: .2em;
        top: -2.4em;
        z-index: 2;
        display: block;
        width: 2em;
        height: 2em;
        background-image: url('./img/icon-close.png');
        background-size: 100%;
    }
}
</style>


