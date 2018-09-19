const Service = require('egg').Service;
const moment = require('moment');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
class getHtmlService extends Service {
  async index(url, format) {
    const { ctx } = this;
    const result = await ctx.curl(url, {
      // 3 秒超时
      timeout: 3000,
    });
    const html = iconv.decode(result.res.data, format);
    const $ = cheerio.load(html, { decodeEntities: false });
    return $;
  }
}
module.exports = getHtmlService;
