<template>
    <k-dialog class="k-flex k-flex-v">
		<div id="dialogPreShare" @click="close">
            <div class="share-logo"></div>
		</div>
	</k-dialog>
</template>

<script>
import KDialog from 'src/components/Base/Dialog';
export default {
    name: 'dialog-pre-share',
    data() {
        return {
            dialogData: this.$store.state.dialogPreShare || {}
        }
    },
    computed: {
        state(){
            return this.$store.state
        }
    },
    methods:{
        close() {
            this.$store.commit('closeDialog', 'PreShare')
        },
    },
    components: {
        KDialog
    }
}
</script>

<style lang="less" scoped>
#dialogPreShare {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;

    .share-logo {
        position: absolute;
        top: .47rem;
        right: .74rem;
        width: 3.85rem;
        height: 2.77rem;
        background: url("~@/assets/prehot/img/dialogPreShare/share.png") center center/100% 100% no-repeat;
        z-index: 9999;
    }
}
</style>
