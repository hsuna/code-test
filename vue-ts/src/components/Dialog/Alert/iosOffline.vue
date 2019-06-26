<template>
    <k-dialog 
		class="k-flex" 
		id="sDialogIosOffline" 
		@click="onClose">
        <div class="toolTip k-flex" 
			v-html="toolTip">
		</div>
		<transition name="mask-fade" mode="out-in">
			<div class="btn-group">
				<a 
					class="btn-red btn-recieve" 
					:href="link">
				</a>
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
      return `抱歉，潮爆战纪IOS版暂未上线，本次活动仅限安卓玩家参与。您可提前预约IOS版游戏参与预约活动，感谢您对潮爆战纪的关注`;
    },
    link() {  
      return location.protocol + "//" + location.host + "/cbzj/prehot.html";
    }
  },
  data() {
    return {};
  },
  methods: {
    onClose() {
      //   this.$emit("close");
      this.$store.commit("CLOSE_DIALOG", "IosOffline");
      this.$store.commit("SET_TOOLTIP", "");
    }
  }
};
</script>
<style lang="less">
#sDialogIosOffline {
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
    font-size: 0.26rem;
    line-height: 0.42rem;
    color: #000;
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
      left: 0.6rem;
      background: url(~src/assets/dialog/guide.png) no-repeat center/100%;
      transform: scale(1.2);
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
      background: url("~src/assets/dialog/btn-subscribe.png") center center/100%
        100% no-repeat;
    }
  }
}
</style>
