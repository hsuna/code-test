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
      _this.form = {id:this.data.id,accountId: this.data.accountId,custId: this.data.custId,orderAmount: this.data.orderAmount,feeAmount: this.data.feeAmount,totalAmount: this.data.totalAmount,tradeNo: this.data.tradeNo,payType: this.data.payType,payBaseAmount: this.data.payBaseAmount,payAmount: this.data.payAmount,status: this.data.status,applyTime: this.data.applyTime,tradeTime: this.data.tradeTime,accountTime: this.data.accountTime,errorCode: this.data.errorCode,errorMessage: this.data.errorMessage,remark: this.data.remark,operUserId: this.data.operUserId,bilgeCardNo: this.data.bilgeCardNo }
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