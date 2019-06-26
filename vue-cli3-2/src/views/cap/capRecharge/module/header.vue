<template>
    <div class="head-container">
      <el-input v-model="query.realName" clearable placeholder="输入客户姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <el-input v-model="query.phone" clearable placeholder="输入客户电话" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <dict-select v-model="query.status"  placeholder="选择充值状态" no="Y00030"  style="width: 200px;" class="filter-item" @change="change_status" />
      <el-input v-model="query.tradeNo" clearable placeholder="输入流水号" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <el-date-picker v-model="query.applyStartTime" clearable placeholder="输入申请起始时间"  value-format="yyyy-MM-dd" format="yyyy-MM-dd" ></el-date-picker>
      <el-date-picker v-model="query.applyEndTime"  clearable placeholder="输入申请截止时间" value-format="yyyy-MM-dd" format="yyyy-MM-dd" ></el-date-picker>
      <el-date-picker v-model="query.finishStartTime" clearable placeholder="输入到账起始时间" value-format="yyyy-MM-dd" format="yyyy-MM-dd" ></el-date-picker>
      <el-date-picker v-model="query.finishEndTime" clearable placeholder="输入到账截止时间"  value-format="yyyy-MM-dd" format="yyyy-MM-dd" ></el-date-picker>
        <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
    </div>
</template>

<script>
    import { parseTime } from '@/utils/index'
    import DictSelect from '../../../components/DictSelect'
    // 查询条件
    export default {
        components: {DictSelect},
        props: {
            query: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                downloadLoading: false
            }
        },
        methods: {
          change_status(val){
            this.query.status = val;
          },
            toQuery() {
                this.$parent.page = 0
                this.$parent.init()
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'createTime') {
                    return parseTime(v[j])
                } else {
                    return v[j]
                }
            }))
            }
        }
    }
</script>
