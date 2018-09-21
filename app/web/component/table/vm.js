const axios = require('axios');
export default {
  name: 'm-table',
  mounted() {},
  data() {
    return {
      current: {
        currentPage: 1,
        pageSizes: 10,
        total: 0
      }
    };
  },
  watch: {
    value(val) {
      this.current.total = val.length;
    }
  },
  components: {},
  computed: {
    tableArr() {
      return this.value.slice(
        (this.current.currentPage - 1) * this.current.pageSizes,
        this.current.currentPage * this.current.pageSizes
      );
    }
  },
  methods: {
    handleSizeChange(val) {
      this.current.pageSizes = val;
    },
    handleCurrentChange(val) {
      this.current.currentPage = val;
    }
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
