<template>
  <div class="k-rect ui3k-flex">
    <label>{{label}}</label>
    <div class="k-rec-bd ui3k-flex-item">
      <slot/>
    </div>
    <div class="k-rect-ft">
      <slot name="ft"/>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="less">
.k-rect {
  .ui3k-flex > * {
    display: block;
  }
  .ui3k-flex-item {
    padding: 0 0.1rem;
    color: #fff;
  }
  label {
    position: absolute;
    top: 0.35rem;
    left: 0.4rem;
    height: 0.26rem;
    color: #fff;
    font-size: 0.26rem;
    font-weight: 900;
    letter-spacing: 0.1rem;
  }
  .k-rect-ft {
    padding-top: 0.17rem;
    padding-bottom: 0.16rem;
    padding-right: 0.19rem;
  }
  .k-rec-bd {
    height: 100%;
  }
}
</style>

