<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增广告位' : '编辑广告位'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="66px">
                    <el-form-item label="位置名称" prop="name">
                        <el-input v-model="form.name" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="编码" prop="code">
                        <el-input v-model="form.code" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item style="margin-top: -10px;" label="状态" prop="status">
                      <dict-select v-model="form.status" placeholder="请选择状态" no="Y00004" @change="change" />
                    </el-form-item>
                    <el-form-item style="margin-top: -10px;" label="备注" prop="remark">
                        <el-input v-model="form.remark" style="width: 370px;" rows="2" type="textarea"/>
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
    import IconSelect from '@/components/IconSelect'
    import DictSelect from '../../../components/DictSelect'
    export default {
        components:{DictSelect,IconSelect},
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
                status_dict: [{key: 1, val: '有效'},{key: 1, val: '无效'}],
                loading: false, dialog: false,
                form: { id: '' ,name: '',code: '',status: '',remark: '' },
            rules: {

                name: [{}
                    ,{ required: true, message: '请输入位置名称',trigger: 'blur'}
                ]
                ,
                code: [{}
                    ,{ required: true, message: '请输入编码',trigger: 'blur'}
                ]
                ,
                status: [{}
                    ,{ required: true, message: '请输入状态',trigger: 'blur'}
                ]
                ,
                remark: [{}
                    ,{ required: true, message: '请输入备注',trigger: 'blur'}
                ]
            }
        }
        },
        methods: {
          change(val){
            this.form.status = val;
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
                doPost('basic/advertisingInfo/save', this.form).then(res => {
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
                doPost('basic/advertisingInfo/update', this.form).then(res => {
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
                this.form = { id: '' ,name: '',code: '',status: '',remark: '' }
            }
        }
    }
</script>

<style scoped>

</style>
