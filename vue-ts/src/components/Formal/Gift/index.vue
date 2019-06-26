<template>
  <div id="sGift">
    <h2></h2>
    <div class="desc">
      活动时间：4月4日10:00-4月10日23:59<br />
      活动规则：活动期间每位用户每日均可在此页面领取一份首发礼包，礼包共7份，仅限发放当日领取，逾期将不能补领。
    </div>
    <div class="gift-swiper swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide k-flex"
          v-for="(item,index) in dailyPacket"
          :key="item.id"
        >
          <GiftItem
            :receiveDay="formatDate(item.recv_date)"
            :isGot="Boolean(item.is_recv)"
            :recvIndex="recvIndex"
            :giftIndex="Number(index)"
            :giftName="item.p_name"
            :isCanRecv="item.is_can_recv"
			:recvName="item.role_name"
			:recvServer="item.server_name"
          />
        </div>
      </div>
    </div>
    <!-- <i
      v-show="isShowPrev"
      class="icon-nav icon-arrow-left"
    ></i> -->
    <i
      v-show="isShowNext"
      class="icon-nav icon-arrow-right"
    ></i>
  </div>
</template>

<script>
import Swiper from "swiper";
import GiftItem from "src/components/Formal/GiftItem";
export default {
  data() {
    return {
      recvIndex: -1,
    //   isShowPrev: false,
      isShowNext: true
    };
  },
  computed: {
    state() {
      return this.$store.state;
    },
    dailyPacket() {
      return this.state.dailyPacket || [];
    },
    isBegin() {
      return this.state.atvState.isBegin;
    },
    isEnd() {
      return this.state.atvState.isEnd;
    },
    serverTime() {
      return this.state.atvState.server_time;
    }
  },
  updated() {
    this.swiper.update();
  },
  watch: {
    dailyPacket() {
      for (let i = 0; i < this.dailyPacket.length; i++) {
        if (this.dailyPacket[i].is_can_recv) {
          this.recvIndex = i;
          break;
        }
      }
      if (this.recvIndex == -1 && this.isBegin && !this.isEnd) {
        const lastPacket = this.dailyPacket[this.dailyPacket.length - 1];
        const recvTime = str2time(`${lastPacket.recv_date} 23:59:59`);
        if (this.serverTime > recvTime) {
          this.recvIndex = this.dailyPacket.length;
        }
      }
      this.recvIndex && this.swiper.slideTo(this.recvIndex);
    }
  },
  mounted() {
    this.initSwiper();
  },
  methods: {
    rem2px(rem) {
      return (rem * window.innerWidth) / 7.5;
    },
    initSwiper() {
      this.swiper = new Swiper(".gift-swiper", {
        navigation: {
          nextEl: ".icon-arrow-right",
          prevEl: ".icon-arrow-left"
        },
        spaceBetween: this.rem2px(0.5),
        speed: 300 * (window.devicePixelRatio || 0.5),
        slidesPerView: 2,
        on: {
          slideChange: () => {
            let atvIndex = this.swiper.activeIndex;
            // if (atvIndex == 0) {
            //   this.isShowPrev = false;
            // } else {
            //   this.isShowPrev = true;
            // }
            if (atvIndex == 5) {
              this.isShowNext = false;
            } else {
              this.isShowNext = true;
            }
          }
        }
      });
    },
    formatDate(date) {
      var s = date.split("-").slice(1);
      const mouth = +s[0];
      const day = +s[1];
      return `${mouth}月${day}日`;
    }
  },
  components: {
    GiftItem
  }
};
</script>
<style lang="less">
@import "swiper/dist/css/swiper.min.css";

#sGift {
  position: relative;
  top: -0.02rem;
  width: 7.5rem;
  height: 7.32rem;
  box-sizing: border-box;
  padding-top: 0.52rem;
  background: url("~src/assets/formal/gift/bg.jpg") no-repeat center/100% 100%;
  h2 {
    width: 3.07rem;
    height: 0.8rem;
    margin: auto;
    background: url("~src/assets/formal/gift/title.png") no-repeat center/100%;
  }
  .desc {
    width: 5.56rem;
    margin: 0.22rem auto 0;
    font-size: 0.22rem;
    line-height: 1.6;
    color: #fff;
  }
  .gift-swiper {
    margin: 0.4rem auto;
    width: 5.5rem;
  }
  .icon-nav {
    position: absolute;
	bottom: 2rem;
    width: 0.42rem;
    height: 0.82rem;
    transition: transform 0.3s;
    &:active {
      transform: scale(0.8);
    }
    // &.icon-arrow-left {
    //   left: 0.3rem;
    //   background: url("~src/assets/formal/gift/arrow-left.png") no-repeat
    //     center/100%;
    // }
    &.icon-arrow-right {
      right: 0.3rem;
      background: url("~src/assets/formal/gift/arrow-right.png") no-repeat
        center/100%;
    }
  }
}
</style>
