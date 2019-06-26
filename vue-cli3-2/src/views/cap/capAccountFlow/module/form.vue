<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增账户流水' : '编辑账户流水'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="66px">
                    <el-form-item label="资金账户表id" prop="accountId">
                        <el-input v-model="form.accountId" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="用户id" prop="custId">
                        <el-input v-model="form.custId" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="1收入 2支出" prop="inOut">
                        <el-input v-model="form.inOut" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="资金类型" prop="ioType">
                        <el-input v-model="form.ioType" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="类型名称" prop="ioTypeName">
                        <el-input v-model="form.ioTypeName" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="发生金额" prop="transAmount">
                        <el-input v-model="form.transAmount" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="收益金额" prop="incomeAmount">
                        <el-input v-model="form.incomeAmount" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="花费金额" prop="expendAmount">
                        <el-input v-model="form.expendAmount" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="外键 业务ID" prop="transId">
                        <el-input v-model="form.transId" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="发生时间" prop="flowTime">
                        <el-input v-model="form.flowTime" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="之前总账户收入金额" prop="bakTotleAmount">
                        <el-input v-model="form.bakTotleAmount" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="" prop="newTotleAmount">
                        <el-input v-model="form.newTotleAmount" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="0申请中 1已生效 2已失效" prop="status">
                        <el-input v-model="form.status" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="0 否 1是" prop="isValid">
                        <el-input v-model="form.isValid" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="" prop="nanoTime">
                        <el-input v-model="form.nanoTime" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="" prop="remark">
                        <el-input v-model="form.remark" style="width: 370px;"/>
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
                form: { id: '' ,accountId: '',custId: '',inOut: '',ioType: '',ioTypeName: '',transAmount: '',incomeAmount: '',expendAmount: '',transId: '',flowTime: '',bakTotleAmount: '',newTotleAmount: '',status: '',isValid: '',nanoTime: '',remark: '' },
            rules: {
                
                accountId: [{}
                    ,{ required: true, message: '请输入资金账户表id',trigger: 'blur'}
                ]
                ,
                custId: [{}
                    ,{ required: true, message: '请输入用户id',trigger: 'blur'}
                ]
                ,
                inOut: [{}
                    ,{ required: true, message: '请输入1收入 2支出',trigger: 'blur'}
                ]
                ,
                ioType: [{}
                    ,{ required: true, message: '请输入资金类型',trigger: 'blur'}
                ]
                ,
                ioTypeName: [{}
                    ,{ required: true, message: '请输入类型名称',trigger: 'blur'}
                ]
                ,
                transAmount: [{}
                    ,{ required: true, message: '请输入发生金额',trigger: 'blur'}
                ]
                ,
                incomeAmount: [{}
                    ,{ required: true, message: '请输入收益金额',trigger: 'blur'}
                ]
                ,
                expendAmount: [{}
                    ,{ required: true, message: '请输入花费金额',trigger: 'blur'}
                ]
                ,
                transId: [{}
                    ,{ required: true, message: '请输入外键 业务ID',trigger: 'blur'}
                ]
                ,
                flowTime: [{}
                    ,{ required: true, message: '请输入发生时间',trigger: 'blur'}
                ]
                ,
                bakTotleAmount: [{}
                    ,{ required: true, message: '请输入之前总账户收入金额',trigger: 'blur'}
                ]
                ,
                newTotleAmount: [{}
                    ,{ required: true, message: '请输入',trigger: 'blur'}
                ]
                ,
                status: [{}
                    ,{ required: true, message: '请输入0申请中 1已生效 2已失效',trigger: 'blur'}
                ]
                ,
                isValid: [{}
                    ,{ required: true, message: '请输入0 否 1是',trigger: 'blur'}
                ]
                ,
                nanoTime: [{}
                    ,{ required: true, message: '请输入',trigger: 'blur'}
                ]
                ,
                remark: [{}
                    ,{ required: true, message: '请输入',trigger: 'blur'}
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
                doPost('cap/capAccountFlow/save', this.form).then(res => {
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
                doPost('cap/capAccountFlow/update', this.form).then(res => {
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
                this.form = { id: '' ,accountId: '',custId: '',inOut: '',ioType: '',ioTypeName: '',transAmount: '',incomeAmount: '',expendAmount: '',transId: '',flowTime: '',bakTotleAmount: '',newTotleAmount: '',status: '',isValid: '',nanoTime: '',remark: '' }
            }
        }
    }
</script>

<style scoped>

</style>