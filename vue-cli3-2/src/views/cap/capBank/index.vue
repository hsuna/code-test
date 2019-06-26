<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
      <el-table-column prop="realName" label="客户姓名"/>
      <el-table-column prop="phone" label="电话"/>
      <el-table-column prop="bankCard" label="银行卡号"/>
      <el-table-column prop="bankName" label="银行名称"/>
      <el-table-column prop="bankUserName" label="户名"/>
      <el-table-column prop="isDefautlName" label="是否主卡"/>
      <el-table-column prop="isValidName" label="状态"/>
      <el-table-column prop="bankSubName" label="支行全名"/>
      <el-table-column prop="mobilePhone" label="预留手机"/>
      <el-table-column prop="updateTime" label="更新时间"/>
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
  import eHeader from './module/header'
  import {doGet} from '@/utils/request'

  export default {
    components: {eHeader},
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
      beforeInit() {
        this.url = 'cap/capBank/queryPage'
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
