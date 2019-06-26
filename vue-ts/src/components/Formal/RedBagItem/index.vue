<template>
  <li
    class="redbag-item k-flex k-flex-justify"
    @click="onReceive"
  >
    <div class="k-flex">
      <div class="icon-level k-flex k-flex-v">
        <div
          class="icon-redbag"
          :class="{canReceive:isCanReceive,got:isGot}"
        ></div>
        <p>最高{{moneyLevel}}元</p>
      </div>
      <div
        v-if="giftIndex"
        class="level-desc"
      >
        角色等级达到<span>{{userLevel}}级</span><br />
        即可领取随机现金红包
      </div>
      <div
        v-else
        class="level-desc"
      >
        体验游戏即可领取随机<br />
        现金红包
      </div>
    </div>
    <a
      class="btn-receive"
      :class="{disable: isDisable,got: isGot}"
    ></a>
  </li>
</template>

<script>
export default {
  props: {
    isCanReceive: {
      type: Boolean,
      default: false
    },
    moneyLevel: {
      type: Number,
      required: true
    },
    userLevel: {
      type: Number,
      default: ""
    },
    isDisable: {
      type: Boolean,
      required: true
    },
    isGot: {
      type: Boolean,
      required: true
    },
    giftId: {
      type: Number,
      required: true
    },
    giftIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    state() {
      return this.$store.state;
    },
    is3kUser() {
      return this.state.roleState.is_3k_user;
    },
    guid() {
      return this.state.roleState.bind_guid;
    },
    roleLevel() {
      return this.state.roleState.role_level;
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
    onReceive() {
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
      if (this.isGot) {
        this.toast("您已领取过红包了");
        return;
      }
      this.setRoleChangeCB();
      if (!this.guid) {
        this.$store.commit("OPEN_DIALOG", "JoinFormUnSign");
        return;
      }
      this.$store.commit("OPEN_DIALOG", "JoinFormSign");
    },
    setRoleChangeCB() {
      this.$store.commit("SET_ROLE_CHANGE_CB_MSG", {
        type: "level",
        id: this.giftId,
		index: this.giftIndex,
		giftLevel: this.userLevel
      });
    }
  }
};
</script>
<style lang="less">
.redbag-item {
  width: 100%;
  height: 1.32rem;
  box-sizing: border-box;
  padding-left: 0.22rem;
  padding-right: 0.33rem;
  background: url("~src/assets/formal/redbag/bg-item.png") no-repeat center/100%;
  & ~ li {
    margin-top: 0.2rem;
  }
  .icon-level {
    width: 1.01rem;
    height: 0.96rem;
    box-sizing: border-box;
    padding-right: 0.06rem;
    padding-bottom: 0.04rem;
    background: url("~src/assets/formal/redbag/bg-redbag-border.png") no-repeat
      center/100%;
    box-pack: end;
    -webkit-box-pack: end;
    .icon-redbag {
      width: 0.42rem;
      height: 0.5rem;
      background: url("~src/assets/formal/redbag/icon-redbag.png") no-repeat
        center/100%;
      &.canReceive {
        animation: shake 1.2s infinite both;
      }
      &.got {
        background: url("~src/assets/formal/redbag/icon-redbag-open.png")
          no-repeat center/100% 100%;
      }
    }
    p {
      font-size: 0.18rem;
      color: #000;
    }
  }
  .btn-receive {
    display: block;
    width: 1.45rem;
    height: 0.53rem;
    background: url("~src/assets/formal/redbag/btn-receive.png") no-repeat
      center/100% 100%;
    transition: transform 0.3s;
    &:active {
      transform: scale(0.8);
    }
    &.got {
      background: url("~src/assets/formal/redbag/btn-receive-got.png") no-repeat
        center/100% 100%;
    }
    &.disable {
      background: url("~src/assets/formal/redbag/btn-receive-disable.png")
        no-repeat center/100% 100%;
    }
  }
  .level-desc {
    font-size: 0.24rem;
    color: #773c0c;
    line-height: 0.28rem;
    margin-left: 0.37rem;
    span {
      font-size: 0.26rem;
      font-weight: bold;
      color: #d56224;
    }
  }
}
@keyframes shake {
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translate3d(-4px, 0, 0);
    transform: translate3d(-4px, 0, 0);
  }
  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translate3d(4px, 0, 0);
    transform: translate3d(4px, 0, 0);
  }
}
</style>
