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
      _this.form = {id:this.data.id,accountId: this.data.accountId,custId: this.data.custId,extractAmount: this.data.extractAmount,feeAmount: this.data.feeAmount,orderAmount: this.data.orderAmount,idealType: this.data.idealType,idealBaseAmt: this.data.idealBaseAmt,idealCardNo: this.data.idealCardNo,payAmt: this.data.payAmt,status: this.data.status,errorMsg: this.data.errorMsg,clientType: this.data.clientType,applyTime: this.data.applyTime,accountTime: this.data.accountTime,operUserId: this.data.operUserId }
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