<template>
    <k-dialog class="k-flex k-flex-v">
        <div class="img-wrap" @click="close">
            <div class="img" :style="`background-image:url('${dialogData.previewPath}');`"></div>
        </div>
   </k-dialog>
</template>

<script>
import KDialog from 'src/components/Base/Dialog';
export default {
    name: 'dialog-img-preview',
    data() {
        return {
            dialogData: this.$store.state.dialogImgPreview || {}
        }
    },
    computed: {
        state(){
            return this.$store.state
        }
    },
    methods:{
        close() {
            this.$store.commit('closeDialog', 'ImgPreview')
        },
    },
    components: {
        KDialog
    }
}
</script>

<style lang="less" scoped>
.img-wrap{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    padding: .6rem;
    box-sizing: border-box;

    .img{
        width: 100%;
        height: 100%;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }
}
 </style>
 
 