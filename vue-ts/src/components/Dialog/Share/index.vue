<template>
    <div 
		class="share-wrap" 
		@click="onClose">
        <div class="share-logo"></div>
    </div>
</template>
<script>
import mixin from "../mixin.js";
export default {
    mixins: [mixin],
    computed: {
        state() {
            return this.$store.state;
        },
        toolTip() {
            return this.state.toolTip;
        }
    },
    mounted() {
        this.$store.commit("OPEN_DIALOG", "Tooltip");
    },
    data() {
        return {};
    },
    methods: {
        onClose() {
            //   this.$emit("close");
            this.$store.commit("CLOSE_DIALOG", "Share");
        }
    }
};
</script>
<style lang="less">
.share-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
}
.share-logo {
    position: absolute;
    top: 0.47rem;
    right: 0.74rem;
    width: 3.93rem;
    height: 2.65rem;
    background: url("~src/assets/dialog/share.png") center center/100% 100%
        no-repeat;
    z-index: 9999;
}
</style>
