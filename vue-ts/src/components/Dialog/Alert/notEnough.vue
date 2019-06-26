<template>
    <k-dialog class="k-flex" id="sDialogNotEnough" @click="onClose">
        <div class="toolTip k-flex" v-html="toolTip"></div>
        <div class="btn-group">
            <button class="btn-yellow btn-recieve" @click="onClose"></button>
            <button class="btn-red btn-recieve" @click="onChangeRole"></button>
        </div>
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
        roleChangeCbMsg() {
            return this.state.roleChangeCbMsg;
        },
        toolTip() {
            return this.roleChangeCbMsg.index
                ? "抱歉，您的角色等级尚不能领取目前档位的红包，请进入游戏继续努力吧。Tip: 小乔偷偷告诉你，完成每日任务能迅速提升等级呢"
                : "主公，您的角色游戏体验时长太短啦，小乔偷偷告诉您呦：体验游戏不同的特色玩法，完成游戏日常任务，征战游戏BOSS关卡，会加速获得体验红包喔，快些回到游戏参与体验吧~";
        }
    },
    data() {
        return {};
    },
    methods: {
        onClose() {
            //   this.$emit("close");
            this.$store.commit("CLOSE_DIALOG", "NotEnough");
            this.$store.commit("SET_TOOLTIP", "");
        },
        onChangeRole() {
            this.$store.commit("CLOSE_DIALOG", "NotEnough");
            this.$store.commit("OPEN_DIALOG", "JoinFormSign");
        }
    }
};
</script>
<style lang="less">
#sDialogNotEnough {
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
        padding: 0.55rem 0.35rem 0.55rem 1.8rem;
        background: url("~src/assets/dialog/toolTip.png") center center/100%
            100% no-repeat;
        text-align: justify;
        font-size: 0.26rem;
        line-height: 0.42rem;
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
            left: 0.25rem;
            background: url(~src/assets/dialog/guide.png) no-repeat center/100%;
            transform: scale(1.2) translateX(20%);
            display: block;
        }
    }
    .btn-group {
        margin-top: 0.55rem;
        .btn-yellow {
            width: 3.3rem;
            height: 0.97rem;
            display: block;
            border: none;
            outline: none;
            background: url("~src/assets/dialog/btn-know-primary.png") center
                center/100% 100% no-repeat;
        }
        .btn-red {
            width: 3.3rem;
            height: 0.97rem;
            margin-top: 0.1rem;
            display: block;
            border: none;
            outline: none;
            background: url("~src/assets/dialog/btn-changeRole-yellow.png")
                center center/100% 100% no-repeat;
        }
    }
}
</style>
