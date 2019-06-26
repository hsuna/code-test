<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增冻结流水' : '编辑冻结流水'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="66px">
                    <el-form-item label="资金账户表id" prop="accountId">
                        <el-input v-model="form.accountId" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="用户id" prop="custId">
                        <el-input v-model="form.custId" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="" prop="frozenType">
                        <el-input v-model="form.frozenType" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="" prop="frozenAmount">
                        <el-input v-model="form.frozenAmount" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="" prop="frozenCode">
                        <el-input v-model="form.frozenCode" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="" prop="frozenRel">
                        <el-input v-model="form.frozenRel" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="" prop="frozenExplain">
                        <el-input v-model="form.frozenExplain" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="" prop="frozenTime">
                        <el-input v-model="form.frozenTime" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="" prop="unfrozenCode">
                        <el-input v-model="form.unfrozenCode" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="" prop="unfrozenRel">
                        <el-input v-model="form.unfrozenRel" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="" prop="unfrozenTime">
                        <el-input v-model="form.unfrozenTime" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="" prop="unfrozenExplain">
                        <el-input v-model="form.unfrozenExplain" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="1冻结 2解冻" prop="status">
                        <el-input v-model="form.status" style="width: 370px;"/>
                    </el-form-item>

                    <el-form-item label="0无效1有效，全部默认有效" prop="isValid">
                        <el-input v-model="form.isValid" style="width: 370px;"/>
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
                form: { id: '' ,accountId: '',custId: '',frozenType: '',frozenAmount: '',frozenCode: '',frozenRel: '',frozenExplain: '',frozenTime: '',unfrozenCode: '',unfrozenRel: '',unfrozenTime: '',unfrozenExplain: '',status: '',isValid: '' },
            rules: {
                
                accountId: [{}
                    ,{ required: true, message: '请输入资金账户表id',trigger: 'blur'}
                ]
                ,
                custId: [{}
                    ,{ required: true, message: '请输入用户id',trigger: 'blur'}
                ]
                ,
                frozenType: [{}
                    ,{ required: true, message: '请输入',trigger: 'blur'}
                ]
                ,
                frozenAmount: [{}
                    ,{ required: true, message: '请输入',trigger: 'blur'}
                ]
                ,
                frozenCode: [{}
                    ,{ required: true, message: '请输入',trigger: 'blur'}
                ]
                ,
                frozenRel: [{}
                    ,{ required: true, message: '请输入',trigger: 'blur'}
                ]
                ,
                frozenExplain: [{}
                    ,{ required: true, message: '请输入',trigger: 'blur'}
                ]
                ,
                frozenTime: [{}
                    ,{ required: true, message: '请输入',trigger: 'blur'}
                ]
                ,
                unfrozenCode: [{}
                    ,{ required: true, message: '请输入',trigger: 'blur'}
                ]
                ,
                unfrozenRel: [{}
                    ,{ required: true, message: '请输入',trigger: 'blur'}
                ]
                ,
                unfrozenTime: [{}
                    ,{ required: true, message: '请输入',trigger: 'blur'}
                ]
                ,
                unfrozenExplain: [{}
                    ,{ required: true, message: '请输入',trigger: 'blur'}
                ]
                ,
                status: [{}
                    ,{ required: true, message: '请输入1冻结 2解冻',trigger: 'blur'}
                ]
                ,
                isValid: [{}
                    ,{ required: true, message: '请输入0无效1有效，全部默认有效',trigger: 'blur'}
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
                doPost('cap/capFrozen/save', this.form).then(res => {
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
                doPost('cap/capFrozen/update', this.form).then(res => {
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
                this.form = { id: '' ,accountId: '',custId: '',frozenType: '',frozenAmount: '',frozenCode: '',frozenRel: '',frozenExplain: '',frozenTime: '',unfrozenCode: '',unfrozenRel: '',unfrozenTime: '',unfrozenExplain: '',status: '',isValid: '' }
            }
        }
    }
</script>

<style scoped>

</style>