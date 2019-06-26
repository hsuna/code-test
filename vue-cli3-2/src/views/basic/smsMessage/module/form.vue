<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增短信表' : '编辑短信表'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="66px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="客户" prop="custId">
        <el-input v-model="form.custId" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="短信内容" prop="content">
        <el-input v-model="form.content" style="width: 370px;"/>
      </el-form-item>

      <el-form-item style="margin-top: -10px;" label="类型22">
        <dict-select v-model="form.smsType" placeholder="请选择类型" no="Y00009" @change="change" />
      </el-form-item>
      <el-form-item label="业务主键ID" prop="bizId">
        <el-input v-model="form.bizId" style="width: 370px;"/>
      </el-form-item>

      <el-form-item style="margin-top: -10px;" label="状态">
        <dict-select v-model="form.status" placeholder="请选择状态" no="Y00011" @change="change" />
      </el-form-item>
      <el-form-item label="发送时间" prop="sendTime">
        <el-input v-model="form.sendTime" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="错误信息" prop="errorMsg">
        <el-input v-model="form.errorMsg" style="width: 370px;"/>
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
      form: { id: '', phone: '', custId: '', content: '', smsType: '', bizId: '', status: '', sendTime: '', errorMsg: '' },
      rules: {

        phone: [{}, { required: true, message: '请输入手机号', trigger: 'blur' }],
        custId: [{},
          { required: true, message: '请输入客户', trigger: 'blur' }
        ],
        content: [{},
          { required: true, message: '请输入短信内容', trigger: 'blur' }
        ],
        smsType: [{},
          { required: true, message: '请输入类型', trigger: 'blur' }
        ],
        bizId: [{},
          { required: true, message: '请输入业务主键ID', trigger: 'blur' }
        ],
        status: [{},
          { required: true, message: '请输入状态', trigger: 'blur' }
        ],
        sendTime: [{},
          { required: true, message: '请输入发送时间', trigger: 'blur' }
        ],
        errorMsg: [{},
          { required: true, message: '请输入错误信息', trigger: 'blur' }
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
      doPost('basic/smsMessage/save', this.form).then(res => {
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
      doPost('basic/smsMessage/update', this.form).then(res => {
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
      this.form = { id: '', phone: '', custId: '', content: '', smsType: '', bizId: '', status: '', sendTime: '', errorMsg: '' }
    }
  }
}
</script>

<style scoped>

</style>
