<template>
  <div>
    <button class="btn" @click="store.state.dialogWrap.visible = true">点击</button>
    <dialog-wrap v-if="store.state.dialogWrap.visible"></dialog-wrap>
  </div>
</template>

<script>
import DialogWrap from "./components/DialogWrap.vue";

import { inject } from "vue";

export default {
  components: {
    DialogWrap
  },
  setup() {
    const store = inject("store");

    return {
      store
    }
  }
}
</script>

<style>
html,
body {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
body {
  background-color: #fff;
}
*{
  margin: 0;
  padding: 0;
}
</style>