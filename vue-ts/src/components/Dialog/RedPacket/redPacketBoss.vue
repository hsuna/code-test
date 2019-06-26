<template>
  <k-dialog id="redPacketBoss" class="k-flex" @click="onClose">
    <transition name="mask-fade" mode="out-in">
       <div v-if="state.callState.isRecvCallRedpkt&&state.isRecvSucc"  class="wrap">
      <div class="win on" >
        <div class="btn-close" @click="onClose"></div>
        <h1>现金:{{state.callRedpacketMess.red_num || state.callState.callRedpktNum}}元</h1>
       
      </div>
       <div class="btn-group" >
          <button class="btn-red btn-recieve" @click="goCreateRole"></button>
          <button class="btn-yellow btn-recieve" @click="share"></button>
        </div>
      </div>
      <div class="win off" v-else :class="redpacketAnimat">
        <div class="coin" :class="animateClass"></div>
      </div>
     
    </transition>
  </k-dialog>
</template>
<script>
import mixin from "../mixin.js";
import scroll2Target from "src/js/common/scroll2Target.js";

export default {
  mixins: [mixin],
  data() {
    return {
      animateClass: "x-rotate",
      redpacketAnimat: "",
      isCanCloseDialog:false
    };
  },

  async created() {
    if (this.state.callState.isRecvCallRedpkt) {
     
      this.isCanCloseDialog=true;
      return;
    }
    await this.awaitTime(2000);
    this.animateClass = "";
    await this.awaitTime(500);
    this.redpacketAnimat = "redpacket-animat";
    await this.awaitTime(1000);
    this.redpacketAnimat = "";
    this.isCanCloseDialog=true;
    this.$emit('open')
  },
  mounted() {
    this.scrollRoot = document.getElementById("pHome");
  },
  methods: {
    awaitTime(time) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    },
    share() {
      this.log(16023)
      this.onClose();
      this.$store.commit("OPEN_DIALOG", "Share");
    },
    goCreateRole() {
	  this.onClose();
	  let timer = setTimeout(() => {
		clearTimeout(timer);
		let target = document.getElementById(`sRedBag`);
        scroll2Target(target, this.scrollRoot);
	  }, 550);
    },
    onClose() {
      if(this.isCanCloseDialog){
      this.$store.commit("CLOSE_DIALOG", "RedPacketBoss");}
    }
  }
};
</script>
<style lang="less">
#redPacketBoss {
  .wrap{position: relative;
  height: 8.32rem;}
  .btn-recieve {
    transition: transform 0.2s;
    &:active {
      transform: scale(0.8);
    }
  }
  .win {
    position: relative;
    width: 4rem;
    height: 5rem;
    text-align: center;
    background: url(~src/assets/dialog/bg-redpacket.png) no-repeat center/100%
      100%;
  }
  .redpacket-animat {
    animation: rote-l-r 0.3s infinite linear;
  }
  .btn-close {
    position: absolute;
    top: -0.3rem;
    right: 0rem;
    width: 0.71rem;
    height: 0.48rem;
    display: block;
    background: url("~src/assets/dialog/btn-close.png") center center/100% 100%
      no-repeat;
  }
  .on {
    width: 4.5rem;
    height: 5.94rem;
    background-image: url(~src/assets/dialog/bg-redpacket-on-1.png);
    &::before {
      content: " ";
      position: absolute;
      width: 1.55rem;
      height: 2.31rem;
      top: 0.81rem;
      right: 3.25rem;
      background: url(~src/assets/dialog/guide.png) no-repeat center/100%;
      display: block;
    }
  }
  .coin {
    position: absolute;
    left: 1.3rem;
    top: 1.4rem;
    width: 1.42rem;
    height: 1.42rem;
    background: url(~src/assets/dialog/icon-coin.png) no-repeat center/100% 100%;
    &.x-rotate {
      transform: scaleX(0);
      animation: animat-redpack-img 1.5s infinite linear;
    }
  }
  h1 {
    padding-top: 1.87rem;
    font-size: 0.41rem;
    color: #eeca5d;
  }
  .btn-group {
    // margin-top: 4rem;
    margin-left: 0.55rem;
    .btn-yellow {
      width: 3.3rem;
      height: 0.97rem;
      display: block;
      border: none;
      outline: none;
      background: url("~src/assets/dialog/btn-show-off.png") center center/100%
        100% no-repeat;
    }
    .btn-red {
      width: 3.3rem;
      height: 0.97rem;
      margin-top: 0.1rem;
      display: block;
      border: none;
      outline: none;
      background: url("~src/assets/dialog/btn-redpacket-demo.png") center
        center/100% 100% no-repeat;
    }
  }

  @keyframes rote-l-r {
    //震动
    0% {
      transform: rotateZ(0);
    }
    25% {
      transform: rotateZ(10deg);
    }
    50% {
      transform: rotateZ(0);
    }
    75% {
      transform: rotateZ(-10deg);
    }
    100% {
      transform: rotateZ(0deg);
    }
  }
  @keyframes animat-redpack-img {
    //转动
    0% {
      transform: scaleX(1);
    }
    10% {
      transform: scaleX(0);
    }
    20% {
      transform: scaleX(1);
    }
    30% {
      transform: scaleX(0);
    }
    40% {
      transform: scaleX(1);
    }
    50% {
      transform: scaleX(0);
    }
    60% {
      transform: scaleX(1);
    }
    70% {
      transform: scaleX(0);
    }
    80% {
      transform: scaleX(1);
    }
    90% {
      transform: scaleX(0);
    }
    100% {
      transform: scaleX(1);
    }
  }
}
</style>
