<template>
  <k-rect :label="label">
    <div class="k-select">
      <div
        class="k-select-val ui3k-flex"
        @click="isShowOptions=!isShowOptions"
      >
        <span
          v-if="!val"
          class="ui3k-flex-item placeholder"
        >{{placeholder}}</span>
        <span
          v-else
          class="ui3k-flex-item placeholder"
        >{{val}}</span>
        <i
          class="icon-arrow-d"
          :class="arrowClass"
        ></i>
      </div>
      <transition name="select-fade">
        <ul
          v-show="isShowOptions"
          :style="{zIndex:zIndex}"
        >
          <li
            v-for="(item,index) in options"
            :key="index"
            @click="click(item,index)"
          >
            <slot
              :item="item"
              :index="index"
            ></slot>
          </li>
        </ul>
      </transition>
    </div>
  </k-rect>
</template>
<script>
  import KRect from "./rect.vue";
  export default {
    props: {
      label: {
        type: String,
        default: ""
      },
      options: {
        type: Array,
        default: () => []
      },
      placeholder: {
        type: String,
        default: ""
      },

      zIndex: {
        type: Number,
        default: 99
      },
      viewKey: {
        type: String,
        default: ""
      },
      selectIndex: {
        type: Number,
        default: NaN
      }
    },
    data() {
      return {
        isShowOptions: false
      };
    },
    computed: {
      arrowClass() {
        return {
          "icon-arrwo-d_atv": this.isShowOptions
        };
      },
      val() {
        if (this.options[this.selectIndex]) {
          return this.options[this.selectIndex][this.viewKey] || "";
        }
        return "";
      }
    },
    components: {
      KRect
    },
    methods: {
      click(item, index) {
        this.isShowOptions = false;
        this.$emit("change", { ...item, index });
      }
    },
    mounted() {}
  };
</script>
<style lang="less">
  .k-select {
    position: relative;
    width: 5.71rem;
    height: 1.1rem;
    .k-select-val {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding-left: 0.1rem;
    }
    .icon-arrow-d {
      position: absolute;
      top: 0.46rem;
      right: 0.59rem;
      width: 0.34rem;
      height: 0.19rem;
      transition: all 0.5s;
      background: url(~src/assets/dialog/icon-arrow-d.png) no-repeat center/100%
        100%;
    }
    .icon-arrwo-d_atv {
      transform: rotate(180deg);
    }

    .ui3k-flex-item.placeholder {
      position: absolute;
      height: 0.2rem;
      margin: 0.42rem 1.52rem;
      font-size: 0.2rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 0.28rem;
      letter-spacing: 0rem;
      color: #000000;
    }
    .ui3k-flex-item.val {
      color: #dfd1ae;
    }
    ul {
      position: absolute;
      top: 96%;
      left: 1.3rem;
      width: 4rem;
      border: 0.05rem solid #000;
      max-height: 3rem;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      z-index: 1;
    }

    li {
      height: 0.8rem;
      line-height: 0.71rem;
      padding-left: 0.2rem;
      background: #ffffff;
      border-top: 0.02rem solid #000;
      padding-left: 0.19rem;
      text-align: left;
      font-size: 0.24rem;
      color: #000000;
    }
    li:active {
      box-shadow: 0 0 0.4rem #dfd1ae inset;
    }

    .select-fade-enter-active {
      transition: all 0.3s ease;
    }
    .select-fade-leave-active {
      transition: all 0.3s ease;
    }
    .select-fade-enter,
    .select-fade-leave-to {
      height: 0;
      opacity: 0;
    }
  }
</style>

