<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <el-table v-loading="loading"  :data="data" size="small" border style="width: 100%;">
      <el-table-column prop="realName" label="客户姓名"/>
      <el-table-column prop="phone" label="电话"/>
      <el-table-column prop="totleAmount" label="总金额(元)"/>
      <el-table-column prop="frozenAmount" label="冻结金额(元)"/>
      <el-table-column prop="balanceAmount" label="可用余额(元)"/>
      <el-table-column prop="statusName" label="状态"/>
      <el-table-column prop="updateTime" label="最后更新时间"/>
      <el-table-column label="操作" width="250px" align="center">
        <template slot-scope="scope">
          <el-button slot="reference" size="mini" @click="changeStatus(scope.row.id)">
            <span v-if="scope.row.status == 1">停用</span>
            <span v-if="scope.row.status == 0">启用</span>
            </el-button>
          <el-button size="mini" @click="viewFlow(scope.row.id)">账户流水</el-button>
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
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import { doGet,doPost} from '@/utils/request'
import Item from './../capAccountFlow/index'

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
    parseTime,
    viewFlow(id){
      this.$refs.item.accountId = id
      this.$refs.item.dialog = true
      this.$refs.item.doInit()
    },
    changeStatus(id){
      let url  = 'cap/capAccount/updateStatus?id='+id;
      doPost(url).then(res => {
        this.loading = true;
        this.$notify({
          title: '操作成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.init()
      }).catch(err => {
        this.loading = false
        console.log(err.msg)
      })
    },
    beforeInit() {
      this.url = 'cap/capAccount/queryPage'
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
