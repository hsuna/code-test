<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增字典项' : '修改字典项'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="66px">
      <el-form-item label="字典外键ID" prop="dictInfoId" hidden>
        <el-input v-model="form.dictInfoId" style="width: 370px;" hidden/>
      </el-form-item>
      <el-form-item label="字典键" prop="dictKey">
        <el-input v-model="form.dictKey" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="字典值" prop="dictValue">
        <el-input v-model="form.dictValue" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="描述" prop="remark">
        <el-input v-model="form.remark" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { doPost } from '@/utils/request'
export default {

  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    },
    dictInfoId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: { id: '', dictInfoId: '', dictKey: '', dictValue: '', remark: '' },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    dictInfoId(newValue, oldValue) {
      this.form.dictInfoId = newValue
    }
  },
  created() {
    this.form.dictInfoId = this.dictInfoId
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.isAdd) {
            this.doAdd()
          } else this.doEdit()
        } else {
          return false
        }
      })
    },
    doAdd() {
      doPost('system/dictItem/save', this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.$parent.init()
        this.form.dictInfoId = this.dictInfoId
      }).catch(err => {
        this.loading = false
        console.log(err.msg)
      })
    },
    doEdit() {
      doPost('system/dictItem/update', this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err.msg)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { id: '', dictKey: '', dictValue: '', remark: '' }
    }
  }
}
</script>

<style scoped>

</style>
