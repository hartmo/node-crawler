const Controller = require('egg').Controller;
module.exports = (app) => {
  class Controller extends app.Controller {
    async index() {
      const message = this.ctx.args[0];
      await this.ctx.socket.emit('res', '链接成功');
    }
  }
  return Controller;
};
