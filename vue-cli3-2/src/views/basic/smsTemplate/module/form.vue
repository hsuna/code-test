<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    :title="isAdd ? '新增短信模板' : '编辑短信模板'"
    width="550px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="模板名称" prop="name">
        <el-input v-model="form.name" style="width: 370px;"/>
      </el-form-item>
      <el-form-item style="margin-top: -10px;" label="间隔秒">
        <el-input v-model="form.intervalSecond" style="width: 370px;" />
      </el-form-item>
      <el-form-item style="margin-top: -10px;" label="第三方模板Id">
        <el-input v-model="form.templateCode" style="width: 370px;" />
      </el-form-item>
      <el-form-item style="margin-top: -10px;" label="第三方签名">
        <el-input v-model="form.signName" style="width: 370px;" />
      </el-form-item>
      <el-form-item style="margin-top: -10px;" label="模板内容">
        <el-input v-model="form.content" style="width: 370px;" rows="3" type="textarea"/>
      </el-form-item>
      <el-form-item style="margin-top: -10px;" label="状态">
        <dict-select
          v-model="form.sendChanel"
          placeholder="请选择发送渠道"
          no="Y00016"
          style="width: 370px;"
          @change="sendChanel_change"/>
      </el-form-item>
      <el-form-item style="margin-top: -10px;" label="状态">
        <dict-select
          v-model="form.status"
          placeholder="请选择状态"
          no="Y00013"
          style="width: 370px;"
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
      form: { id: '', name: '', code: '', content: '', status: ''
      },
      rules: {
        name: [{}, { required: true, message: '请输入模板名称', trigger: 'blur' }],
        content: [{}, { required: true, message: '请输入模板内容', trigger: 'blur' }],
        intervalSecond: [{}, { required: true, message: '请输入模板内容', trigger: 'blur' }],
        status: [{}, { required: true, message: '请输入状态', trigger: 'blur' }]
      }
    }
  },
  methods: {
    status_change(val) {
      this.form.status = val
    },
    sendChanel_change(val) {
      this.form.sendChanel = val
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
      doPost('basic/smsTemplate/save', this.form).then(res => {
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
      doPost('basic/smsTemplate/update', this.form).then(res => {
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
      this.form = { id: '', name: '', code: '', content: '', status: '', intervalSecond: '', sendChanel: '', signName: '', templateCode: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
