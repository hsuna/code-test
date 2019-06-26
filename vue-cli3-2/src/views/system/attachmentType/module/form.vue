<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增类型' : '编辑类型'" width="600px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="上级类目">
        <treeselect v-model="form.pid" :options="menus" style="width: 460px;" placeholder="选择上级类目"/>
      </el-form-item>
      <el-form-item label="类型名称" prop="name">
        <el-input v-model="form.name" placeholder="类型名称" style="width: 460px;"/>
      </el-form-item>
      <el-form-item label="文件格式" prop="fileFormat">
        <dict-select v-model="form.fileFormat" no="Y00002" @change="change"/>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/attach'
import Treeselect from '@riophae/vue-treeselect'
import IconSelect from '@/components/IconSelect'
import DictSelect from '../../../components/DictSelect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: { Treeselect, IconSelect, DictSelect },
  props: {
    menus: {
      type: Array,
      required: true
    },
    roles: {
      type: Array,
      required: true
    },
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
      form: { name: '', fileFormat: '', pid: 1, menus: [] },
      roleIds: [],
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        fileFormat: [
          { required: true, message: '请输入上传的文件格式', trigger: 'blur' }
        ],
        pid: [
          { required: true, message: '请选择父级', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    change(val) {
      this.form.fileFormat = val
    },
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          this.form.menus = []
          if (this.isAdd) {
            this.doAdd()
          } else this.doEdit()
        } else {
          return false
        }
      })
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.init()
        this.$parent.$parent.meuns()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
        this.sup_this.meuns()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { name: '', fileFormat: '', pid: 1, menus: [] }
    },
    selected(name) {
      this.form.icon = name
    }
  }
}
</script>

<style scoped>

</style>
