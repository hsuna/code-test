<template>
  <k-dialog
    class="k-flex"
    id="sDialogJoinFormSign"
  >
    <div class="toolTip k-flex">
      <div
        class="btn-close"
        @click="onClose"
      ></div>
      <div class="step-wrap">
        <p class="br-line">选择区服角色参与活动</p>
      </div>
      <div class="select-join">
        <k-select
          label="区服"
          :z-index="1"
          placeholder="请选择区服"
          :options="serverList"
          @change="onServerSelect"
          :select-index="serverIndex"
          view-key="server_name"
        >
          <template slot-scope="slotProps">
            <p>{{slotProps.item.server_name}}</p>
          </template>
        </k-select>
      </div>
      <div class="select-join">
        <k-select
          label="角色"
          placeholder="请选择角色"
          :options="roleList"
          @change="onRoleSelect"
          :z-index="0"
          :select-index="roleIndex"
          view-key="role_name"
        >
          <template slot-scope="slotProps">
            <p>{{slotProps.item.role_name}}</p>
          </template>
        </k-select>
      </div>
      <transition
        name="mask-fade"
        mode="out-in"
      >
        <div class="btn-group">
          <button
            class="btn-red btn-receive"
            @click="onBack"
          >
          </button>
          <button
            class="btn-yellow btn-receive"
            @click="onComfirm"
          >
          </button>
        </div>
      </transition>
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
    serverList() {
      return this.state.serverList;
    },
    roleList() {
      return (
        this.serverList[this.serverIndex] &&
        this.serverList[this.serverIndex].role_list
      );
    },
    roleChangeCbMsg() {
      return this.state.roleChangeCbMsg;
    },
    is3kUser() {
      return this.state.roleState.is_3k_user;
    }
  },
  data() {
    return {
      serverIndex: 0,
      roleIndex: 0
    };
  },
  methods: {
    async postRole() {
      if (!this.serverList[this.serverIndex]) {
        this.toast("请选择角色");
        return;
      }
      if (!this.serverList[this.serverIndex].role_list) {
        this.toast("请选择角色");
        return;
      }
      if (!this.serverList[this.serverIndex].role_list[this.roleIndex]) {
        this.toast("请选择角色");
        return;
      }
      const roleInfo = this.serverList[this.serverIndex].role_list[
        this.roleIndex
      ];
      const role_id = roleInfo.role_id;
	  const role_level = roleInfo.role_level;
	  if(this.roleChangeCbMsg.type == "level" && !this.is3kUser){
		this.$store.commit("CLOSE_DIALOG", "JoinFormSign");
		this.$store.commit("OPEN_DIALOG", "KUserOnly");
        return;
	  }
      if (this.roleChangeCbMsg.type == "level" && role_level < this.roleChangeCbMsg.giftLevel) {
		this.$store.commit("CLOSE_DIALOG", "JoinFormSign");
		this.$store.commit("OPEN_DIALOG", "NotEnough");
        return;
      }
      if (this.requestRole) {
        return;
      }
      this.requestRole = true;
      const res = await FN.ajax("CHOOSE_ROLE", {
        ct: "hd_cbzj",
        ac: "chooseRole",
        guid: this.state.roleState.bind_guid,
        role_id
      });
      this.requestRole = false;
      if (res.code !== 0) {
        this.toast(res.error);
        return;
      }
      this.$store.commit("SET_ROLE_STATE", {
        role_name: roleInfo.role_name,
        server_name: this.serverList[this.serverIndex].server_name
      });

      if (this.$store.state.roleState.isChangeGuid) {
        let error = await this.$store.dispatch("GOT_PRIZE_DATA", {});
        if (error) {
          this.toast(error);
          return;
        }
      }
      this.$store.commit("CLOSE_DIALOG", "JoinFormSign");

      // 七天礼包回调
      if (this.roleChangeCbMsg.type == "daily") {
        let {code,error} = await this.$store.dispatch("RECV_DAY_PACKET");
        if (error) {
		  if(code == 210503){
			this.toast('今日份礼包已被领完了呦');
		  }else{
			this.toast(error);
		  }
          //   this.$store.commit("RESET_ROLE_CHANGE_CB_MSG");
		}
        return;
      }

      // 等级礼包回调
      if (this.roleChangeCbMsg.type == "level") {
        this.$store.commit("OPEN_DIALOG", "RedPacketDemo");
      }
    },
    onServerSelect({ item, index }) {
      this.serverIndex = index;
      this.roleIndex = 0;
    },
    onRoleSelect({ item, index }) {
      this.roleIndex = index;
    },
    onBack() {
      this.$store.commit("CLOSE_DIALOG", "JoinFormSign");
      this.$store.commit("OPEN_DIALOG", "JoinFormUnSign");
    },
    onComfirm() {
      this.postRole();
    },
    onClose() {
      this.$store.commit("CLOSE_DIALOG", "JoinFormSign");
    }
  }
};
</script>
<style lang="less">
#sDialogJoinFormSign {
  .btn-recieve {
    transition: transform 0.2s;
    &:active {
      transform: scale(0.8);
    }
  }
  .toolTip {
    position: relative;
    width: 6.29rem;
    height: 6rem;
    padding-top: 1.03rem;
    background: url("~src/assets/dialog/bg-join-form-small.png") center
      center/100% 100% no-repeat;
    -webkit-box-orient: vertical;
    text-align: center;
    font-size: 0.26rem;
    line-height: 0.42rem;
    font-family: MicrosoftYaHei;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0rem;
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
    .select-join {
      position: relative;
      width: 5.71rem;
      height: 1.1rem;
      margin-top: 0.19rem;
      background: url("~src/assets/dialog/input.png") center center/100% 100%
        no-repeat;
      .select-item {
        background-color: white;
        border: solid 0.04rem #000000;
        padding: 0.22rem 2.87rem 0.23rem 0.23rem;
      }
    }
    .step-wrap {
      width: 2.5rem;
      margin-top: 0.24rem;
      &::before {
        content: "";
        display: block;
        position: relative;
        top: 0.1rem;
        left: -50%;
        width: 200%;
        height: 0.4px;
        background-color: rgb(179, 179, 179);
        opacity: 0.35;
        z-index: -1;
      }
      .br-line {
        height: 0.2rem;
        margin-top: 0;
        margin-bottom: 0.2rem;
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
    }
  }
  .btn-group {
    width: 5.71rem;
    height: 0.92rem;
    margin-top: 0.28rem;
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-pack: center;
    .btn-yellow {
      width: 2.6rem;
      height: 0.92rem;
      border: none;
      outline: none;
      background: url("~src/assets/dialog/btn-join.png") center center/100% 100%
        no-repeat;
    }
    .btn-red {
      width: 2.6rem;
      height: 0.92rem;
      margin-right: 0.37rem;
      border: none;
      outline: none;
      background: url("~src/assets/dialog/btn-change-id.png") center center/100%
        100% no-repeat;
    }
  }
}
</style>
