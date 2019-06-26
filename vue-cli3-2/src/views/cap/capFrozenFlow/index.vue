<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" style="margin-left: 50px;" title="账户流水" width="1040px">
    <div class="app-container">
      <eHeader :query="query"/>
      <!--表格渲染-->
      <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
        <el-table-column prop="inOutName" label="收支类型"/>
        <el-table-column prop="type" label="类型"/>
        <el-table-column prop="inAmount" label="收入金额(元)"/>
        <el-table-column prop="outAmount" label="支出金额(元)"/>
        <el-table-column prop="statusName" label="状态"/>
        <el-table-column prop="isValid" label="有效状态"/>
        <el-table-column prop="oldFrozen" label="历史冻结金额(元)"/>
        <el-table-column prop="newFrozen" label="目前冻结金额(元)"/>
        <el-table-column prop="remark" label="摘要"/>
        <el-table-column prop="createTime" label="创建时间"/>
      </el-table>
      <!--分页组件-->
      <el-pagination
        :total="total"
        style="margin-top: 8px;"
        layout="total, prev, pager, next, sizes"
        @size-change="sizeChange"
        @current-change="pageChange"/>
    </div>
  </el-dialog>
</template>
<script>
  import initData from '@/mixins/initData'
  import {parseTime} from '@/utils/index'
  import {doGet} from '@/utils/request'

  export default {
    components: {},
    mixins: [initData],
    data() {
      return {
        delLoading: false, sup_this: this, frozenId: '', dialog: false
      }
    },
    created() {
      this.$nextTick(() => {
        this.init()
      })
    },
    methods: {
      parseTime,
      doInit() {
        this.$nextTick(() => {
          this.init()
        })
      },
      beforeInit() {
        this.url = 'cap/capFrozenFlow/queryPage'
        this.params = {page: this.page, size: this.size, frozenId: this.frozenId}
        return true
      }
    }
  }
</script>
<style scoped>
</style>
