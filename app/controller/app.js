const Model = require('../mocks/article/list');
const Controller = require('egg').Controller;
class AppController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('app/app.js', {
      url: ctx.url.replace(/\/app/, ''),
    });
  }
  async addBook() {
    const { ctx } = this;
    const query = ctx.request.body;
    const url = query.search;
    const book = await ctx.service.biqu.add(url);
    this.ctx.body = {
      book,
      ctx
    };
  }
}

module.exports = AppController;
