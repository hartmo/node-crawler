const Service = require('egg').Service;
const moment = require('moment');
class BookService extends Service {
  async book($) {
    const { ctx } = this;
    const data = {};
    data.$body = $('#list');
    data.name = $('meta[property="og:novel:book_name"]').attr('content'); // 书本名字
    data.url = $('meta[property="og:novel:read_url"]').attr('content'); // 地址
    data.status = $('meta[property="og:novel:status"]').attr('content'); // 状态
    data.author = $('meta[property="og:novel:author"]').attr('content'); // 作者
    data.img = $('meta[property="og:image"]').attr('content'); // 作者
    data.simpleIntroduction = $('meta[property="og:description"]').attr('content'); // 简介
    data.cfrom = 1; // 来源
    data.updatetime = moment($('meta[property="og:novel:update_time"]').attr('content')).format(
      'YYYY-MM-DD HH:mm:ss'
    ); // 最后更新时间
    // 获取章节
    // const res = data.$body.html();
    // const content = res.replace(/<\/?br><\/?br><\/?br>/g, '').replace(/'&nbsp;'/g, '');
    return await ctx.service.book.add(data).then((res) => {
      return res;
    })
      .catch((e) => {
        return e;
      });
  }
}
module.exports = BookService;
