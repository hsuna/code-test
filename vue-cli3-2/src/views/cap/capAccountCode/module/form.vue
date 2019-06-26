<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    :title="isAdd ? '新增账户科目' : '编辑账户科目'"
    width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="66px">
      <el-form-item label="科目编码" prop="code" label-width="100px">
        <el-input v-model="form.code" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="科目名称" prop="name" label-width="100px">
        <el-input v-model="form.name" style="width: 370px;"/>
      </el-form-item>

      <el-form-item style="margin-top: -10px;" label="状态" label-width="100px">
        <dict-select
          v-model="form.status"
          placeholder="请选择状态"
          no="Y00004"
          @change="status_change"/>
      </el-form-item>
      <el-form-item style="margin-top: -10px;" label="科目类型" label-width="100px">
        <dict-select
          v-model="form.type"
          placeholder="请选择类型"
          no="Y00043"
          @change="type_change"/>
      </el-form-item>
      <el-form-item label="备注" prop="remark" label-width="100px">
        <el-input v-model="form.remark" style="width: 370px;" type="textarea"/>
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
import DictSelect from '../../../components/DictSelect'

export default {
  components: { DictSelect },
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
      loading: false, dialog: false,
      form: {
        id: '', code: '', name: '', status: '', type: '', remark: ''
      },
      rules: {
        code: [{}, { required: true, message: '请输入科目编码', trigger: 'blur' }],
        name: [{}, { required: true, message: '请输入科目名称', trigger: 'blur' }],
        status: [{}, { required: true, message: '请输入状态 0 停用 1正常', trigger: 'blur' }],
        type: [{}, { required: true, message: '请输入类型 1收入 2支出 3冻结 4解冻 5解冻扣除', trigger: 'blur' }],
        remark: [{}, { required: true, message: '请输入备注', trigger: 'blur' }]
      }
    }
  },
  methods: {
    status_change(val) {
      this.form.status = val
    },
    type_change(val) {
      this.form.type = val
    },
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
      }
      )
    },
    doAdd() {
      doPost('cap/capAccountCode/save', this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.init()
      }
      ).catch(err => {
        this.loading = false
        console.log(err.msg)
        this.$notify({
          title: err.msg,
          type: 'success',
          duration: 2500
        })
      }
      )
    },
    doEdit() {
      doPost('cap/capAccountCode/update', this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
      }
      ).catch(err => {
        this.loading = false
        console.log(err.msg)
      }
      )
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id: '', code: '', name: '', status: '', type: '', remark: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
