<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增APP版本' : '编辑APP版本'"
             width="700px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="166px">
      <el-form-item style="margin-top: -10px;" label="系统类型" label-width="166px">
        <dict-select v-model="form.type" placeholder="请选择系统类型"
                     no="Y00034" @change="type_change" style="width: 370px"/>
      </el-form-item>
      <el-form-item label="APP版本号" prop="versionNo">
        <el-input v-model="form.versionNo" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="强制更新版本号" prop="forceVersion" label-width="166px">
        <el-input v-model="form.forceVersion" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="状态" prop="isLatest" label-width="166px">
        <dict-select v-model="form.isLatest" placeholder="请选择状态"
                  no="Y00035" @change="latest_change" style="width: 370px"/>
      </el-form-item>

      <el-form-item label="版本说明" prop="remark" label-width="166px">
        <el-input v-model="form.remark" style="width: 370px;" type="textarea"/>
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
          id: '', versionNo: '', forceVersion: '', type: '', isLatest: '', remark: ''
        },
        rules: {
          versionNo: [{}, {required: true, message: '请输入APP版本号', trigger: 'blur'}]
          , forceVersion: [{}]
          , type: [{}, {required: true, message: '请输入系统类型(android,ios)', trigger: 'blur'}]
          , isLatest: [{}, {required: true, message: '请输入0:当前版本已经最新；1:存在新版本,是否更新？；2:当前版本已过期,请更新后使用', trigger: 'blur'}]
          , remark: [{}, {required: true, message: '请输入版本说明', trigger: 'blur'}]
        }
      }
    },
    methods: {
      type_change(val) {
        this.form.type = val
      },
      latest_change(val) {
        this.form.isLatest = val
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
        doPost('basic/appVersion/save', this.form).then(res => {
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
            alert(err.msg)
          }
        )
      },
      doEdit() {
        doPost('basic/appVersion/update', this.form).then(res => {
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
            alert(err.msg)
          }
        )
      },
      resetForm() {
        this.dialog = false
        this.$refs['form'].resetFields()
        this.form = {
          id: '', versionNo: '', forceVersion: '', type: '', isLatest: '', remark: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
