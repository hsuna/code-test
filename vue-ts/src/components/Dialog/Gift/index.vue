<template>
    <k-dialog 
		class="k-flex" 
		id="sDialogGiftBox" 
		@click="onClose">
        <div class="toolTip k-flex">
            <div class="gift-warp">
                <div class="gift-box">
                    <img :src="dailyMsg.p_img">
                    <div class="gift-detail">
                        <p class="gift-name">{{dailyMsg.p_name}}</p>
                        <p>{{dailyMsg.p_remark}}</p>
                    </div>
                </div>
                <div class="gift-text">
                    奖励已通过游戏邮件发放至您{{roleState.server_name}}服{{roleState.role_name}}角色，
                    请登陆游戏后注意查收
                </div>
            </div>
        </div>
	  	<transition name="mask-fade" mode="out-in">
			<div class="btn-group">
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
        dailyMsg() {
            return this.state.dailyMsg;
		},
		roleState(){
			return this.state.roleState;
		}
    },
    data() {
        return {};
    },
    methods: {
        onClose() {
            this.$store.commit("SET_DAILT_MSG", {
                p_img: "",
                p_name: "",
                p_remark: ""
            });
            this.$store.commit("CLOSE_DIALOG", "GiftBox");
            this.$store.commit("SET_TOOLTIP", "");
        }
    }
};
</script>
<style lang="less">
#sDialogGiftBox {
    -webkit-box-orient: vertical;
    .btn-recieve {
        transition: transform 0.2s;
        &:active {
            transform: scale(0.8);
        }
    }
    .toolTip {
        width: 6.29rem;
        height: 5.4rem;
        background: url("~src/assets/dialog/bg-get.png") center center/100% 100%
            no-repeat;
        text-align: center;
        font-size: 0.26rem;
        color: #000000;
        box-sizing: border-box;
        span {
            font-size: inherit;
            color: #ff1f1f;
        }
        .gift-warp {
            width: 4.16rem;
            height: 3.81rem;
            .gift-box {
                width: 2.92rem;
                height: 3rem;
                margin: 0.2rem 0.69rem;
                background: url("~src/assets/dialog/gift-box.png") center
                    center/100% 100% no-repeat;
                img {
                    margin: 0.42rem auto 0;
                    width: 1.54rem;
                    height: 1.23rem;
                }
            }
            .gift-detail {
                margin: 0.34rem auto 0;
                width: 2rem;
                height: 1rem;
            }
            .gift-name {
                font-size: 0.2rem;
                font-weight: bold;
                color: #050300;
                & ~ p {
                    margin-top: 0.08rem;
                    font-size: 0.18rem;
                    line-height: 0.24rem;
                }
            }
            .gift-text {
                width: 4.16rem;
                height: 0.54rem;
                font-family: MicrosoftYaHei;
                font-size: 0.22rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 0.32rem;
                letter-spacing: 0rem;
                color: #050300;
            }
        }
    }
    .btn-group {
        margin-top: 0.55rem;
        .btn-yellow {
            width: 3.3rem;
            height: 0.97rem;
            border: none;
            outline: none;
            background: url("~src/assets/dialog/btn-know.png") center
                center/100% 100% no-repeat;
        }
        .btn-red {
            width: 3.3rem;
            height: 0.97rem;
            border: none;
            outline: none;
            background: url("~src/assets/dialog/btn-download.png") center
                center/100% 100% no-repeat;
        }
    }
}
</style>
