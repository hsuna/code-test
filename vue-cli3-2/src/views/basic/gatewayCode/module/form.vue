<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    :title="isAdd ? '新增公共码值基础表' : '编辑公共码值基础表'"
    width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="渠道ID" prop="channelId">
        <el-input v-model="form.channelId" style="width: 100%;" />
      </el-form-item>

      <el-form-item label="渠道码" prop="code">
        <el-input v-model="form.code" style="width: 100%;" />
      </el-form-item>

      <el-form-item label="渠道码说明" prop="msg">
        <el-input v-model="form.msg" style="width: 100%;" />
      </el-form-item>

      <el-form-item style="margin-top: -10px;" label="是否标准码" prop="isNorm">
        <dict-select
          v-model="form.isNorm"
          placeholder="请选择是否标准码"
          no="Y00007"
          @change="isNorm_change"/>
      </el-form-item>
      <el-form-item style="margin-top: -10px;" label="状态" prop="status">
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
      form: { id: '', channelId: '', code: '', msg: '', isNorm: '', status: ''
      },
      rules: {
        channelId: [{}, { required: true, message: '请输入渠道ID', trigger: 'blur' }],
        code: [{}, { required: true, message: '请输入渠道码', trigger: 'blur' }],
        msg: [{}, { required: true, message: '请输入渠道码说明', trigger: 'blur' }],
        isNorm: [{}, { required: true, message: '请输入是否标准码', trigger: 'blur' }],
        status: [{}, { required: true, message: '请输入状态', trigger: 'blur' }]
      }
    }
  },
  methods: {
    isNorm_change(val) {
      this.form.isNorm = val
    },
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
      doPost('basic/gatewayCode/save', this.form).then(res => {
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
      doPost('basic/gatewayCode/update', this.form).then(res => {
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
      this.form = { id: '', channelId: '', code: '', msg: '', isNorm: '', status: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
