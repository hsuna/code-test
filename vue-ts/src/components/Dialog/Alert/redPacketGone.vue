<template>
    <k-dialog class="k-flex" 
		id="sDialogRedPacketGone" 
		@click="onClose">
        <div class="toolTip k-flex" 
			v-html="toolTip">
		</div>
		<transition name="mask-fade" mode="out-in">
			<div class="btn-group">
				<button 
					class="btn-yellow btn-recieve" 
					@click="onClose">
				</button>
			</div>
		</transition>
    </k-dialog>
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
            return "你来晚了，该档位红包已被领完了呦，快去看看其他精彩活动吧";
        }
    },
    data() {
        return {};
    },
    methods: {
        onClose() {
            //   this.$emit("close");
            this.$store.commit("CLOSE_DIALOG", "RedPacketGone");
            this.$store.commit("SET_TOOLTIP", "");
        }
    }
};
</script>
<style lang="less">
#sDialogRedPacketGone {
    -webkit-box-orient: vertical;
    .btn-recieve {
        transition: transform 0.2s;
        &:active {
            transform: scale(0.8);
        }
    }
    .toolTip {
        width: 6.35rem;
        height: auto;
        padding: 0.55rem 0.5rem 0.55rem 1.4rem;
        background: url("~src/assets/dialog/toolTip.png") center center/100%
            100% no-repeat;
        text-align: center;
        font-size: 0.26rem;
        line-height: 0.42rem;
        font-family: MicrosoftYaHei;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: #000000;
        box-sizing: border-box;
        span {
            font-size: inherit;
            color: #ff1f1f;
        }
        &::before {
            content: " ";
            position: absolute;
            width: 1.55rem;
            height: 2.31rem;
            top: 50%;
            left: 0.25rem;
            background: url(~src/assets/dialog/guide.png) no-repeat center/100%;
            transform: scale(1.2) translateY(-80%);
            display: block;
        }
    }
    .btn-group {
        margin-top: 0.55rem;
        .btn-yellow {
            width: 3.3rem;
            height: 0.97rem;
            border: none;
            outline: none;
            background: url("~src/assets/dialog/btn-know.png") center
                center/100% 100% no-repeat;
        }
        .btn-red {
            width: 3.3rem;
            height: 0.97rem;
            border: none;
            outline: none;
            background: url("~src/assets/dialog/btn-download.png") center
                center/100% 100% no-repeat;
        }
    }
}
</style>
