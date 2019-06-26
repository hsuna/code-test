<template>
  <div class="app-container">
    <eHeader :query="query" :menus="menus" :roles="roles" />
    <!--表格渲染-->
    <tree-table v-loading="loading" :data="data" :expand-all="true" :columns="columns" size="small" border style="width: 100%;">
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="code" label="编码"/>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column prop="updateTime" label="更新时间"/>
      <el-table-column label="操作" width="400px" align="center">
        <template slot-scope="scope">
          <edit :data="scope.row" :sup_this="sup_this" :menus="menus"/>
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
    </tree-table>
  </div>
</template>

<script>

import { getRoleTree } from '@/api/role'
import treeTable from '@/components/TreeTable'
import initData from '@/mixins/initData'
import { del, getChannelInfoTree } from '@/api/channelInfo'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'

export default {
  components: { eHeader, edit, treeTable },
  mixins: [initData],
  data() {
    return {
      columns: [
        {
          text: '名称',
          value: 'name'
        }
      ],
      delLoading: false, sup_this: this, menus: [], roles: []
    }
  },
  created() {
    this.getRoles()
    this.meuns()
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    beforeInit() {
      this.url = 'basic/channelInfo/queryPage'
      const sort = 'id,desc'
      const query = this.query
      const name = query.name
      this.params = { page: this.page, size: this.size, sort: sort }
      if (name) { this.params['name'] = name }
      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
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
        console.log(err.response.data.message)
      })
    },
    meuns() {
      getChannelInfoTree().then(res => {
        this.menus = []
        this.menus.push(res.data)
      })
    },
    getRoles() {
      this.roles = []
      getRoleTree().then(res => {
        this.roles = res.data
      })
    }
  }
}
</script>
<style scoped>
</style>
