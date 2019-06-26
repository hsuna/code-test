<template>
  <k-dialog
    class="k-flex"
    id="sDialogJoinFormUnsign"
  >
    <transition
      name="mask-fade"
      mode="out-in"
    >
      <div class="toolTip k-flex">
        <div
          class="btn-close"
          @click="onClose"
        ></div>
        <div class="input-join">
          <span>绑定ID</span>
          <input
            v-model.lazy.trim="GUID"
            type="text"
            placeholder="请输入绑定ID"
          >
          <button
            class="btn-sub btn-recieve"
            @click="onSubmit"
          ></button>
        </div>
        <div class="step-wrap">
          <p class="br-line">如何查找绑定ID</p>
          <p>
            <strong>第一步:</strong>打开游戏，若未安装游戏，请先安装注册账号
          </p>
          <p>
            <a
              class="btn-yellow btn-recieve"
              :href="downloadUrl"
            ></a>
          </p>
          <p style="text-align: left;">
            <strong>第二步:</strong>找到游戏内设置按钮，一般在游戏功能栏，找
            到复制绑定ID按钮并按下，将复制好的绑定ID填入活动
            界面即可
          </p>
          <p>
            <img
              class="bg-example"
              src="~src/assets/dialog/bind-id-example.gif"
              alt
            >
          </p>
        </div>
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
    downloadUrl() {
      return this.state.downloadUrl;
    },
    roleChangeCbMsg() {
      return this.state.roleChangeCbMsg;
	},
	is_3k_user(){
	  return this.state.roleState.is_3k_user
	}
  },
  data() {
    return {
      GUID: ""
    };
  },
  methods: {
    onClose() {
      this.$store.commit("CLOSE_DIALOG", "JoinFormUnSign");
      this.$store.commit("SET_TOOLTIP", "");
    },
    async onSubmit() {
      if (!this.GUID) {
        this.toast("绑定ID不能为空");
        return;
      }
      if (/[^\da-z]/.test(this.GUID)) {
        this.toast("绑定ID有误，请重新填写绑定ID");
        this.GUID = "";
        return;
      }
      let { code, error } = await this.$store.dispatch("GET_ROLE_LIST", {
        guid: this.GUID
      });
      if (error) {
        this.toast(code == 210200 ? "绑定ID有误，请重新填写绑定ID" : error);
        return;
      }
	  this.$store.commit("CLOSE_DIALOG", "JoinFormUnSign");
	  this.$store.commit("SET_ROLE_STATE", {
        isChangeGuid: true
	  });
	  if(this.roleChangeCbMsg.type == "level" && !this.is_3k_user){
		this.$store.commit("OPEN_DIALOG", "KUserOnly");
        return;
	  }
      this.$store.commit("OPEN_DIALOG", "JoinFormSign");
    }
  }
};
</script>
<style lang="less">
#sDialogJoinFormUnsign {
  .btn-recieve {
    transition: transform 0.2s;
    &:active {
      transform: scale(0.8);
    }
  }
  .toolTip {
	// position: absolute;
	position: relative;
    width: 6.29rem;
    height: 8.5rem;
    // top: 2.72rem;
    // left: 50%;
    padding-top: 1.03rem;
    // transform: translateX(-50%);
    background: url("~src/assets/dialog/bg-join-form.png") center center/100%
      100% no-repeat;
    -webkit-box-orient: vertical;
    text-align: center;
    font-size: 0.26rem;
    line-height: 0.42rem;
    color: #000000;
    box-sizing: border-box;
    -webkit-box-pack: start;
    z-index: -1;
    .btn-close {
      position: absolute;
      top: 0rem;
      right: 0rem;
      width: 0.71rem;
      height: 0.48rem;
      display: block;
      background: url("~src/assets/dialog/btn-close.png") center center/100%
        100% no-repeat;
    }
    .input-join {
      position: relative;
      width: 5.71rem;
      height: 1.1rem;
      background: url("~src/assets/dialog/input.png") center center/100% 100%
        no-repeat;

      & span {
        position: absolute;
        top: 0.35rem;
        left: 0.36rem;
        height: 0.26rem;
        color: #fff;
        font-size: 0.26rem;
        font-weight: 900;
      }
      & input {
        position: absolute;
        width: 2.4rem;
        top: 0.3rem;
        left: 1.52rem;
        height: 0.5rem;
        background-color: transparent;
      }
      input::-webkit-input-placeholder {
        color: #000;
        font-size: 0.2rem;
      }
      .btn-sub {
        position: absolute;
        top: 0.35rem;
        right: 0.51rem;
        width: 1.26rem;
        height: 0.39rem;
        background: url("~src/assets/dialog/btn-sub.png") center center/100%
          100% no-repeat;
        border: none;
        outline: none;
      }
    }
    .step-wrap {
      width: 5.71rem;
      margin-top: 0.24rem;
      &::before {
        content: "";
        display: block;
        position: relative;
        top: 0.1rem;
        width: 100%;
        height: 0.8px;
        background-color: rgb(179, 179, 179);
        opacity: 0.35;
        z-index: -1;
      }
      .br-line {
        width: 2rem;
        height: 0.2rem;
        margin-top: 0;
        margin-bottom: 0.2rem;
        margin-left: auto;
        margin-right: auto;
        font-family: MicrosoftYaHei;
        font-size: 0.2rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.18rem;
        letter-spacing: 0rem;
        background-color: #fff;
      }
      p {
        margin-top: 0.19rem;
        text-align: center;
      }
      .bg-example {
        width: 5.3rem;
        height: 1.93rem;
      }
    }
  }

  .btn-yellow {
    display: block;
    margin: auto;
    width: 3.6rem;
    height: 0.92rem;
    border: none;
    outline: none;
    background: url("~src/assets/dialog/btn-download-large.png") center
      center/100% 100% no-repeat;
  }
  .btn-red {
    width: 2.3rem;
    height: 0.97rem;
    border: none;
    outline: none;
    background: url("~src/assets/dialog/btn-download.png") center center/100%
      100% no-repeat;
  }
}
</style>
