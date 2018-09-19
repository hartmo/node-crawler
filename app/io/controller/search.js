const Controller = require('egg').Controller;
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const moment = require('moment');
module.exports = (app) => {
  class searchController extends app.Controller {
    async index() {
      const { ctx } = this;
      const bookurl = this.ctx.args[0];
      const result = await ctx.curl(bookurl, {
        // 3 秒超时
        timeout: 3000,
      });
      // 获取书本内容
      const html = iconv.decode(result.res.data, 'GBK');
      const $ = cheerio.load(html, { decodeEntities: false });
      await ctx.service.biqu
        .book($)
        .then((res) => {
          ctx.socket.emit('searchBook', res);
          if (res.status > 0) {
            this.chapter($, bookurl, res);
          }
        })
        .catch((e) => {
          ctx.socket.emit('erro', `${e}`);
        });
    }
    async chapter($, bookurl, book) {
      const { ctx } = this;
      await ctx.service.biqu
        .addChapter($, bookurl, ctx, book)
        .then((res) => {
          ctx.socket.emit('erro', '收集完毕');
        })
        .catch((e) => {
          ctx.socket.emit('erro', `${e}`);
        });
    }
  }
  return searchController;
};
