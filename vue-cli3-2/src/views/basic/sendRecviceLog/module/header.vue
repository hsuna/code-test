<template>
  <div class="head-container">
    <el-input v-model="query.code" clearable placeholder="输入业务编码" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>

    <el-input v-model="query.bizId" clearable placeholder="输入业务ID" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>

    <dict-select v-model="query.status" placeholder="请选择状态" no="Y00047" style="width: 200px;" class="filter-item" @change="change_status" />

    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>

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
