<template>
  <div class="app-container">
    <eHeader  :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
            <el-table-column prop="name" label="位置名称"/>
      <el-table-column prop="code" label="编码"/>
      <el-table-column prop="advCnt" label="广告数量"/>
      <el-table-column prop="status" label="状态">
         <template slot-scope="scope">
          <el-tag >{{ scope.row.status==1 ? '有效' : '无效' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"/>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column prop="updateTime" label="更新时间"/>
      <el-table-column label="操作" width="300px" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="goItem(scope.row.id)">广告配置</el-button>
          <Item ref="item"/>
          <edit  :data="scope.row" :sup_this="sup_this"/>
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
import { doGet } from '@/utils/request'
import Item from './../advertisingDeatil/index'

export default {
  components: { eHeader, edit,Item },
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
    beforeInit() {
      this.url = 'basic/advertisingInfo/queryPage'
      const sort = 'id,desc'
      const query = this.query
      const name = query.name
      const  code = query.code
      this.params = { page: this.page, size: this.size, sort: sort }
      if (name) { this.params['name'] = name }
      if(code) {this.params['code'] = code}
      return true
    },
    subDelete(id) {
      this.delLoading = true
      doGet('basic/advertisingInfo/delete?id=' + id).then(data => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(res => {
        this.delLoading = false
        this.$refs[id].doClose()
      })
    },
    goItem(id){
      this.$refs.item.advInfoId = id
      this.$refs.item.dialog = true
      this.$refs.item.doInit()
    }
  }
}
</script>
<style scoped>
</style>
