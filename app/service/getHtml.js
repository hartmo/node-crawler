const Service = require('egg').Service;
const moment = require('moment');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const request = require('request');
class getHtmlService extends Service {
  /**
   * 获取爬虫的html
   * @param {String} url 地址
   * @param {String} format 编码格式
   */
  async index(url, format) {
    const { ctx } = this;
    const result = await ctx.curl(url, { timeout: 3000
    });
    const html = iconv.decode(result.res.data, format || 'gbk');
    const $ = cheerio.load(html, { decodeEntities: false });
    return $;
  }
  /**
   * 检查ip是否能使用
   * @param {String} url 地址
   * @param {String} proxy 设置
   */
  async check(url, proxy) {
    const { ctx } = this;
    return await ctx.curl(url, { enableProxy: true, timeout: 3000, proxy }).then(res => {
      if (res.statusCode === 200) {
        return true;
      } else {
        return false;
      }
    });
  }
  async getip() {
    const { ctx } = this;
    const result = await ctx.curl('http://www.xicidaili.com/nn/', {
      // 3 秒超时
      timeout: 3000
    });
    const html = iconv.decode(result.res.data, 'utf-8');
    const $ = cheerio.load(html, { decodeEntities: false });
    const arr = [];
    $('#ip_list tr').each(function() {
      const ip = $(this).find('td').eq(1)
        .text();
      const port = ':' + $(this).find('td').eq(2)
        .text();
      const http = $(this).find('td').eq(5)
        .text() + '://';
      if (ip) {
        arr.push(http + ip + port);
      }
    });
    return arr;
  }
}
module.exports = getHtmlService;
