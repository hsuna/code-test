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
      _this.form = {id:this.data.id,accountId: this.data.accountId,custId: this.data.custId,frozenType: this.data.frozenType,frozenAmount: this.data.frozenAmount,frozenCode: this.data.frozenCode,frozenRel: this.data.frozenRel,frozenExplain: this.data.frozenExplain,frozenTime: this.data.frozenTime,unfrozenCode: this.data.unfrozenCode,unfrozenRel: this.data.unfrozenRel,unfrozenTime: this.data.unfrozenTime,unfrozenExplain: this.data.unfrozenExplain,status: this.data.status,isValid: this.data.isValid }
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