module.exports = app => {
  return function* () {
    const self = this;
    const message = this.args[0];
    this.socket.emit('res', `Hi! I've got your message: ${message}`);
  };
};
