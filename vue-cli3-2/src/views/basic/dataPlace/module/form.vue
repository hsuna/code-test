<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增地区信息' : '编辑地区信息'" width="600px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">

      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" style="width: 430px;"/>
      </el-form-item>

      <el-form-item label="父类CODE" prop="code">
        <el-input v-model="form.code" style="width: 430px;"/>
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
      form: { id: '', code: '', lev: '', name: '', pCode: '', status: '', pinYin: '' },
      rules: {

        code: [{},
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        name: [{},
          { required: true, message: '请输入名称', trigger: 'blur' }
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
      doPost('basicDataPlace/save', this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '保存成功',
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
      doPost('basicDataPlace/update', this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '更新成功',
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
      this.form = { id: '', code: '', lev: '', name: '', pCode: '', status: '', pinYin: '' }
    }
  }
}
</script>

<style scoped>

</style>
