<template>
  <div class="head-container">
    <el-input v-model="query.realName" clearable placeholder="输入客户姓名" style="width: 200px;" class="filter-item"
              @keyup.enter.native="toQuery"/>
    <el-input v-model="query.phone" clearable placeholder="输入客户电话" style="width: 200px;" class="filter-item"
              @keyup.enter.native="toQuery"/>
    <dict-select v-model="query.status" placeholder="状态" no="Y00041" style="width: 200px;"
                 class="filter-item" @change="change_status"/>
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
      change_status(val) {
        this.query.status = val
      },
      toQuery() {
        this.$parent.$parent.page = 0
        this.$parent.$parent.doInit()
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
