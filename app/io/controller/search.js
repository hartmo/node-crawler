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
      ctx.socket.emit('searchResult', `搜索地址是：${bookurl}`);
      await ctx.service.biqu
        .book($)
        .then((res) => {
          ctx.socket.emit('searchResult', res);
          ctx.socket.emit('searchResult', `${searchController.chapter}`);
        })
        .catch((e) => {
          ctx.socket.emit('erro', `${e}`);
        });
    }
    async chapter() {
      return await false;
    }
  }
  return searchController;
};
