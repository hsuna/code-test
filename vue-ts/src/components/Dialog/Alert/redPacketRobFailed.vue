<template>
  <k-dialog class="k-flex" id="sDialogRedPacketRobFailed" @click="onClose">
    <div class="toolTip k-flex" v-html="toolTip"></div>
    <transition name="mask-fade" mode="out-in">
      <div class="btn-group">
        <button class="btn-red btn-recieve" @click="goCreateRole"></button>
        <button class="btn-yellow btn-recieve" @click="onClose"></button>
      </div>
    </transition>
  </k-dialog>
</template>
<script>
import mixin from "../mixin.js";
import scroll2Target from "src/js/common/scroll2Target.js";
export default {
  mixins: [mixin],
  computed: {
    state() {
      return this.$store.state;
    },
    toolTip() {
      return "哎呀，你的红包被小乔偷走啦主公不要灰心，点击下方按钮，体验游戏即可领体验红包快去看看吧~";
    }
  },
  data() {
    return {};
  },
  mounted(){
      this.scrollRoot = document.getElementById("pHome");
  },
  methods: {
    onClose() {
      this.$store.commit("CLOSE_DIALOG", "RedPacketRobFailed");
      this.$store.commit("SET_TOOLTIP", "");
    },
    goCreateRole() {
      this.onClose();
      let timer = setTimeout(() => {
        clearTimeout(timer);
        let target = document.getElementById(`sRedBag`);
        scroll2Target(target, this.scrollRoot);
      }, 550);
    }
  }
};
</script>
<style lang="less">
#sDialogRedPacketRobFailed {
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
    background: url("~src/assets/dialog/toolTip.png") center center/100% 100%
      no-repeat;
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
      margin-top: 0.1rem;
      display: block;
      border: none;
      outline: none;
      background: url("~src/assets/dialog/btn-know.png") center center/100% 100%
        no-repeat;
    }
    .btn-red {
      width: 3.3rem;
      height: 0.97rem;
      display: block;
      border: none;
      outline: none;
      background: url("~src/assets/dialog/btn-redpacket-demo.png") center
        center/100% 100% no-repeat;
    }
  }
}
</style>
