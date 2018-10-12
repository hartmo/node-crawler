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
      this.$socket.emit('search', this.searchUrl);
    }
  },
  sockets: {
    searchSuccess(msg) {
      console.log(msg);
      // this.$message({
      //   message: msg,
      //   type: 'success',
      // });
    },
    // res(val) {
    //   this.$message({
    //     message: val,
    //     type: 'success',
    //   });
    // },
    // erro(val) {
    //   this.$message(val);
    // },
  },
};
