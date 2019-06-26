<template>
  <div class="head-container">
    <el-input v-model="query.code" clearable placeholder="编码" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-input v-model="query.name" clearable placeholder="名称" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <dict-select v-model="query.lev" placeholder="请选择类别" no="Y00008" style="width: 200px;" class="filter-item" @change="change_lev" />

    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">查询</el-button>
    <!-- 表格渲染 -->
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
// 查询
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
    change_lev(val) {
      this.query.lev = val
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
