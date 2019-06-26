<template>
    <div id="section3" class="section">
        <div class="swiper-container" ref="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="n in 5" :key="n"><!-- @click="handlerSlideClick(n)" -->
                    <img :src="require(`@/assets/prehot/img/slide/${n}.jpg`)" width="100%" height="auto">
                </div>
            </div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script lang="ts">
import "swiper/dist/css/swiper.css";
import Swiper from "swiper";

import { Component, Watch, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const PreloadStore = namespace('Preload')

@Component
export default class Section3 extends Vue {
    @PreloadStore.Mutation openDialog

    private swiper!: Swiper
    private video!: HTMLVideoElement

    handlerSlideClick(index){
        //if(index-1 != this.swiper.realIndex) return;
        if(0 === index){
            this.video && this.video.play()
        }else{
            this.openDialog({
                type: 'ImgPreview', 
                data: {
                    previewPath: require(`@/assets/prehot/img/slide/${index+1}.jpg`)
                }
            })
        }
    }
    mounted(){
        this.swiper = new Swiper(this.$refs.swiper, {    
            loop: true,
            effect: "coverflow",
		    slidesPerView: 'auto',
			centeredSlides: true,
			coverflowEffect: {
				rotate: 0,
				stretch: 2.4*window.innerWidth/7.50,
				depth: 100,
				slideShadows: false,
            }, 
            navigation: {
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next'
            },
            on:{
                click: evt => {
                    this.handlerSlideClick(this.swiper.realIndex)
                },
            },
        })
        this.video = document.getElementById('video') as HTMLVideoElement
    }
    destroyed(){
        if(this.swiper){
            this.swiper.destroy()
            this.swiper = null
        }
    }
}
</script>

<style lang="scss" scoped>
.section{
    position: relative;
    width: 7.5rem;
    height: 8.81rem;
    background-image: url(~@/assets/prehot/img/img-bg_3.jpg);
    background-size: 100%;

    .swiper-container{
        width: 4.84rem;
        height: 6.02rem;
        padding-top: 1.54rem;
        margin: 0 auto;
        perspective: 1200px;

        *{
            perspective: none;
        }

        .swiper-wrapper{
            margin-left: -.04rem;
        }

        .swiper-slide{
            position: relative;
            width: 3.38rem;
            height: 6.02rem;

            /* &:after{
                content: '';
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 2;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, .5);
            }

            &.swiper-slide-active:after{
                display: none;
            } */
        }

        .video-wrap{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 9;
            opacity: 0;

            &.play{
                position: fixed;
                z-index: 99999;
                opacity: 1;
            }
        }

    }

    .swiper-button-prev,
    .swiper-button-next {
        position: absolute;
        top: 4.8rem;
        width: .34rem;
        height: .41rem;
        background: url(~@/assets/prehot/img/img-swiper-arrow.png) no-repeat center/100% 100%;
    }
    .swiper-button-prev{
        left: .8rem;
    }
    .swiper-button-next {
        right: .8rem;
        transform: scaleX(-1);
    }
}
</style>
