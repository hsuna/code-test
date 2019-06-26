<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增附件信息' : '查看附件信息'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="66px">
                    <el-form-item label="文件名称" prop="fileName">
                        <el-input v-model="form.fileName" style="width: 370px;"/>
                    </el-form-item>
                    <el-form-item label="类型编码" prop="typeCode">
                        <el-input v-model="form.typeCode" style="width: 370px;"/>
                    </el-form-item>
                    <el-form-item label="文件" prop="fileUrl">
                      <a :href="form.fileUrl" download="">
                        <img v-if="form.fileUrl" :src="form.fileUrl" title="文件" >
                      </a>
                    </el-form-item>
                    <el-form-item label="文件大小" prop="fileSize">
                        <el-input v-model="form.fileSize" style="width: 370px;"/>
                    </el-form-item>
                    <el-form-item label="文件后缀" prop="fileSuffix">
                        <el-input v-model="form.fileSuffix" style="width: 370px;"/>
                    </el-form-item>
                    <el-form-item label="业务Id" prop="bizId">
                        <el-input v-model="form.bizId" style="width: 370px;"/>
                    </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <!--<el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>-->
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
                form: { id: '' ,bizId: '',typeCode: '',fileName: '',fileSize: '',fileSuffix: '',fileUrl: '' },
            rules: {

                bizId: [{}
                    ,{ required: true, message: '请输入业务Id',trigger: 'blur'}
                ]
                ,
                typeCode: [{}
                    ,{ required: true, message: '请输入类型编码',trigger: 'blur'}
                ]
                ,
                fileName: [{}
                    ,{ required: true, message: '请输入文件名称',trigger: 'blur'}
                ]
                ,
                // fileSize: [{}
                //     ,{ required: true, message: '请输入文件大小',trigger: 'blur'}
                // ]
                // ,
                fileSuffix: [{}
                    ,{ required: true, message: '请输入文件后缀',trigger: 'blur'}
                ]
                ,
                fileUrl: [{}
                    ,{ required: true, message: '请输入文件地址',trigger: 'blur'}
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
                doPost('system/attachmentInfo/save', this.form).then(res => {
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
                doPost('system/attachmentInfo/update', this.form).then(res => {
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
                this.form = { id: '' ,bizId: '',typeCode: '',fileName: '',fileSize: '',fileSuffix: '',fileUrl: '' }
            }
        }
    }
</script>

<style scoped>

</style>
