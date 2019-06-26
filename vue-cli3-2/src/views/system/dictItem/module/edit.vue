<template>
  <div>
    <el-button :disabled="data.id === 1" size="mini" type="success" @click="to">修改</el-button>
    <eForm ref="form" :sup_this="sup_this" :dict-info-id="dictInfoId" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './form'
export default {
  components: { eForm },
  props: {
    data: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    },
    dictInfoId: {
      type: String,
      default: null
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.form = { id: this.data.id, dictInfoId: this.data.dictInfoId, dictKey: this.data.dictKey, dictValue: this.data.dictValue, remark: this.data.remark }
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>
