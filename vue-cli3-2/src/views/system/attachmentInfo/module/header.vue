<template>
  <div class="head-container">
    <el-input v-model="query.fileName" clearable placeholder="输入名称" style="width: 200px;" class="filter-item"
              @keyup.enter.native="toQuery"/>
    <el-input v-model="query.typeCode" clearable placeholder="输入类型编码" style="width: 200px;" class="filter-item"
              @keyup.enter.native="toQuery"/>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
  </div>
</template>

<script>
  import {parseTime} from '@/utils/index'
  import eForm from './form'
  // 查询条件
  export default {
    components: {eForm},
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
