var listMixin = {
  data() {
    return {
      isLoading: false,
      isFinish: false,
      isRefresh: false,
      params: {
        page: 1,
        limit: 20,
      },
      list: [],
    }
  },
  methods: {
    // 下拉刷新
    onRefresh(e) {
      this.list = []
      this.params.page = 1
      this.isFinish = false
    },
    //上拉加载
    onLoad(e) {
      this.isLoading = true
      this.getList()
    },
    // 针对list进行处理
    dealDataToList(data) {
      this.isLoading = false
      this.isRefresh = false
      if (
        data.data.length < this.params.limit ||
        this.params.limit == data.count
      ) {
        this.isFinish = true
      }
      this.list = [...this.list, ...data.data]
    },
  },
}

export default listMixin
