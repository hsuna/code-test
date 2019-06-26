<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增字典表' : '编辑字典表'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="66px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" style="width: 370px;"/>
      </el-form-item>
      <el-form-item style="margin-top: -10px;" label="类型">
        <el-select v-model="form.dictType" placeholder="请选择类型" style="width: 370px;">
          <el-option v-for="item in zones" :key="item.key" :label="item.val" :value="item.key"/>
        </el-select>
      </el-form-item>
      <el-form-item style="margin-top: -10px;" label="备注">
        <el-input v-model="form.remark" style="width: 370px;" rows="2" type="textarea"/>
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
    }
  },
  data() {
    return {
      zones: [{ key: 1, val: '普通' }, { key: 2, val: '语句' }],
      loading: false, dialog: false,
      form: { id: '', code: '', name: '', dictType: '', remark: '' },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
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
      doPost('system/dictInfo/save', this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.msg)
      })
    },
    doEdit() {
      doPost('system/dictInfo/update', this.form).then(res => {
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
      this.form = { id: '', code: '', name: '', dictType: '', remark: '' }
    }
  }
}
</script>

<style scoped>

</style>
