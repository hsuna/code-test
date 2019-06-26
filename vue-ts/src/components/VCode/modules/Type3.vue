<template>
    <div class="vcode-type vcode-type-3">
        <div ref="vcodeCanvas" class="vcode-canvas" :style="`height: ${canvasHeight}em;`">
            <img :src="url" @load="handlerImageLoad"/>
            <canvas ref="canvasBg"></canvas>
            <canvas ref="canvasSlice"></canvas>
            <!-- <canvas ref="canvasFullbg" class="canvas-fullbg"></canvas> -->
            <div class="vcode-refresh" @click="$emit('refresh')"></div>
        <div class="vcode-tips" :class="{error: !!errorTimer}">{{error}}</div>
        </div>
        <div class="vcode-control">
            <span class="vcode-title">向右拖动滑块填充拼图</span>
            <div ref="sliceMask" class="vcode-slice-mask"></div>
            <div ref="sliceBtn" :class="['vcode-control-slider', moveData&&'active']" 
                @touchstart="handlerSliderStart"
                @touchmove="handlerSliderMove"
                @touchend="handlerSliderEnd"
                @touchcancel="handlerSliderEnd"
            ><i></i></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'k-vcode-type-3',
    props:{
        url: String,
        sumbit: Function,
    },
    data(){
        return {
            lock: false,
            moveData: null,
            maxMoveX: 0,
            imageWidth: 0,
            canvasHeight: 150/240*22,

            errorTimer: null,
            error: '',
        }
    },
    mounted(){
        this.$vcodeCanvas = this.$refs['vcodeCanvas']
        this.$canvasSlice = this.$refs['canvasSlice']
        this.$sliceBtn = this.$refs['sliceBtn']
        this.$sliceMask = this.$refs['sliceMask']

		this.maxMoveX = this.$vcodeCanvas.width
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
            this.$sliceBtn.style.left = 0
            this.$canvasSlice.style.left = 0
            this.$sliceMask.style.width = 0
        },
        drawImage(name, img, x, y, w, h){
            const canvas = this.$refs[name]
            canvas.width = w;
            canvas.height = h;
            if(canvas){
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0,0, canvas.width, canvas.height);
                ctx.drawImage(img, x, y, w, h, 0, 0, canvas.width, canvas.height);
            }
        },
        handlerImageLoad(evt){
            const img = evt.target
            const w = img.width;
            const h = img.height/3;
            this.imageWidth = img.width
            this.drawImage('canvasBg', img, 0, 0, w, h)
            this.drawImage('canvasSlice', img, 0, h, w, h)
            /* this.drawImage('canvasFullbg', img, 0, h*2, w, h) */
            this.canvasHeight = h/w*22

            this.reset()
        },
        handlerSliderStart(evt){
            if(this.lock) return
            this.moveData = { 
                offX: evt.touches[0].pageX,
                offVal: 0
            }
            this.maxMoveX = this.$canvasSlice.offsetWidth - this.$sliceBtn.offsetWidth
        },
        handlerSliderMove(evt){
            if(!this.moveData) return;
			evt.preventDefault();
            let value = evt.touches[0].pageX - this.moveData.offX
            if(value < 0) value = 0
            else if(value > this.maxMoveX) value = this.maxMoveX
            this.moveData.offVal = value
            const valuePx = `${value}px`
            this.$sliceBtn.style.left = valuePx
            this.$canvasSlice.style.left = valuePx
            this.$sliceMask.style.width = valuePx
        },
        handlerSliderEnd(evt){
            if(!this.moveData) return;
            const value = this.moveData.offVal*this.imageWidth/this.$vcodeCanvas.offsetWidth
            this.moveData = null
            if(value < 1) return;

            this.lock = true
            this.sumbit && this.sumbit(Math.floor(value*1000)/1000, error => {
                this.showError(error)
            })
        }
    },
    destroyed(){

    }
}
</script>

<style lang="less" scope>
@import '../styles/_var.less';

.vcode-type-3{
    .vcode-canvas{
        overflow: hidden;
        position: relative;
        width: 100%;
        height: 150/240*22em;

        img{
            position: absolute;
            top: 0;
            left: 100000px;
            opacity: 0;
        }

        canvas{
            position: absolute;
            top: 0;
            left: 0;
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
        margin-top: .8em;
        position: relative;
        border: 1px solid #e4e7eb;
        background-color: #f7f9fa;
        height: 2.8em;
        line-height: 2.8em;
        border-radius: .2em;
        text-align: center;

        .vcode-slice-mask{
            position: absolute;
            left: 0;
            top: 0;
            width: 0;
            height: 2.8em;
            border-top-left-radius: .2em;
            border-bottom-left-radius: .2em;
            background-color: @vcode-color-primary;
        }

        .vcode-control-slider{
            position: absolute;
            top: -1px;
            left: -1px;
            width: 2.8em;
            height: 2.8em;
            line-height: 2.8em;
            text-align: center;
            background-color: #fff;
            border: 1px solid #e1e1e1;
            border-radius: .2em;

            i{
                display: inline-block;
                width: 1.4em;
                height: 1.0em;
                vertical-align: middle;
                background-image: url('../img/icon-arrow.png');
                background-size: 100%;
            }

            &.active{
                background-color: @vcode-color-primary;

                i{
                    background-image: url('../img/icon-arrow-active.png');
                }
            }
        }
    }
}
</style>