<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
      <el-table-column prop="fileName" label="文件名称"/>
      <el-table-column prop="typeCode" label="类型编码"/>
      <el-table-column label="文件">

        <template slot-scope="scope">
          <a :href="scope.row.fileUrl" download="">
            <img :src="scope.row.fileUrl" class="el-avatar">
          </a>
        </template>

      </el-table-column>
      <!--<el-table-column prop="fileUrl" label="文件地址"/>-->
      <el-table-column prop="fileSize" label="文件大小"/>
      <el-table-column prop="fileSuffix" label="文件后缀"/>
      <el-table-column prop="bizId" label="业务Id"/>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column prop="updateTime" label="更新时间"/>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit :data="scope.row" :sup_this="sup_this"/>
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
  import {doGet} from '@/utils/request'


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
      parseTime,
      beforeInit() {
        this.url = 'system/attachmentInfo/queryPage'
        const sort = 'id,desc'
        const query = this.query
        this.params = {page: this.page, size: this.size, sort: sort}
        if (query.fileName) {
          this.params['fileName'] = query.fileName
        }
        if (query.typeCode) {
          this.params['typeCode'] = query.typeCode
        }
        return true
      },
      subDelete(id) {
        this.delLoading = true
        doGet('system/attachmentInfo/delete?id=' + id).then(res => {
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
