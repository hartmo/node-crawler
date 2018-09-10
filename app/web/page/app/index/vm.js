const axios = require('axios');
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

      // Make a request for a user with a given ID
      axios
        .get('/app/book')
        .then(function(response) {
          // handle success
          console.log(response);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .then(function() {
          // always executed
        });
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
