<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    :title="isAdd ? '新增公共码值对应表' : '编辑公共码值对应表'"
    width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
      <el-form-item label="码表ID" prop="codeId">
        <el-input v-model="form.codeId" style="width: 100%;" />
      </el-form-item>

      <el-form-item label="渠道ID" prop="channelId">
        <el-input v-model="form.channelId" style="width: 100%;" />
      </el-form-item>

      <el-form-item label="渠道码" prop="channelCode">
        <el-input v-model="form.channelCode" style="width: 100%;" />
      </el-form-item>

      <el-form-item label="渠道码说明" prop="channelMsg">
        <el-input v-model="form.channelMsg" style="width: 100%;" />
      </el-form-item>

      <el-form-item label="标准码" prop="normCode">
        <el-input v-model="form.normCode" style="width: 100%;" />
      </el-form-item>

      <el-form-item label="标准码值说明" prop="normMsg">
        <el-input v-model="form.normMsg" style="width: 100%;" />
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
      form: { id: '', codeId: '', channelId: '', channelCode: '', channelMsg: '', normCode: '', normMsg: ''
      },
      rules: {
        codeId: [{}, { required: true, message: '请输入码表ID', trigger: 'blur' }],
        channelId: [{}, { required: true, message: '请输入渠道ID', trigger: 'blur' }],
        channelCode: [{}, { required: true, message: '请输入渠道码', trigger: 'blur' }],
        channelMsg: [{}, { required: true, message: '请输入渠道码说明', trigger: 'blur' }],
        normCode: [{}, { required: true, message: '请输入标准码', trigger: 'blur' }],
        normMsg: [{}, { required: true, message: '请输入标准码值说明', trigger: 'blur' }]
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
      }
      )
    },
    doAdd() {
      doPost('basic/gatewayCodeOrm/save', this.form).then(res => {
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
      doPost('basic/gatewayCodeOrm/update', this.form).then(res => {
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
      this.form = { id: '', codeId: '', channelId: '', channelCode: '', channelMsg: '', normCode: '', normMsg: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
