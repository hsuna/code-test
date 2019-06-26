<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <el-table v-loading="loading" :data="formatedData" size="small" border style="width: 100%;">
      <el-table-column prop="casId" label="CP分"/>
      <el-table-column prop="channelId" label="渠道ID"/>
      <el-table-column prop="gameId" label="游戏ID"/>
      <el-table-column prop="parameterCode" label="渠道参数编码"/>
      <el-table-column prop="merchName" label="收款商户名称"/>
      <el-table-column prop="merchCustId" label="收款商户ID"/>
      <el-table-column prop="cooperativeMerch" label="合作商"/>
      <el-table-column prop="appId" label="appId"/>
      <el-table-column prop="secretKey" label="密钥"/>
      <el-table-column prop="seller" label="seller"/>
      <el-table-column prop="channelRate" label="通道费率"/>
      <el-table-column prop="incomeRate" label="收入比率"/>
      <el-table-column prop="signTypeName" label="加密方式"/>
      <el-table-column prop="statusName" label="状态"/>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column prop="updateTime" label="更新时间"/>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            :ref="scope.row.id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" :disabled="scope.row.id === 1" type="danger" size="mini">删除</el-button>
          </el-popover>
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
import edit from './module/edit'
import { doGet, doDictItem } from '@/utils/request'

export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      statusMap: [],
      delLoading: false, sup_this: this
    }
  },
  computed: {
    formatedData() {
      const data = []
      this.data.map(item => {
        this.statusMap.map(statusItem => {
          if (statusItem.id == item.status) {
            item.statusText = statusItem.label
          }
        })
        data.push(item)
      })
      return data
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
    doDictItem(`Y00046`).then(res => {
      this.statusMap = res
    })
  },
  methods: {
    parseTime,
    beforeInit() {
      this.url = 'basic/gatewayParameter/queryPage'
      this.params = this.query
      this.params.page = this.page
      this.params.size = this.size
      return true
    },
    subDelete(id) {
      this.delLoading = true
      doGet('basic/gatewayParameter/delete?id=' + id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err.response.data.msg)
      })
    }
  }
}
</script>
<style scoped>
</style>
