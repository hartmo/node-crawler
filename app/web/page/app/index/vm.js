const axios = require('axios');
export default {
  name: 'index',
  mounted() {},
  watch: {},
  data() {
    return {
      search: 'http://www.biqujia.com/book/6/6750/',
    };
  },
  components: {},
  computed: {},
  methods: {
    searchFun() {
      this.$socket.emit('search', this.search);
    },
  },
  sockets: {
    connect() {
      console.log('socket connected');
    },
    res(val) {
      console.log('接收到服务端消息', val);
    },
    searchResult(val) {
      console.log('搜索结果：', val);
    },
  },
};
