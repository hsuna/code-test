<template>
  <div id="sDiscount">
    <p class="discount-date">
      活动时间: 4月4日10:00-5月4日23:59
    </p>
    <p class="discount-desc">
      活动期间每个用户在「平台充值系统」
      首笔充值可享8折，其余95折，首发超
      值专享折扣，不可错过~
    </p>
    <a
      @click="onPayClick"
      class="btn-toPay"
    ></a>
  </div>
</template>

<script>
export default {
  computed: {
    state() {
      return this.$store.state;
    },
    roleState() {
      return this.state.roleState;
    },
    payLink() {
      if (ENV == "production") {
        return "//pay.3k.com/rechargeLogin.html?gameid=22";
      }
      return "//ptpaytest.3kwan.com/rechargeLogin.html?gameid=22";
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
    endMsg() {
      return this.atvState.end_msg;
    }
  },
  methods: {
    onPayClick() {
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
      this.log(16025);
      const guid = this.roleState.bind_guid;
      const is3kUser = this.roleState.is_3k_user;
      if (guid) {
        if (!is3kUser) {
          this.$store.commit("OPEN_DIALOG", "KUserOnly");
          return;
		}
        location.href = `${this.payLink}&guid=${guid}`;
        return;
	  }
      location.href = this.payLink;
    }
  }
};
</script>
<style lang="less">
#sDiscount {
  position: relative;
  top: -0.02rem;
  width: 7.5rem;
  height: 7.52rem;
  background: url("~src/assets/formal/discount/bg.jpg") no-repeat center/100%
    100%;
  p {
    width: 3.3rem;
    position: absolute;
    font-size: 0.2rem;
    color: #000;
	right: 0.77rem;
	text-align: justify;
  }
  .discount-date {
    top: 2.5rem;
  }
  .discount-desc {
    top: 3.06rem;
  }
  .btn-toPay {
    position: absolute;
    bottom: 0.42rem;
    left: 2.45rem;
    width: 2.57rem;
    height: 0.96rem;
    background: url("~src/assets/formal/discount/btn-toPay.png") no-repeat
      center/100%;
    transition: transform 0.3s;
    &:active {
      transform: scale(0.85);
    }
  }
}
</style>
