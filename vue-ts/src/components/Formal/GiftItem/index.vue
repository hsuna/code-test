<template>
  <div class="gift-item">
    <p class="receive-date k-flex">
      {{receiveDay}}可领
    </p>
    <div
      :class=giftClass
      @click="onRecv"
    >
      <p>{{giftName}}</p>
    </div>
    <a
      class="btn-receive"
      :class="{got:isGot,disable:isDisable,nextDay:isNextDay,expire:isExpire}"
      @click="onRecv"
    ></a>
  </div>
</template>

<script>
export default {
  props: {
    receiveDay: {
      type: String,
      required: true
    },
    isGot: {
      type: Boolean,
      default: false
    },
    recvIndex: {
      type: Number,
      required: true
    },
    giftIndex: {
      type: Number,
      required: true
    },
    giftName: {
      type: String
    },
    isCanRecv: {
      type: Number,
      required: true
	},
	recvName:{
	  type: String,
      default: "" 
	},
	recvServer:{
	  type: String,
      default: "" 
	}
  },
  data() {
    return {
      cname: ["one", "two", "three", "four", "five", "six", "seven"]
    };
  },
  computed: {
    state() {
      return this.$store.state;
    },
    atvState() {
      return this.state.atvState;
    },
    isBegin() {
      return this.atvState.isBegin;
    },
    isEnd() {
      return this.atvState.isEnd;
    },
    isExpire() {
      if (!this.isBegin) {
        return false;
      }
      if (this.isEnd && !this.isGot) {
        return true;
      }
      return this.giftIndex < this.recvIndex && !this.isGot;
    },
    isNextDay() {
      if (this.recvIndex == -1) {
        return false;
      }
      return this.giftIndex == this.recvIndex + 1;
    },
    isDisable() {
      if (!this.isBegin) {
        return true;
      }
      if (this.isEnd) {
        return false;
      }
      return this.giftIndex > this.recvIndex && !this.isNextDay;
    },
    roleState() {
      return this.state.roleState;
    },
    endMsg() {
      return this.atvState.end_msg;
    },
    giftClass() {
      return `gift-view k-flex k-flex-v ${this.cname[this.giftIndex]}`;
    }
  },
  methods: {
    onRecv() {
      if (!this.isBegin) {
        this.$store.commit("OPEN_DIALOG", "ActivityUnload");
        return;
      }
      if (this.isEnd) {
        this.toast(this.endMsg);
        return;
      }
      if (FN.isIOS) {
        this.$store.commit("OPEN_DIALOG", "IosOffline");
        return;
      }
      if (this.isExpire) {
        this.toast(`该礼包已于${this.receiveDay}领取结束`);
        return;
      }
      if (this.isDisable || this.isNextDay) {
        this.toast(`该礼包将于${this.receiveDay}开放领取`);
        return;
      }
      if (this.isGot) {
		this.toast(`礼包已发放至${this.recvServer}服${this.recvName}角色`);
        return;
      }
      this.$store.commit("SET_ROLE_CHANGE_CB_MSG", {
        type: "daily",
        index: this.giftIndex
      });
      if (!this.roleState.bind_guid) {
        this.$store.commit("OPEN_DIALOG", "JoinFormUnSign");
        return;
      }
      this.$store.commit("OPEN_DIALOG", "JoinFormSign");
    }
  }
};
</script>
<style lang="less">
.gift-item {
  width: 2.3rem;
  .receive-date {
    width: 1.58rem;
    margin: auto;
    height: 0.39rem;
    font-size: 0.22rem;
    background: #502794;
    border-radius: 0.2rem;
    color: #fff;
  }
  .gift-view {
    margin: 0.09rem auto 0;
    width: 2.3rem;
    height: 2.37rem;
    box-sizing: border-box;
    padding-bottom: 0.3rem;
    box-pack: end;
    -webkit-box-pack: end;
    &.one {
      background: url("~src/assets/formal/gift/icon-gift-1.png") no-repeat
        center/100% 100%;
    }
    &.two {
      background: url("~src/assets/formal/gift/icon-gift-2.png") no-repeat
        center/100% 100%;
    }
    &.three {
      background: url("~src/assets/formal/gift/icon-gift-3.png") no-repeat
        center/100% 100%;
    }
    &.four {
      background: url("~src/assets/formal/gift/icon-gift-4.png") no-repeat
        center/100% 100%;
    }
    &.five {
      background: url("~src/assets/formal/gift/icon-gift-5.png") no-repeat
        center/100% 100%;
    }
    &.six {
      background: url("~src/assets/formal/gift/icon-gift-6.png") no-repeat
        center/100% 100%;
    }
    &.seven {
      background: url("~src/assets/formal/gift/icon-gift-7.png") no-repeat
        center/100% 100%;
    }
    p {
      margin-top: 0.18rem;
      font-size: 0.22rem;
      color: #000;
    }
  }
  .btn-receive {
    display: block;
    margin: 0.18rem auto 0;
    width: 2.06rem;
    height: 0.79rem;
    background: url("~src/assets/formal/gift/btn-receive.png") no-repeat
      center/100% 100%;
    transition: transform 0.3s;
    &:active {
      transform: scale(0.8);
    }
    &.got {
      background: url("~src/assets/formal/gift/btn-got.png") no-repeat
        center/100% 100%;
    }
    &.nextDay {
      background: url("~src/assets/formal/gift/btn-nextDay.png") no-repeat
        center/100% 100%;
    }
    &.disable {
      background: url("~src/assets/formal/gift/btn-disable.png") no-repeat
        center/100% 100%;
    }
    &.expire {
      background: url("~src/assets/formal/gift/btn-expire.png") no-repeat
        center/100% 100%;
    }
  }
  & ~ .gift-item {
    margin-left: 0.86rem;
  }
}
</style>
