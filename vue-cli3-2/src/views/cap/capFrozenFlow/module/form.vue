<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增冻结流水' : '编辑冻结流水'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="66px">
                    <el-form-item label="资金账户表id" prop="accountId">
                        <el-input v-model="form.accountId" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="用户id" prop="custId">
                        <el-input v-model="form.custId" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="" prop="frozenId">
                        <el-input v-model="form.frozenId" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="" prop="inOut">
                        <el-input v-model="form.inOut" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="" prop="type">
                        <el-input v-model="form.type" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="支出金额" prop="amount">
                        <el-input v-model="form.amount" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="" prop="relCode">
                        <el-input v-model="form.relCode" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="" prop="relId">
                        <el-input v-model="form.relId" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="说明" prop="remark">
                        <el-input v-model="form.remark" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="" prop="inAmount">
                        <el-input v-model="form.inAmount" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="" prop="outAmount">
                        <el-input v-model="form.outAmount" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="0申请中 1已冻结" prop="status">
                        <el-input v-model="form.status" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="" prop="oldFrozen">
                        <el-input v-model="form.oldFrozen" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="" prop="newFrozen">
                        <el-input v-model="form.newFrozen" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="0无效1有效，全部默认有效" prop="isValid">
                        <el-input v-model="form.isValid" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="" prop="nanoTime">
                        <el-input v-model="form.nanoTime" style="width: 370px;"/>
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
                form: { id: '' ,accountId: '',custId: '',frozenId: '',inOut: '',type: '',amount: '',relCode: '',relId: '',remark: '',inAmount: '',outAmount: '',status: '',oldFrozen: '',newFrozen: '',isValid: '',nanoTime: '' },
            rules: {
                
                accountId: [{}
                    ,{ required: true, message: '请输入资金账户表id',trigger: 'blur'}
                ]
                ,
                custId: [{}
                    ,{ required: true, message: '请输入用户id',trigger: 'blur'}
                ]
                ,
                frozenId: [{}
                    ,{ required: true, message: '请输入',trigger: 'blur'}
                ]
                ,
                inOut: [{}
                    ,{ required: true, message: '请输入',trigger: 'blur'}
                ]
                ,
                type: [{}
                    ,{ required: true, message: '请输入',trigger: 'blur'}
                ]
                ,
                amount: [{}
                    ,{ required: true, message: '请输入支出金额',trigger: 'blur'}
                ]
                ,
                relCode: [{}
                    ,{ required: true, message: '请输入',trigger: 'blur'}
                ]
                ,
                relId: [{}
                    ,{ required: true, message: '请输入',trigger: 'blur'}
                ]
                ,
                remark: [{}
                    ,{ required: true, message: '请输入说明',trigger: 'blur'}
                ]
                ,
                inAmount: [{}
                    ,{ required: true, message: '请输入',trigger: 'blur'}
                ]
                ,
                outAmount: [{}
                    ,{ required: true, message: '请输入',trigger: 'blur'}
                ]
                ,
                status: [{}
                    ,{ required: true, message: '请输入0申请中 1已冻结',trigger: 'blur'}
                ]
                ,
                oldFrozen: [{}
                    ,{ required: true, message: '请输入',trigger: 'blur'}
                ]
                ,
                newFrozen: [{}
                    ,{ required: true, message: '请输入',trigger: 'blur'}
                ]
                ,
                isValid: [{}
                    ,{ required: true, message: '请输入0无效1有效，全部默认有效',trigger: 'blur'}
                ]
                ,
                nanoTime: [{}
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
                doPost('cap/capFrozenFlow/save', this.form).then(res => {
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
                doPost('cap/capFrozenFlow/update', this.form).then(res => {
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
                this.form = { id: '' ,accountId: '',custId: '',frozenId: '',inOut: '',type: '',amount: '',relCode: '',relId: '',remark: '',inAmount: '',outAmount: '',status: '',oldFrozen: '',newFrozen: '',isValid: '',nanoTime: '' }
            }
        }
    }
</script>

<style scoped>

</style>