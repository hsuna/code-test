<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    :title="isAdd ? '新增对账科目' : '编辑对账科目'"
    width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">

      <el-form-item label="科目名称" prop="name">
        <el-input v-model="form.name" style="width: 100%;" />
      </el-form-item>

      <el-form-item label="时间表达式" prop="taskTime">
        <el-input type="textarea" v-model="form.taskTime" style="width: 100%;" />
      </el-form-item>

      <el-form-item style="margin-top: 0px;" label="状态" prop="status">
        <dict-select
          v-model="form.status"
          placeholder="请选择状态"
          no="Y00006"
          @change="status_change"/>
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
      form: { id: '', code: '', name: '', taskTime: '', status: ''
      },
      rules: {
        name: [{}, { required: true, message: '请输入科目名称', trigger: 'blur' }],
        taskTime: [{}, { required: true, message: '请输入时间表达式', trigger: 'blur' }],
        status: [{}, { required: true, message: '请输入状态', trigger: 'blur' }]
      }
    }
  },
  methods: {
    status_change(val) {
      this.form.status = val
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
      doPost('adjust/sujectInfo/save', this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.init()
      }
      )
        .catch(err => {
          this.loading = false
          console.log(err.msg)
        }
        )
    },
    doEdit() {
      doPost('adjust/sujectInfo/update', this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
      }
      )
        .catch(err => {
          this.loading = false
          console.log(err.msg)
        }
        )
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { id: '', name: '', taskTime: '', status: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
