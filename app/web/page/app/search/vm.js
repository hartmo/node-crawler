const axios = require('axios');
export default {
  name: 'search',
  mounted() {},
  data() {
    return {
      searchUrl: 'http://www.biquge.com.tw/1_1904/',
      searchLoading: false,
      booklist: [],
      dialogVisible: {
        show: false,
        book: {
          errorList: [],
          successList: []
        }
      }
    };
  },
  components: {},
  watch: {
    booklist: {
      handler(newValue, oldValue) {
        newValue.forEach(res => {
          if (res.id === this.dialogVisible.book.id) {
            this.dialogVisible.book = res;
          }
        });
      },
      deep: true
    }
  },
  computed: {},
  methods: {
    search() {
      this.searchLoading = true;
      this.$socket.emit('book/search', this.searchUrl);
    },
    /**
     * 获取章节信息列表
     * @param {Object} item
     */
    showChapter(item) {
      this.dialogVisible = { show: true, book: item };
    },
    /**
     * 进度
     * @param {String} item
     */
    progress(item) {
      const progress = {};
      progress.num = Number(
        (Number(item.errorList.length) + Number(item.successList.length)) /
                    Number(item.listLength) *
                    100
      ).toFixed(2);
      progress.num = Number(progress.num);
      item.status = Number(progress.num) === 100 ? 1 : 0;
      return progress;
    }
  },
  sockets: {
    searchSuccess(val) {
      this.searchLoading = false;
      let checked = false;
      val.successList = val.successList || [];
      val.errorList = val.errorList || [];
      this.booklist.forEach(res => {
        if (res.name === val.name) {
          checked = true;
          res.status = 1;
        }
      });
      if (!checked) {
        this.booklist.push(val);
      }
    },
    /**
     * 获取章节成功
     * @param {Object} val
     */
    chapterSuccess(val) {
      const checked = false;
      this.booklist.forEach(res => {
        if (res.id === val.data.bookid) {
          res.successList.splice(0, 0, val);
        }
      });
    },
    /**
     * 获取章节失败
     * @param {Object} val
     */
    chapterErr(val) {
      this.booklist.forEach(res => {
        if (res.id === val.data.bookid) {
          res.errorList.splice(0, 0, val);
        }
      });
    },
    search(val) {
      console.log(val);
    },
    error(val) {
      this.searchLoading = false;
      console.log(val);
    }
  }
};
