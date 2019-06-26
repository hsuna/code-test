<template>
  <section id="sRedBag">
    <h2></h2>
    <div class="desc">
      活动时间：4月4日10:00-5月4日23:59<br />
      活动规则：活动期间您的游戏角色只要满足以下条件即可领取对应红包奖励
    </div>
    <div class="level-view k-flex k-flex-left">
      <i class="bg-star"></i>
      <div
        class="level-flag"
        :style="flagStyle"
      >
        <!-- {{currentLevel}} -->
      </div>
      <div class="level-line">
        <div
          class="inner"
          ref="innerLine"
          :style="lineStyle"
        ></div>
      </div>
    </div>
    <ul class="redbag-list">
      <reg-bag-item
        v-for="(item,index) in levelPacket"
        :key="index"
        :giftId="item.id"
        :giftIndex="index"
        :isCanReceive="!item.is_recv && Boolean(item.is_can_recv)"
        :isDisable="!item.is_recv && !item.is_can_recv"
        :isGot="Boolean(item.is_recv)"
        :moneyLevel="moneyLevel[index]"
        :userLevel="item.level"
      />
    </ul>
  </section>
</template>
<script>
import RegBagItem from "src/components/Formal/RedBagItem";

export default {
  data() {
    return {};
  },
  computed: {
    state() {
      return this.$store.state;
    },
    currentLevel() {
      return this.state.roleState.role_level || 0;
    },
    levelPacket() {
      return this.state.levelPacket || [];
    },
    levels() {
      return this.levelPacket.map(item => item.level);
    },
    levelsOffset() {
      let t = [];
      this.levels.map((item, index) => {
        if (this.levels[index + 1]) {
          t.push(this.levels[index + 1] - item);
        }
      });
      return t;
    },
    levelWidth() {
      if (this.currentLevel <= this.levels[0]) {
		return 0;
      }
      if (this.currentLevel >= this.levels[this.levels.length - 1]) {
        return 4.5;
      }
      let width = 0;
      for (let i = 1; i < this.levels.length; i++) {
        if (this.currentLevel >= this.levels[i]) {
          width += 1.5;
        } else {
          var widthRet =
            ((this.currentLevel - this.levels[i - 1]) /
              this.levelsOffset[i - 1]) *
            1.5;
          width += widthRet;
          break;
        }
      }
      return width;
    },
    lineStyle() {
      return {
        transform: `scaleX(${(this.levelWidth / 4.5).toFixed(2)})`,
        webkitTransform: `scaleX(${(this.levelWidth / 4.5).toFixed(2)})`
      };
    },
    flagStyle() {
      return {
        transform: `translateX(${this.levelWidth.toFixed(2)}rem)`,
        webkitTransform: `translateX(${this.levelWidth.toFixed(2)}rem)`
      };
    },
    moneyLevel() {
      return [15, 30, 60, 150];
    }
  },
  mounted() {},
  components: {
    RegBagItem
  }
};
</script>
<style lang="less">
#sRedBag {
  position: relative;
  top: -0.02rem;
  width: 7.5rem;
  height: 10.84rem;
  box-sizing: border-box;
  padding-top: 0.68rem;
  background: url("~src/assets/formal/redbag/bg.jpg") no-repeat center/100%;
  h2 {
    width: 2.96rem;
    height: 0.86rem;
    margin: auto;
    background: url("~src/assets/formal/redbag/title.png") no-repeat center/100%;
  }
  .desc {
    width: 5.62rem;
    margin: 0.22rem auto 0;
    font-size: 0.22rem;
    line-height: 1.6;
    color: #fff;
  }
  .level-view {
    position: relative;
    margin: 0.5rem auto 0;
    width: 6.89rem;
    height: 0.46rem;
    background: url("~src/assets/formal/redbag/bg-level.png") no-repeat
      center/100% 100%;
  }
  .level-line {
    position: relative;
    margin-left: 1.76rem;
    width: 4.5rem;
    height: 0.1rem;
    border-radius: 0.08rem;
    background: #fff;
    overflow: hidden;
    border: solid 2px #000;
    .inner {
      width: 100%;
      height: 100%;
      transform-origin: left;
      transition: transform 1s ease-in;
      background: #ff800f;
    }
  }
  .level-flag {
    position: absolute;
    left: 1.66rem;
    bottom: 0.36rem;
    // font-size: 0.23rem;
    // font-weight: bold;
    // color: #fff;
    // text-align: center;
    // text-shadow: 0 1px #000, 1px 0 #000, -1px 0 #000, 0 -1px #000;
    transition: transform 1s ease-in;
    &::after {
      content: "";
      display: block;
      width: 0.32rem;
      height: 0.17rem;
      background: url("~src/assets/formal/redbag/icon-arrow.png") no-repeat
        center/100%;
    }
  }
  .bg-star {
    position: absolute;
    z-index: 10;
    top: 0.02rem;
    right: 0.4rem;
    width: 4.85rem;
    height: 0.35rem;
    background: url("~src/assets/formal/redbag/bg-star.png") no-repeat
      center/100%;
  }
  .redbag-list {
    margin: 0.48rem auto 0;
    width: 6.85rem;
  }
}
</style>

