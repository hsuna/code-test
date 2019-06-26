<template>
  <div class="head-container">
    <el-input v-model="query.channelId" clearable placeholder="输入渠道ID" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>

    <el-input v-model="query.merchCustId" clearable placeholder="输入收款商户ID" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>

    <dict-select v-model="query.status" placeholder="请选择状态" no="Y00046" style="width: 200px;" class="filter-item" @change="change_status" />
    <el-date-picker v-model="query.createTime1" clearable placeholder="注册起始时间" style="width: 200px;" value-format="yyyy-MM-dd" format="yyyy-MM-dd" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-date-picker v-model="query.createTime2" clearable placeholder="注册截止时间" style="width: 200px;" value-format="yyyy-MM-dd" format="yyyy-MM-dd" class="filter-item" @keyup.enter.native="toQuery"/>

    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true">新增</el-button>
      <eForm ref="form" :is-add="true"/>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import eForm from './form'
import DictSelect from '../../../components/DictSelect'
// 查询条件
export default {
  components: { eForm, DictSelect },
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
    change_status(val) {
      this.query.status = val
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
