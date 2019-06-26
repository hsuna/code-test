<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
      <el-table-column prop="loginName" label="登录名"/>
      <!-- <el-table-column prop="password" label="密码"/> -->
      <el-table-column prop="realName" label="真实姓名"/>
      <el-table-column prop="phone" label="手机号"/>
      <el-table-column prop="email" label="邮箱"/>
      <el-table-column :show-overflow-tooltip="true" prop="type" width="90px" label="类型">
        <template slot-scope="scope">
          {{ scope.row.type==1 ? '个人' : '商家' }}
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="valid" width="90px" label="是否有效">
        <template slot-scope="scope">
          <el-tag :type="scope.row.valid ? 'success': 'warning' ">
            {{ scope.row.valid==1 ? '有效' : '无效' }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="tokenId" label="tokenid"/> -->
      <el-table-column prop="lastLoginTime" label="最后登录时间"/>
      <!-- <el-table-column prop="entry" label="随机加密字段"/> -->
      <!-- <el-table-column prop="createTime" label="创建时间"/> -->
      <!-- <el-table-column prop="updateTime" label="修改时间"/> -->
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit :data="scope.row" :sup_this="sup_this"/>
          <!-- <el-popover
            :ref="scope.row.id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" :disabled="scope.row.id === 1" type="danger" size="mini">删除</el-button>
          </el-popover> -->
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

export default {
  components: { eHeader, edit },
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
      this.url = '/cust/info/queryPage'
      const sort = 'id,desc'
      const query = this.query
      const loginName = query.loginName
      const realName = query.realName
      this.params = { page: this.page, size: this.size, sort: sort }
      if (loginName) { this.params['loginName'] = loginName }
      if (realName) { this.params['realName'] = realName }
      return true
    },
    subDelete(id) {
      this.delLoading = true
      doGet('/cust/info/delete?id=' + id).then(res => {
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
    }
  }
}
</script>
<style scoped>
</style>
