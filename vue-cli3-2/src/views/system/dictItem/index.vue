<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" style="margin-left: 50px;" title="字典项" width="1040px">
    <div class="app-container">
      <eHeader :dict-info-id="dictInfoId"/>
      <!--表格渲染-->
      <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
        <!-- <el-table-column prop="dictInfoId" label="字典外键ID"/> -->
        <el-table-column prop="dictKey" label="字典键值"/>
        <el-table-column prop="dictValue" label="键值名称"/>
        <el-table-column prop="remark" label="描述"/>
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
  </el-dialog>
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
      dialog: false, delLoading: false, sup_this: this, dictInfoId: ''
    }
  },
  created() {
    console.log('created')
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
      console.log(this.dictInfoId)
      // this.$refs.eHeader.dictInfoId = this.dictInfoId
      this.url = 'system/dictItem/queryPage'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort, dictInfoId: this.dictInfoId }
      return true
    },
    subDelete(id) {
      this.delLoading = true
      doGet('system/dictItem/delete?id=' + id).then(res => {
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
