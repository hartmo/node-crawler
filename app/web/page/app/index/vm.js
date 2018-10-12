const axios = require('axios');
export default {
  name: 'index',
  mounted() {},
  watch: {},
  data() {
    return {
    };
  },
  components: {},
  computed: {
    indexDate() {
      return this.$router.options.routes;
    }
  },
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
