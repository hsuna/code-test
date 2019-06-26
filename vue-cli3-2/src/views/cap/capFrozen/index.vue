<template>
  <div class="app-container">
    <eHeader  :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
      <el-table-column prop="realName" label="客户姓名"/>
      <el-table-column prop="phone" label="电话"/>
      <el-table-column prop="frozenType" label="冻结类型"/>
      <el-table-column prop="frozenAmount" label="冻结金额(元)"/>
      <el-table-column prop="frozenTime" label="冻结时间"/>
      <el-table-column prop="frozenExplain" label="冻结摘要"/>
      <el-table-column prop="unfrozenTime" label="解冻时间"/>
      <el-table-column prop="unfrozenExplain" label="解冻摘要"/>
      <el-table-column prop="statusName" label="冻结状态"/>
      <el-table-column prop="isValidName" label="有效状态"/>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="viewFlow(scope.row.id)">查看明细</el-button>
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
import eHeader from './module/header'
import { doGet } from '@/utils/request'
import Item from './../capFrozenFlow/index'



export default {
  components: { eHeader,Item},
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    viewFlow(id){
      this.$refs.item.frozenId = id
      this.$refs.item.dialog = true
      this.$refs.item.doInit()
    },
    beforeInit() {
      this.url = 'cap/capFrozen/queryPage'
      this.params = this.query
      this.params.page = this.page
      this.params.size = this.size
      return true
    }
  }
}
</script>
<style scoped>
</style>
