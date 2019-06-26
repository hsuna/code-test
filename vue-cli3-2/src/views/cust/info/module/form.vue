<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增用户信息' : '修改用户信息'" width="540px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="66px">
      <!-- <el-form-item label="登录名" prop="loginName" label-width="100px">
        <el-input v-model="form.loginName" style="width: 370px;"/>
      </el-form-item> -->
      <!-- <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" style="width: 370px;"/>
      </el-form-item> -->
      <el-form-item label="真实姓名" prop="realName" label-width="100px">
        <el-input v-model="form.realName" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="类型" prop="type" label-width="100px">
        <el-radio v-model="form.type" label="1">个人</el-radio>
        <el-radio v-model="form.type" label="2">商家</el-radio>
      </el-form-item>
      <el-form-item label="手机号" prop="phone" label-width="100px">
        <el-input v-model="form.phone" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" label-width="100px">
        <el-input v-model="form.email" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="是否有效" prop="valid" label-width="100px">
        <el-radio v-model="form.valid" label="1">有效</el-radio>
        <el-radio v-model="form.valid" label="0">无效</el-radio>
      </el-form-item>
      <!-- <el-form-item label="最后登录时间" prop="lastLoginTime" label-width="100px">
        <el-input v-model="form.lastLoginTime" style="width: 370px;"/>
      </el-form-item> -->
      <!-- <el-form-item label="tokenid" prop="tokenId" label-width="100px">
        <el-input v-model="form.tokenId" style="width: 370px;"/>
      </el-form-item> -->
      <!-- <el-form-item label="随机加密字段" prop="entry" label-width="100px">
        <el-input v-model="form.entry" style="width: 370px;"/>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { doPost } from '@/utils/request'
import { phone, email } from '@/utils/validate'

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
      loading: false, dialog: false,
      form: { type: '1', valid: '1' },
      rules: {
        // phone: [
        //   { required: true, message: '请输入手机号', trigger: 'blur' },
        //   { validator: phone, message: '手机号格式不正确', trigger: 'blur' }
        // ],
        // email: [
        //   { required: true, message: '请输入邮箱', trigger: 'blur' },
        //   { validator: email, message: '邮箱格式不正确', trigger: 'blur' }
        // ]
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
          console.log('失败')
          return false
        }
      })
    },
    doAdd() {
      doPost('cust/info/save', this.form).then(res => {
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
      doPost('cust/info/update', this.form).then(res => {
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
      this.form = { type: '1', valid: '1' }
    }
  }
}
</script>

<style scoped>
small .el-form-item__label {
    line-height: 50px;
}
</style>
