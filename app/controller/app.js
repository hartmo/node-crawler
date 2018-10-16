const Controller = require('egg').Controller;
class AppController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.renderClient('app/app.js', {
      url: ctx.url.replace(/\/app/, { msg: 'hi,momo' }),
    });
  }
}

module.exports = AppController;
