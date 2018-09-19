const axios = require('axios');
export default {
  name: 'm-table',
  mounted() {},
  data() {
    return {
      current: {
        currentPage: 1,
        pageSizes: 20,
        total: 0,
      },
    };
  },
  watch: {
    value(val) {
      this.current.total = val.length;
    },
  },
  components: {},
  computed: {
    tableArr() {
      const start = this.current.currentPage - 1 > 0 ? this.current.currentPage - 1 : 0;
      return this.val.slice(
        start * this.current.currentPage,
        this.current.currentPage * this.current.currentPage
      );
    },
  },
  methods: {
    handleSizeChange(val) {
      this.current.pageSizes = val;
    },
    handleCurrentChange(val) {
      this.current.currentPage = val;
    },
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
