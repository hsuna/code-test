<template>
  <div>
    <el-button :disabled="data.id === 1" size="mini" type="success" @click="to">流水</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
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
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.form = { id: this.data.id, custId: this.data.custId, totleAmount: this.data.totleAmount, frozenAmount: this.data.frozenAmount, balanceAmount: this.data.balanceAmount, status: this.data.status, remark: this.data.remark, errorTime: this.data.errorTime, errorMsg: this.data.errorMsg }
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
