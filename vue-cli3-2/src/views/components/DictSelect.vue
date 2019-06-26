<template>
  <el-select v-model="selectKey" :placeholder="placeholder" style="width: 100%;" @change="change">
    <el-option v-for="item in zones" :key="item.id" :label="item.label" :value="item.id"/>
  </el-select>
</template>

<script>
import { doGet } from '@/utils/request'
export default {
  name: 'DictSelect',
  props: {
    no: {
      type: String,
      required: true
    },
    initVa: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择类型'
    }
  },
  data() {
    return {
      selectKey: this.value,
      zones: []
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.selectKey = newValue
    }
  },
  created() {
    this.getTree()
  },
  methods: {
    getTree() {
      doGet(`/system/dictInfo/queryDictItem?no=${this.no}&va=${this.initVa}`).then(res => {
        this.zones = res
      })
    },
    change(val) {
      this.$emit('change', val)
    }
  }
}
</script>
