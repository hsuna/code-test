<template>
  <div class="app-container">
    <eHeader :roles="roles" :menus="menus" :query="query"/>
    <!--表格渲染-->
    <tree-table v-loading="loading" :data="data" :expand-all="true" :columns="columns" border size="small">
      <!--<el-table-column prop="name" label="名称"/>-->
      <el-table-column prop="code" label="编码"/>
      <el-table-column prop="fileFormat" label="允许上传的文件格式"/>
      <el-table-column prop="lev" align="center" width="100px" label="层级">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.lev }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="创建日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit :roles="roles" :menus="menus" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            :ref="scope.row.id"
            placement="top"
            width="200">
            <p>确定删除吗,如果存在下级节点则一并删除，此操作不能撤销！</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
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
import { del, getAttachmentTypeTree } from '@/api/attach'
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
      this.url = 'system/attachmentType/queryPage'
      const sort = 'id,desc'
      const query = this.query
      const value = query.value
      this.params = { page: this.page, size: this.size, sort: sort }
      if (value) { this.params['name'] = value }
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
      getAttachmentTypeTree().then(res => {
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
