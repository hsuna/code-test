<template>
  <div>
    <el-button :disabled="data.id === 1" size="mini" type="success" @click="to">编辑</el-button>
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
      _this.form = {id:this.data.id,accountId: this.data.accountId,custId: this.data.custId,inOut: this.data.inOut,ioType: this.data.ioType,ioTypeName: this.data.ioTypeName,transAmount: this.data.transAmount,incomeAmount: this.data.incomeAmount,expendAmount: this.data.expendAmount,transId: this.data.transId,flowTime: this.data.flowTime,bakTotleAmount: this.data.bakTotleAmount,newTotleAmount: this.data.newTotleAmount,status: this.data.status,isValid: this.data.isValid,nanoTime: this.data.nanoTime,remark: this.data.remark }
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