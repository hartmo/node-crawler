export default {
  name: 'index',
  mounted() {
    this.indexDate = this.$router.options.routes;
  },
  watch: {},
  data() {
    return {
      indexDate: []
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
