const axios = require('axios');
export default {
  name: 'search',
  mounted() {},
  watch: {},
  data() {
    return {
      searchUrl: ''
    };
  },
  components: {},
  computed: {},
  methods: {
    search() {
      console.log(this.searchUrl);
    }
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
    erro(val) {
      this.$message(val);
    },
  },
};
