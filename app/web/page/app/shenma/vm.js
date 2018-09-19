const axios = require('axios');
export default {
  name: 'shenma',
  mounted() {},
  watch: {},
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {
    searchFun() {
      this.$socket.emit('search', this.search);
    },
  },
  sockets: {
    shenma(val) {
      this.$message({
        message: val,
        type: 'success',
      });
    },
  },
};
