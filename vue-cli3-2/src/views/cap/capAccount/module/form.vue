<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增账户' : '编辑账户'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="66px">
      <el-form-item label="用户" prop="custId">
        <el-input v-model="form.custId" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="账户总额" prop="totleAmount">
        <el-input v-model="form.totleAmount" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="冻结金额" prop="frozenAmount">
        <el-input v-model="form.frozenAmount" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="可用余额" prop="balanceAmount">
        <el-input v-model="form.balanceAmount" style="width: 370px;"/>
      </el-form-item>

      <el-form-item style="margin-top: -10px;" label="状态">
        <dict-select v-model="form.status" placeholder="请选择状态" no="Y00006" @change="change" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="错误时间" prop="errorTime">
        <el-input v-model="form.errorTime" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="错误内容" prop="errorMsg">
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
      form: { id: '', custId: '', totleAmount: '', frozenAmount: '', balanceAmount: '', status: '', remark: '', errorTime: '', errorMsg: '' },
      rules: {

        custId: [{},
          { required: true, message: '请输入用户', trigger: 'blur' }
        ],
        totleAmount: [{},
          { required: true, message: '请输入账户总额', trigger: 'blur' }
        ],
        frozenAmount: [{},
          { required: true, message: '请输入冻结金额', trigger: 'blur' }
        ],
        balanceAmount: [{},
          { required: true, message: '请输入可用余额', trigger: 'blur' }
        ],
        status: [{},
          { required: true, message: '请输入状态', trigger: 'blur' }
        ],
        remark: [{},
          { required: true, message: '请输入备注', trigger: 'blur' }
        ],
        errorTime: [{},
          { required: true, message: '请输入错误时间', trigger: 'blur' }
        ],
        errorMsg: [{},
          { required: true, message: '请输入错误内容', trigger: 'blur' }
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
      doPost('cap/capAccount/save', this.form).then(res => {
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
      doPost('cap/capAccount/update', this.form).then(res => {
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
      this.form = { id: '', custId: '', totleAmount: '', frozenAmount: '', balanceAmount: '', status: '', remark: '', errorTime: '', errorMsg: '' }
    }
  }
}
</script>

<style scoped>

</style>
