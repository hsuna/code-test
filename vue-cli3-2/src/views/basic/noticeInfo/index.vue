<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
      <el-table-column prop="title" label="消息标题"/>
      <el-table-column prop="content" label="消息内容"/>
      <el-table-column prop="statusName" label="状态"/>
      <el-table-column label="操作" width="250px" align="center">
        <template slot-scope="scope">
          <edit :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            :ref="scope.row.id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定
              </el-button>
            </div>
            <el-button slot="reference" :disabled="scope.row.id === 1" type="danger" size="mini">删除</el-button>
          </el-popover>
          <span v-if="scope.row.status != 1"><el-button  @click="doPush(scope.row.id)" type="primary" size="mini">推送</el-button></span>
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
  import edit from './module/edit'
  import {doDictItem, doGet, doPost} from '@/utils/request'


  export default {
    components: {eHeader, edit},
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
      doPush(id){
        doPost('basic/noticeInfo/doPush?id=' + id).then(res => {
          this.delLoading = false
          this.init()
          this.$notify({
            title: '推送成功',
            type: 'success',
            duration: 2500
          })
        }).catch(err => {
          this.delLoading = false
          console.log(err.msg)
          alert(err.msg)
        })
      },
      parseTime,
      beforeInit() {
        this.url = 'basic/noticeInfo/queryPage'
        this.params = this.query
        this.params.page = this.page
        this.params.size = this.size
        return true
      },
      subDelete(id) {
        this.delLoading = true
        doPost('basic/noticeInfo/delete?id=' + id).then(res => {
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
          console.log(err.msg)
          alert(err.msg)
        })
      }
    }
  }
</script>
<style scoped>
</style>
