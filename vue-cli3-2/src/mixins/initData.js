import { initData } from '@/api/data'

export default {
  data() {
    return {
      loading: true, data: [], page: 0, size: 10, total: 0, url: '', params: {}, query: {}, time: 170
    }
  },
  methods: {
    async init() {
      if (!await this.beforeInit()) {
        return
      }
      return new Promise((resolve, reject) => {
        this.loading = true
        initData(this.url, this.params).then(res => {
          if (res.data === undefined || res.data === null || res.data === '') {
            this.total = res.totalElements
            this.data = res.dataList
          } else {
            var data = res.data
            this.total = data.totalElements
            this.data = data.content
          }
          setTimeout(() => {
            this.loading = false
          }, this.time)
          resolve(data);
        }).catch(err => {
          this.loading = false
          reject(err)
        })
      })
    },
    beforeInit() {
      return true
    },
    afterInit() {
      return true
    },
    pageChange(e) {
      this.page = e - 1
      this.init()
    },
    sizeChange(e) {
      this.page = 0
      this.size = e
      this.init()
    }
  }
}
