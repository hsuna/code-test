<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <el-table v-loading="loading" :data="formatedData" size="small" border style="width: 100%;">
      <el-table-column prop="phone" label="手机号"/>
      <el-table-column prop="templateName" label="模板类型"/>
      <el-table-column prop="statusText" label="状态"/>
      <el-table-column prop="content" min_width="50%;" label="短信内容"/>
      <el-table-column prop="sendTime" label="发送时间"/>
      <el-table-column prop="errorMsg" label="返回信息"/>
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
    doDictItem(`Y00012`).then(res => {
      this.statusMap = res
    })
  },
  methods: {
    parseTime,
    beforeInit() {
      this.url = 'basic/smsMessage/queryPage'
      this.params = this.query
      this.params.page = this.page
      this.params.size = this.size
      return true
    },
    subDelete(id) {
      this.delLoading = true
      doGet('basic/smsMessage/delete?id=' + id).then(res => {
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
