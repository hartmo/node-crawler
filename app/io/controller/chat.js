const Controller = require('egg').Controller;
module.exports = (app) => {
  class Controller extends app.Controller {
    async index() {
      const message = this.ctx.args[0];
      await this.ctx.socket.emit('res', '链接成功');
    }
    /**
     * 搜索
     */
    async search() {
      const search = this.ctx.args[0];
      await this.ctx.socket.emit('searchSuccess', '搜索成功' + search);
    }
  }
  return Controller;
};
