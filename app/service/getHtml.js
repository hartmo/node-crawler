const Service = require('egg').Service;
const moment = require('moment');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
class getHtmlService extends Service {
  /**
   * 获取爬虫的html
   * @param {String} url 地址
   * @param {String} format 编码格式
   */
  async index(url, format) {
    const { ctx } = this;
    const result = await ctx.curl(url, {
      // 3 秒超时
      timeout: 3000
    });
    const html = iconv.decode(result.res.data, format);
    const $ = cheerio.load(html, { decodeEntities: false });
    return $;
  }
  /**
   * 检查ip是否能使用
   * @param {String} url 地址
   * @param {Object} opction 设置
   */
  async check(url, opction) {
    const { ctx } = this;
    console.log(url);
    console.log(opction);
    return await ctx.curl(url, opction).then(res => {
      if (res.statusCode === 200) {
        return true;
      } else {
        return false;
      }
    });
  }
}
module.exports = getHtmlService;
