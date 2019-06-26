<template>
  <div>
    <el-button :disabled="data.id === 1" size="mini" type="success" @click="to">查看</el-button>
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
      _this.form = {id:this.data.id,bizId: this.data.bizId,typeCode: this.data.typeCode,fileName: this.data.fileName,fileSize: this.data.fileSize,fileSuffix: this.data.fileSuffix,fileUrl: this.data.fileUrl }
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
