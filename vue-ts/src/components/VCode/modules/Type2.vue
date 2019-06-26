<template>
    <div class="vcode-type vcode-type-2">
        <div class="vcode-img" ref="vcodeImage" :style="`height: ${canvasHeight}em;`">
            <img :src="url" @load="handlerImageLoad"/>
            <canvas ref="vcodeCanvas" @touchstart="handlerCanvasClick"></canvas>
            <div class="vcode-refresh" @click="$emit('refresh')"></div>
            <div class="vcode-tips" :class="{error: !!errorTimer}">{{error}}</div>
        </div>
        <div class="vcode-control">
            <div class="vcode-tips">请依次点击
                <template v-for="(str, index) in fonts">
                    {{0==index?'':'，'}}<strong :key="str">“{{str}}”</strong>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'k-vcode-type-2',
    props:{
        url: String,
        fonts: {
            type: Array,
            default: () => []
        },
        sumbit: Function,
    },
    data(){
        return {
            lock: false,
            sites: [],
            imageWidth: 0,
            canvasHeight: 150/240*22,

            errorTimer: null,
            error: '',
        }
    },
    mounted(){
        this.$vcodeImage = this.$refs['vcodeImage']
        this.$vcodeCanvas = this.$refs['vcodeCanvas']
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
            this.lock = false;
            this.sites = []
        },
        handlerImageLoad(evt){
            const img = evt.target
            const w = this.$vcodeImage.offsetWidth
            const h = img.height/img.width*w
            this.imageWidth = img.width
            this.$vcodeCanvas.width = w;
            this.$vcodeCanvas.height = h;
            this.canvasHeight = h/w*22

            const ctx = this.$vcodeCanvas.getContext("2d");
            ctx.clearRect(0,0, w, h);
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, w, h);

            this.reset()
        },
        handlerCanvasClick(evt){
            if(this.lock) return;
            const { left, top } = this.$vcodeCanvas.getBoundingClientRect()
            const { pageX, pageY } = evt.touches[0]
            const x = pageX-left
            const y = pageY-top

            const ctx = this.$vcodeCanvas.getContext("2d");
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, 360, false);
            ctx.fillStyle="rgba(0,0,0,0.5)";//填充颜色,默认是黑色
            ctx.fill();//画实心圆

            const rate = this.imageWidth/this.$vcodeCanvas.offsetWidth
            this.sites.push(`${Math.floor(x*rate*1000)/1000},${Math.floor(y*rate*1000)/1000}`)

            if(this.sites.length >= this.fonts.length){
                this.lock = true;
                this.handlerSumbitClick()
            }
        },
        handlerSumbitClick(){
            this.sumbit && this.sumbit(this.sites.join('|'), error => {
                this.showError(error)
            })
        }
    }
}
</script>

<style lang="less" scope>
@import '../styles/_var.less';

.vcode-type-2{
    .vcode-img{
        overflow: hidden;
        position: relative;
        width: 100%;
        border: 1px solid #afafaf;
        min-height: 4em;
        margin-bottom: .8em;

        img{
            position: absolute;
            top: 0;
            left: 100000px;
            opacity: 0;
        }

        canvas{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }

        .vcode-refresh{
            position: absolute;
            top: .4em;
            right: .4em;
            display: inline-block;
            width: 1.6em;
            height: 1.6em;
            background-image: url('../img/icon-refresh.png');
            background-size: contain;
        }

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

    .vcode-control{
        .vcode-tips{
            margin-bottom: .2em;

            strong{
                color: @vcode-color-primary;
            }
        }
    }
}
</style>