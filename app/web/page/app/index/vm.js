const axios = require('axios');
export default {
  name: 'index',
  mounted() {},
  watch: {},
  data() {
    return {
      indexDate: [{ name: '首页', href: '/' }]
    };
  },
  components: {},
  computed: {},
  methods: {},
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
