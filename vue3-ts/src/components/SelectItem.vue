<template>
  <div ref="el" class="select-item">
    <label v-html="label"></label>
    {{state.activeItem}}
    <ul>
        <li v-for="(item,index) in $props.list" :key="item" @click="$emit('change', index)">{{item}}</li>
        <li v-show="$props.list.length<=0" class="empty">暫無角色</li>
    </ul>
  </div>
</template>

<script>
import { Ref, ref, onMounted, onUnmounted, reactive, computed } from "vue";

export default {
  name: "SelectItem",
  props: {
    label: {
      type: String,
      default: "Label"
    },
    list: {
        type: Array,
        default: () => []
    },
    active: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const el = ref(null);
    const state = reactive({
        activeItem: computed(() => props.list[props.active] || 0)
    })
    const handlerWinClick = evt => {
      if (el.value.contains(evt.target)) return;
    };

    onMounted(() => {
      document.addEventListener("click", handlerWinClick);
    });

    onUnmounted(() => {
      document.removeEventListener("click", handlerWinClick);
    });

    return {
      el,
      state,
      handlerWinClick
    };
  }
};
</script>

<style>
.select-item label {
  display: inline-block;
  width: 120px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-weight: bold;
  color: #5e4d35;
  vertical-align: middle;
}
</style>
