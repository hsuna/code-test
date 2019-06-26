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
      _this.form = {id:this.data.id,casId: this.data.casId,channelId: this.data.channelId,gameId: this.data.gameId,parameterCode: this.data.parameterCode,merchName: this.data.merchName,merchCustId: this.data.merchCustId,cooperativeMerch: this.data.cooperativeMerch,appId: this.data.appId,secretKey: this.data.secretKey,seller: this.data.seller,channelRate: String(this.data.channelRate),incomeRate: String(this.data.incomeRate),privateKey: this.data.privateKey,pubKey: this.data.pubKey,signType: String(this.data.signType),status: String(this.data.status) }
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
