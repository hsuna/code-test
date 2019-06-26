<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增提现明细' : '编辑提现明细'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="66px">
                    <el-form-item label="资金账户表id" prop="accountId">
                        <el-input v-model="form.accountId" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="用户id" prop="custId">
                        <el-input v-model="form.custId" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="提现金额" prop="extractAmount">
                        <el-input v-model="form.extractAmount" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="提现手续费" prop="feeAmount">
                        <el-input v-model="form.feeAmount" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="实际金额" prop="orderAmount">
                        <el-input v-model="form.orderAmount" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="虚拟货币类型" prop="idealType">
                        <el-input v-model="form.idealType" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="虚拟货币汇率" prop="idealBaseAmt">
                        <el-input v-model="form.idealBaseAmt" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="虚拟账号" prop="idealCardNo">
                        <el-input v-model="form.idealCardNo" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="虚拟货币数量" prop="payAmt">
                        <el-input v-model="form.payAmt" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="状态（0申请中 1处理中，2 提现成功 3 提现失败，4不明确）" prop="status">
                        <el-input v-model="form.status" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="失败原因" prop="errorMsg">
                        <el-input v-model="form.errorMsg" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="平台类型 体现平台" prop="clientType">
                        <el-input v-model="form.clientType" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="申请时间" prop="applyTime">
                        <el-input v-model="form.applyTime" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="成功时间" prop="accountTime">
                        <el-input v-model="form.accountTime" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="操作人ID" prop="operUserId">
                        <el-input v-model="form.operUserId" style="width: 370px;"/>
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
                form: { id: '' ,accountId: '',custId: '',extractAmount: '',feeAmount: '',orderAmount: '',idealType: '',idealBaseAmt: '',idealCardNo: '',payAmt: '',status: '',errorMsg: '',clientType: '',applyTime: '',accountTime: '',operUserId: '' },
            rules: {
                
                accountId: [{}
                    ,{ required: true, message: '请输入资金账户表id',trigger: 'blur'}
                ]
                ,
                custId: [{}
                    ,{ required: true, message: '请输入用户id',trigger: 'blur'}
                ]
                ,
                extractAmount: [{}
                    ,{ required: true, message: '请输入提现金额',trigger: 'blur'}
                ]
                ,
                feeAmount: [{}
                    ,{ required: true, message: '请输入提现手续费',trigger: 'blur'}
                ]
                ,
                orderAmount: [{}
                    ,{ required: true, message: '请输入实际金额',trigger: 'blur'}
                ]
                ,
                idealType: [{}
                    ,{ required: true, message: '请输入虚拟货币类型',trigger: 'blur'}
                ]
                ,
                idealBaseAmt: [{}
                    ,{ required: true, message: '请输入虚拟货币汇率',trigger: 'blur'}
                ]
                ,
                idealCardNo: [{}
                    ,{ required: true, message: '请输入虚拟账号',trigger: 'blur'}
                ]
                ,
                payAmt: [{}
                    ,{ required: true, message: '请输入虚拟货币数量',trigger: 'blur'}
                ]
                ,
                status: [{}
                    ,{ required: true, message: '请输入状态（0申请中 1处理中，2 提现成功 3 提现失败，4不明确）',trigger: 'blur'}
                ]
                ,
                errorMsg: [{}
                    ,{ required: true, message: '请输入失败原因',trigger: 'blur'}
                ]
                ,
                clientType: [{}
                    ,{ required: true, message: '请输入平台类型 体现平台',trigger: 'blur'}
                ]
                ,
                applyTime: [{}
                    ,{ required: true, message: '请输入申请时间',trigger: 'blur'}
                ]
                ,
                accountTime: [{}
                    ,{ required: true, message: '请输入成功时间',trigger: 'blur'}
                ]
                ,
                operUserId: [{}
                    ,{ required: true, message: '请输入操作人ID',trigger: 'blur'}
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
                doPost('cap/capExtract/save', this.form).then(res => {
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
                doPost('cap/capExtract/update', this.form).then(res => {
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
                this.form = { id: '' ,accountId: '',custId: '',extractAmount: '',feeAmount: '',orderAmount: '',idealType: '',idealBaseAmt: '',idealCardNo: '',payAmt: '',status: '',errorMsg: '',clientType: '',applyTime: '',accountTime: '',operUserId: '' }
            }
        }
    }
</script>

<style scoped>

</style>