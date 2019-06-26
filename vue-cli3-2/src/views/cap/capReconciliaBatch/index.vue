<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
      <el-table-column prop="batchCode" label="对账类别"/>
      <el-table-column prop="batchName" label="类别名称"/>
      <el-table-column prop="startTime" label="开始时间"/>
      <el-table-column prop="endTime" label="结束时间"/>
      <el-table-column prop="stateName" label="状态"/>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column prop="updateTime" label="更新时间"/>
      <el-table-column prop="errorMsg" label="错误信息"/>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="goItem(scope.row.id)">对账明细</el-button>
          <Item ref="item"/>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>
</template>

<script>
  import initData from '@/mixins/initData'
  import {parseTime} from '@/utils/index'
  import eHeader from './module/header'
  import {doGet} from '@/utils/request'
  import Item from './../capReconciliaAccount/index'


  export default {
    components: {eHeader,Item},
    mixins: [initData],
    data() {
      return {
        stateMap: [],
        delLoading: false, sup_this: this
      }
    },
    created() {
      this.$nextTick(() => {
        this.init()
      })
    },
    methods: {
      parseTime,
      beforeInit() {
        this.url = 'cap/capReconciliaBatch/queryPage'
        this.params = this.query
        this.params.page = this.page
        this.params.size = this.size
        return true
      },
      goItem(id) {
        this.$refs.item.batchId = id
        this.$refs.item.dialog = true
        this.$refs.item.doInit()
      }
    }
  }
</script>
<style scoped>
</style>
