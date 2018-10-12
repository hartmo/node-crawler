export default {
  name: 'momoheader',
  mounted() {},
  watch: {},
  data() {
    return {};
  },
  components: {},
  computed: {
    indexDate() {
      return this.$router.options.routes;
    },
    selectedMenu() {
      return window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
    }
  },
  methods: {},
  sockets: {
    connect() {
      this.$message({
        message: '链接成功',
        type: 'success'
      });
    },
    res(val) {
      this.$message({
        message: val,
        type: 'success'
      });
    },
    erro(val) {
      this.$message(val);
    }
  }
};
