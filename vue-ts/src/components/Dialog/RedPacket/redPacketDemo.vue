<template>
  <k-dialog
    id="sDialogRedPacketDemo"
    class="k-flex"
  >
    <transition
      name="mask-fade"
      mode="out-in"
    >
      <div
        class="win off"
        v-if="!isReceiveRedpacket"
        :class="redpacketAnimat"
      >
        <div
          class="coin"
          :class="animateClass"
        ></div>
      </div>
      <div
        class="win on"
        v-else
      >
        <div
          class="btn-close"
          @click="onClose"
        ></div>
        <h1>现金:{{redpacketNum}}元</h1>
        <p class="win-desc">
         	小乔恭喜主公成功领取红包，<br/>
			请主公努力升级领取全部等级红包吧
        </p>
        <a
          class="btn-show-off btn-recieve"
          @click="onShowoff"
        ></a>
      </div>
    </transition>
  </k-dialog>
</template>
<script>
import mixin from "../mixin.js";
export default {
  mixins: [mixin],
  data() {
    return {
      animateClass: "x-rotate",
      redpacketAnimat: ""
      //   isCanClose: false
    };
  },
  computed: {
    state() {
      return this.$store.state;
    },
    levelMsg() {
      return this.state.levelMsg;
    },
    isReceiveRedpacket() {
      return this.levelMsg.isReceiveRedpacket;
    },
    redpacketNum() {
      return this.levelMsg.redpacketNum;
    }
  },
  async created() {
    if (this.isReceiveRedpacket) {
      return;
    }
    await this.awaitTime(1500);
    this.animateClass = "";
    await this.awaitTime(500);
    this.redpacketAnimat = "redpacket-animat";
    await this.awaitTime(1000);
    this.redpacketAnimat = "";
    this.$emit("open");
    // this.isCanClose = true;
    this.$store.commit("SET_LEVEL_MSG", {
      redpacketNum: 0,
      isReceiveRedpacket: false
    });
  },
  methods: {
    awaitTime(time) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    },
    onShowoff() {
      this.onClose();
      this.log(16024);
      this.$store.commit("OPEN_DIALOG", "Share");
    },
    onClose() {
      //   if (!this.isCanClose) {
      //     return;
      //   }
      this.$store.commit("SET_LEVEL_MSG", {
        redpacketNum: 0,
        isReceiveRedpacket: false
      });
      this.$store.commit("CLOSE_DIALOG", "RedPacketDemo");
      // this.$store.commit("SET_RECEIVE_MSG", {
      //   id: 0,
      //   index: -1
      // });
    }
  }
};
</script>
<style lang="less">
#sDialogRedPacketDemo {
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
    transition: transform 0.3s;
    &:active {
      transform: scale(0.8);
    }
  }
  .on {
    width: 4.5rem;
    height: 5.94rem;
    background-image: url(~src/assets/dialog/bg-redpacket-on.png);
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
      animation: animat-redpack-img 1.5s infinite linear;
    }
  }
  h1 {
    margin-top: 1.87rem;
    font-size: 0.41rem;
    color: #eeca5d;
  }
  .win-desc {
    text-align: left;
    position: absolute;
	font-size: 0.2rem;
	text-align: center;
	width: 100%;
	bottom: 0.97rem;
    color: #f4da3b;
  }
  .btn-show-off {
    position: absolute;
    bottom: -1.24rem;
    left: 50%;
    width: 3.3rem;
    height: 0.97rem;
    background: url(~src/assets/dialog/btn-show-off.png) no-repeat center/100%
      100%;
    transform: translateX(-50%);
    &:active {
      transform: translateX(-50%) scale(0.8);
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
