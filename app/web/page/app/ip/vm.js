export default {
  name: 'ip',
  mounted() {
    this.indexDate = this.$router.options.routes;
  },
  watch: {},
  data() {
    return {
      ipAddress: 'http://www.xicidaili.com/nn/',
      ipList: []
    };
  },
  components: {},
  computed: {},
  methods: {
    ipGet() {
      this.$socket.emit('ip', this.ipAddress);
    },
    checked(row) {
      console.log(row.url);
      this.$socket.emit('ipChecked', row.url);
    },
    /**
     * 获取连接状态
     * @param {String} time 时间
     * @param {Number} count 最大时间
     */
    progressStatus(time, count) {
      const percent = count / time;
      if (percent < 10 || percent >= 100) {
        return '#1fb757';
      } else if (percent < 50) {
        return '#f1ec5f';
      } else {
        return '#ee2f3b';
      }
    },
    /**
     * 判断状态
     * @param {Number} type 状态
     * @param {Number} state 输出状态
     */
    tagType(type, state) {
      if (type === 0) {
        return state === 1 ? 'warning' : '等待中';
      } else if (type === 1) {
        return state === 1 ? 'success' : '通过';
      } else if (type === -1) {
        return state === 1 ? 'info' : '不通过';
      } else {
        return state === 1 ? 'danger' : '错误';
      }
    },
    /**
     * 获取百分比
     * @param {String} time 时间
     * @param {Number} count 最大时间
     */
    percentage(time, count) {
      if (!time) {
        time = 0;
      }
      let percent = parseFloat(count / time).toFixed(2);
      if (percent > 100) {
        percent = 0;
      }
      return Number((100 - Number(percent)).toFixed(2));
    }
  },
  sockets: {
    /**
     * 获取ip
     * @param {Array} val ip数组
     */
    ipList(val) {
      this.ipList = val;
    },
    ipchecked(val) {
      console.log(val);
    },
  }
};
