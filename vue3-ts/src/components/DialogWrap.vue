<template>
  <dialog-base class="dialog-wrap">
    <button class="btn btn-close" type="button" @click="close">关闭</button>
    <div class="select-group">
      <select-item
        :label="'XXXXXX'"
        :list="state.serverList"
        :active="state.serverIndex"
        @change="handlerServerChange"
      ></select-item>
      <select-item
        :label="'YYYYYY'"
        :list="state.roleList"
        :active="state.roleIndex"
        @change="handlerRoleChange"
      ></select-item>
    </div>
  </dialog-base>
</template>

<script>
import DialogBase from "./DialogBase.vue";
import SelectItem from "./SelectItem.vue";

import { reactive, inject, computed, onMounted } from "vue";

export default {
  name: "dialogWrap",
  components: {
    DialogBase,
    SelectItem
  },
  setup() {
    const store = inject("store");
    const state = reactive({
      dialogWrap: computed(() => store.state.dialogWrap),
      server: [
        [1, 2],
        [3, 4]
      ],
      serverList: computed(() => state.server || []),
      roleList: computed(() => state.server[state.serverIndex] || [])
    });

    const handlerRoleChange = index => {
      state.roleIndex = index;
    };
    const handlerServerChange = index => {
      state.serverIndex = index;
      handlerRoleChange(0);
    };

    onMounted(() => {
      if (state.server.length > 0) {
        handlerServerChange(0);
      }
    });

    return {
      state,
      handlerServerChange,
      handlerRoleChange,
      close() {
        state.dialogWrap.visible = false;
      }
    };
  }
};
</script>

<style>
.dialog-wrap {
  width: 400px;
  height: 400px;
  background-color: #0f0;
}
.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  width: 32px;
  height: 32px;
  background-color: #f00;
}
.select-group {
  position: absolute;
  left: 100px;
  top: 100px;
}
</style>
