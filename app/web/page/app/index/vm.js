const axios = require('axios');
export default {
  name: 'index',
  mounted() {},
  watch: {},
  data() {
    return {
      search: 'http://www.biqujia.com/book/6/6750/',
      editableTabsValue: '1',
      editableTabs: [{
        title: '新小说',
        name: '1',
        content: [],
        bookId: 0,
      }],
      tabIndex: 2,
    };
  },
  components: {},
  computed: {},
  methods: {
    searchFun() {
      this.$socket.emit('search', this.search);
    },
    handleTabsEdit(targetName, action, book) {
      if (action === 'add') {
        const newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: book.bookname ? book.bookname : '新小说',
          name: newTabName,
          content: [],
          bookId: book.bookId,
        });
        this.editableTabsValue = newTabName;
      }
      if (action === 'remove') {
        const tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              const nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
      }
    },
  },
  sockets: {
    connect() {
      this.$message({
        message: '链接成功',
        type: 'success',
      });
    },
    res(val) {
      this.$message({
        message: val,
        type: 'success',
      });
    },
    searchResult(val) {
      this.editableTabs = this.editableTabs.map((res) => {
        if (res.bookId === val.bookId) {
          res.content.push(val);
        }
        return res;
      });
    },
    searchBook(val) {
      if (val.status > -2) {
        let checked = true;
        this.editableTabs.forEach((res) => {
          if (res.bookId === val.bookId) {
            checked = false;
          }
        });
        if (checked) {
          this.handleTabsEdit(null, 'add', val);
        }
      } else {
        this.$message({
          message: val.msg,
          type: 'success',
        });
      }
    },
    erro(val) {
      this.$message(val);
    },
    erro1(val) {
      console.log(val);
    },
  },
};
