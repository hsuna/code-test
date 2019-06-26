<template>
  <div class="head-container">
    <el-input v-model="query.batchCode" clearable placeholder="输入对账类别" style="width: 200px;" class="filter-item"
              @keyup.enter.native="toQuery"/>
    <el-input v-model="query.batchName" clearable placeholder="输入类别名称" style="width: 200px;" class="filter-item"
              @keyup.enter.native="toQuery"/>
    <dict-select v-model="query.state" placeholder="对账状态" no="Y00041" style="width: 200px;"
                 class="filter-item" @change="change_state"/>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
  </div>
</template>

<script>
  import {parseTime} from '@/utils/index'
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
      change_state(val) {
        this.query.state = val
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
