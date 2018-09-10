export default {
  name: 'index',
  mounted() {
    this.init();
  },
  watch: {},
  data() {
    return {
      msg: '123'
    };
  },
  components: {},
  computed: {},
  methods: {
    init() {
      this.$socket.emit('chat', '111111111111');
    }
  },
  sockets: {
    connect() {
      console.log('socket connected');
    },
    res(val) {
      console.log('接收到服务端消息', val);
    }
  }
};
