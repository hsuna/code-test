<template>
  <div class="head-container">
    <!-- <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button> -->
    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true">新增</el-button>
      <eForm ref="form" :dict-info-id="dictInfoId" :is-add="true"/>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import eForm from './form'
// 查询条件
export default {
  components: { eForm },
  props: {
    dictInfoId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      downloadLoading: false
    }
  },
  methods: {
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
