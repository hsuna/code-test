<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    :title="isAdd ? '新增渠道参数管理(公共配置项)' : '编辑渠道参数管理(公共配置项)'"
    width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
      <el-form-item label="CP分" prop="casId">
        <el-input v-model="form.casId" style="width: 100%;" />
      </el-form-item>

      <el-form-item label="渠道ID" prop="channelId">
        <el-input v-model="form.channelId" style="width: 100%;" />
      </el-form-item>

      <el-form-item label="游戏ID" prop="gameId">
        <el-input v-model="form.gameId" style="width: 100%;" />
      </el-form-item>

      <el-form-item label="渠道参数编码" prop="parameterCode">
        <el-input v-model="form.parameterCode" style="width: 100%;" />
      </el-form-item>

      <el-form-item label="收款商户名称" prop="merchName">
        <el-input v-model="form.merchName" style="width: 100%;" />
      </el-form-item>

      <el-form-item label="收款商户ID" prop="merchCustId">
        <el-input v-model="form.merchCustId" style="width: 100%;" />
      </el-form-item>

      <el-form-item label="合作商" prop="cooperativeMerch">
        <el-input v-model="form.cooperativeMerch" style="width: 100%;" />
      </el-form-item>

      <el-form-item label="appId" prop="appId">
        <el-input v-model="form.appId" style="width: 100%;" />
      </el-form-item>

      <el-form-item label="密钥" prop="secretKey">
        <el-input v-model="form.secretKey" style="width: 100%;" type="textarea"/>
      </el-form-item>

      <el-form-item label="seller" prop="seller">
        <el-input v-model="form.seller" style="width: 100%;" />
      </el-form-item>

      <el-form-item label="通道费率" prop="channelRate">
        <el-input v-model="form.channelRate" style="width: 100%;" />
      </el-form-item>

      <el-form-item label="收入比率" prop="incomeRate">
        <el-input v-model="form.incomeRate" style="width: 100%;" type="number" />
      </el-form-item>

      <el-form-item label="私钥" prop="privateKey">
        <el-input v-model="form.privateKey" style="width: 100%;" type="textarea" />
      </el-form-item>

      <el-form-item label="公钥" prop="pubKey">
        <el-input v-model="form.pubKey" style="width: 100%;" type="textarea"/>
      </el-form-item>

      <el-form-item label="加密方式" prop="signType">
        <dict-select
          v-model="form.signType"
          placeholder="请选择加密方式"
          no="Y00047"
          @change="signType_change"/>
      </el-form-item>

      <el-form-item style="margin-top: -10px;" label="状态" prop="status">
        <dict-select
          v-model="form.status"
          placeholder="请选择状态"
          no="Y00046"
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
      form: { id: '', casId: '', channelId: '', gameId: '', parameterCode: '', merchName: '', merchCustId: '', cooperativeMerch: '', appId: '', secretKey: '', seller: '', channelRate: '', incomeRate: '', privateKey: '', pubKey: '', signType: '', status: ''
      },
      rules: {
        casId: [{}, { required: true, message: '请输入CP分', trigger: 'blur' }],
        channelId: [{}, { required: true, message: '请输入渠道ID', trigger: 'blur' }],
        gameId: [{}, { required: true, message: '请输入游戏ID', trigger: 'blur' }],
        parameterCode: [{}, { required: true, message: '请输入渠道参数编码', trigger: 'blur' }],
        merchName: [{}, { required: true, message: '请输入收款商户名称', trigger: 'blur' }],
        merchCustId: [{}, { required: true, message: '请输入收款商户ID', trigger: 'blur' }],
        cooperativeMerch: [{}, { required: true, message: '请输入合作商', trigger: 'blur' }],
        appId: [{}, { required: true, message: '请输入appId', trigger: 'blur' }],
        secretKey: [{}, { required: true, message: '请输入密钥', trigger: 'blur' }],
        seller: [{}, { required: true, message: '请输入seller', trigger: 'blur' }],
        channelRate: [{}, { required: true, message: '请输入通道费率', trigger: 'blur' }],
        incomeRate: [{}, { required: true, message: '请输入收入比率', trigger: 'blur' }],
        privateKey: [{}, { required: true, message: '请输入私钥', trigger: 'blur' }],
        pubKey: [{}, { required: true, message: '请输入公钥', trigger: 'blur' }],
        signType: [{}, { required: true, message: '请输入加密方式', trigger: 'blur' }],
        status: [{}, { required: true, message: '请输入状态', trigger: 'blur' }]
      }
    }
  },
  methods: {
    status_change(val) {
      this.form.status = val
    },
    signType_change(val) {
      this.form.signType = val
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
      doPost('basic/gatewayParameter/save', this.form).then(res => {
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
      doPost('basic/gatewayParameter/update', this.form).then(res => {
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
      this.form = { id: '', casId: '', channelId: '', gameId: '', parameterCode: '', merchName: '', merchCustId: '', cooperativeMerch: '', appId: '', secretKey: '', seller: '', channelRate: '', incomeRate: '', privateKey: '', pubKey: '', signType: '', status: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
