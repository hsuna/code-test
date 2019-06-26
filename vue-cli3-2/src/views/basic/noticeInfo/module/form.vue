<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增推送消息' : '编辑推送消息'"
             width="600px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="150px">
      <el-form-item label="消息标题" prop="title">
        <el-input v-model="form.title" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="消息内容" prop="content" label-width="150px">
        <el-input v-model="form.content" style="width: 370px;" type="textarea"/>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {doPost} from '@/utils/request'
  import DictSelect from '../../../components/DictSelect'

  export default {
    components: {DictSelect},
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
        form: {
          id: '', title: '', content: ''
        },
        rules: {
          title: [{}, {required: true, message: '请输入消息标题', trigger: 'blur'}]
          , content: [{}, {required: true, message: '请输入消息内容', trigger: 'blur'}]
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
        doPost('basic/noticeInfo/save', this.form).then(res => {
            this.resetForm()
            this.$notify({
              title: '添加成功',
              type: 'success',
              duration: 2500
            })
            this.loading = false
            this.$parent.$parent.init()
          }
        ).catch(err => {
            this.loading = false
            console.log(err.msg)
          }
        )
      },
      doEdit() {
        doPost('basic/noticeInfo/update', this.form).then(res => {
            this.resetForm()
            this.$notify({
              title: '修改成功',
              type: 'success',
              duration: 2500
            })
            this.loading = false
            this.sup_this.init()
          }
        ).catch(err => {
            this.loading = false
            console.log(err.msg)
          }
        )
      },
      resetForm() {
        this.dialog = false
        this.$refs['form'].resetFields()
        this.form = {
          id: '', title: '', content: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
