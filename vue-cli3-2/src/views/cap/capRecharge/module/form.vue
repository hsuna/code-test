<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增充值明细' : '编辑充值明细'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="66px">
      <el-form-item label="资金账户表id" prop="accountId">
        <el-input v-model="form.accountId" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="用户id" prop="custId">
        <el-input v-model="form.custId" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="充值金额" prop="orderAmount">
        <el-input v-model="form.orderAmount" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="充值手续费" prop="feeAmount">
        <el-input v-model="form.feeAmount" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="充值总金额" prop="totalAmount">
        <el-input v-model="form.totalAmount" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="银行交易流水" prop="tradeNo">
        <el-input v-model="form.tradeNo" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="比特币" prop="payType">
        <el-input v-model="form.payType" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="虚拟货币比率" prop="payBaseAmount">
        <el-input v-model="form.payBaseAmount" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="实际支付金额" prop="payAmount">
        <el-input v-model="form.payAmount" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="状态（0申请中 1充值成功 2到帐 9充值失败）" prop="status">
        <el-input v-model="form.status" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="申请时间" prop="applyTime">
        <el-input v-model="form.applyTime" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="成功交易时间" prop="tradeTime">
        <el-input v-model="form.tradeTime" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="到帐时间" prop="accountTime">
        <el-input v-model="form.accountTime" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="创建时间" prop="errorCode">
        <el-input v-model="form.errorCode" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="" prop="errorMessage">
        <el-input v-model="form.errorMessage" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="后台操作人ID" prop="operUserId">
        <el-input v-model="form.operUserId" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="收款公户" prop="bilgeCardNo">
        <el-input v-model="form.bilgeCardNo" style="width: 370px;"/>
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
      form: { id: '', accountId: '', custId: '', orderAmount: '', feeAmount: '', totalAmount: '', tradeNo: '', payType: '', payBaseAmount: '', payAmount: '', status: '', applyTime: '', tradeTime: '', accountTime: '', errorCode: '', errorMessage: '', remark: '', operUserId: '', bilgeCardNo: '' },
      rules: {

        accountId: [{},
          { required: true, message: '请输入资金账户表id', trigger: 'blur' }
        ],

        custId: [{},
          { required: true, message: '请输入用户id', trigger: 'blur' }
        ],

        orderAmount: [{},
          { required: true, message: '请输入充值金额', trigger: 'blur' }
        ],

        feeAmount: [{},
          { required: true, message: '请输入充值手续费', trigger: 'blur' }
        ],

        totalAmount: [{},
          { required: true, message: '请输入充值总金额', trigger: 'blur' }
        ],

        tradeNo: [{},
          { required: true, message: '请输入银行交易流水', trigger: 'blur' }
        ],

        payType: [{},
          { required: true, message: '请输入比特币', trigger: 'blur' }
        ],

        payBaseAmount: [{},
          { required: true, message: '请输入虚拟货币比率', trigger: 'blur' }
        ],

        payAmount: [{},
          { required: true, message: '请输入实际支付金额', trigger: 'blur' }
        ],

        status: [{},
          { required: true, message: '请输入状态（0申请中 1充值成功 2到帐 9充值失败）', trigger: 'blur' }
        ],

        applyTime: [{},
          { required: true, message: '请输入申请时间', trigger: 'blur' }
        ],

        tradeTime: [{},
          { required: true, message: '请输入成功交易时间', trigger: 'blur' }
        ],

        accountTime: [{},
          { required: true, message: '请输入到帐时间', trigger: 'blur' }
        ],

        errorCode: [{},
          { required: true, message: '请输入创建时间', trigger: 'blur' }
        ],

        errorMessage: [{},
          { required: true, message: '请输入', trigger: 'blur' }
        ],

        remark: [{},
          { required: true, message: '请输入备注', trigger: 'blur' }
        ],

        operUserId: [{},
          { required: true, message: '请输入后台操作人ID', trigger: 'blur' }
        ],

        bilgeCardNo: [{},
          { required: true, message: '请输入收款公户', trigger: 'blur' }
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
      doPost('cap/capRecharge/save', this.form).then(res => {
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
      doPost('cap/capRecharge/update', this.form).then(res => {
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
      this.form = { id: '', accountId: '', custId: '', orderAmount: '', feeAmount: '', totalAmount: '', tradeNo: '', payType: '', payBaseAmount: '', payAmount: '', status: '', applyTime: '', tradeTime: '', accountTime: '', errorCode: '', errorMessage: '', remark: '', operUserId: '', bilgeCardNo: '' }
    }
  }
}
</script>

<style scoped>

</style>
