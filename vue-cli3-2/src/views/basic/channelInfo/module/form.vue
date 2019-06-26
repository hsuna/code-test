<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增类别' : '编辑类别'" width="600px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item style="margin-top: -10px;" label="上级类别">
        <treeselect v-model="form.pid" :options="menus" style="width: 460px;" placeholder="选择上级类别" />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" style="width: 460px;"/>
      </el-form-item>
      <el-form-item style="margin-top: -10px;" label="状态" prop="status">
        <dict-select v-model="form.status" placeholder="请选择状态" no="Y00004" @change="change" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/channelInfo'
import Treeselect from '@riophae/vue-treeselect'
import IconSelect from '@/components/IconSelect'
import DictSelect from '../../../components/DictSelect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: { DictSelect, Treeselect, IconSelect },
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    },
    menus: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: { id: '', name: '', pid: 1, status: '' },
      rules: {

        name: [{},
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],

        pid: [{},
          { required: true, message: '请输入父类ID', trigger: 'blur' }
        ],

        status: [{},
          { required: true, message: '请输入状态', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    showImgBox(name,str){
      let url = this.$store.getters.baseUrl+'/common/viewImg?fileId='+str;
      this.sup_this.url = url;
      this.sup_this.dialogTitle = name;
      this.sup_this.dialogVisible = true;
    },
    change(val) {
      this.form.status = val
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
        console.log(err.msg)
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
        console.log(err.msg)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { id: '', name: '', pid: '1', status: '' }
    },
    selected(name) {
      this.form.icon = name
    }
  }
}
</script>

<style scoped>

</style>
