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
      _this.form = {id:this.data.id,accountId: this.data.accountId,custId: this.data.custId,frozenId: this.data.frozenId,inOut: this.data.inOut,type: this.data.type,amount: this.data.amount,relCode: this.data.relCode,relId: this.data.relId,remark: this.data.remark,inAmount: this.data.inAmount,outAmount: this.data.outAmount,status: this.data.status,oldFrozen: this.data.oldFrozen,newFrozen: this.data.newFrozen,isValid: this.data.isValid,nanoTime: this.data.nanoTime }
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