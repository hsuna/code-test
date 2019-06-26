<template>
  <div class="app-container">
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增广告' : '编辑广告'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="66px">
      <el-form-item label="主表ID"  v-show="false">
        <el-input v-model="form.advertisingId" style="width: 370px;" disabled="disabled"/>
      </el-form-item>

      <el-form-item label="图片">
        <input
          id="saveImage"
          ref="new_image"
          type="file"
          name="myphoto"
          accept="image/png,image/gif,image/jpeg">
        <el-button @click="addImage">确认添加</el-button>
        <span v-if="form.picId != null && form.picId.length > 0">
        <el-button @click="showImgBox('查看图片',form.picId)">查看广告图片</el-button></span>

      </el-form-item>


      <el-form-item label="连接">
        <el-input v-model="form.linkUrl" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="序号">
        <el-input v-model="form.seqNo" style="width: 370px;"/>
      </el-form-item>

      <el-form-item style="margin-top: -10px;" label="状态">
        <dict-select v-model="form.status" placeholder="请选择状态" no="Y00004" @change="change" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
  <picshow ref="picShowDialog"></picshow>
  </div>
</template>

<script>
import { doPost, doPostMulti } from '@/utils/request'
import IconSelect from '@/components/IconSelect'
import DictSelect from '../../../components/DictSelect'
import picshow from './picshow'

export default {
  components: { DictSelect, IconSelect,picshow },
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    },
    advInfoId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: { id: '', advertisingId: '', picId: '', linkUrl: '', seqNo: '', status: '' },
      rules: {

        advertisingId: [{},
          { required: true, message: '请输入主表ID', trigger: 'blur' }
        ],

        picId: [{},
          { required: true, message: '请输入图片ID', trigger: 'blur' }
        ],

        linkUrl: [{},
          { required: true, message: '请输入连接', trigger: 'blur' }
        ],

        seqNo: [{},
          { required: true, message: '请输入序号', trigger: 'blur' }
        ],

        status: [{},
          { required: true, message: '请输入状态', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    advInfoId(newValue, oldValue) {
      this.form.advertisingId = newValue
    }
  },
  created() {
    this.form.advertisingId = this.advInfoId
  },
  methods: {
    showImgBox(name,str){
      let url = this.$store.getters.baseUrl+'/common/viewImg?fileId='+str;
      this.$refs.picShowDialog.url = url;
      this.$refs.picShowDialog.dialogTitle = name;
      this.$refs.picShowDialog.dialogVisible = true;
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
      doPost('basic/advertisingDeatil/save', this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.$parent.init()
        this.form.advInfoId = this.advInfoId
      }).catch(err => {
        this.loading = false
        console.log(err.msg)
      })
    },
    doEdit() {
      doPost('basic/advertisingDeatil/update', this.form).then(res => {
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
      this.form = { id: '', advertisingId: this.advInfoId, picId: '', linkUrl: '', seqNo: '', status: '' }
    },
    addImage: function() {
      const self = this
      if (self.$refs.new_image.files.length !== 0) {
        var formData = new FormData()
        formData.append('file', self.$refs.new_image.files[0])
        // 单个文件进行上传
        formData.append('typeCode', 'F005001')
        doPostMulti('/common/upload', formData).then(res => {
          this.form.picId = res;
          this.$notify({
            title: '上传成功',
            type: 'success',
            duration: 2500
          })
        }).catch(err => {
          console.log(err.msg)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
