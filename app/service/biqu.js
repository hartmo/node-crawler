const Service = require('egg').Service;
const moment = require('moment');
class BookService extends Service {
  /**
   * 获取书本
   * @param {String} $  html网站
   */
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
    data.chapterLenght = $('#list dd a').length; // 文章长度
    data.cfrom = 1; // 来源
    data.updatetime = moment($('meta[property="og:novel:update_time"]').attr('content')).format(
      'YYYY-MM-DD HH:mm:ss'
    ); // 最后更新时间
    // 获取章节
    // const res = data.$body.html();
    // const content = res.replace(/<\/?br><\/?br><\/?br>/g, '').replace(/'&nbsp;'/g, '');
    return await ctx.service.book
      .add(data)
      .then((res) => {
        res.chapterLenght = data.chapterLenght;
        return res;
      })
      .catch((e) => {
        return e;
      });
  }
  async addChapter($, bookurl, app, book) {
    const { ctx } = this;
    let domain = bookurl.split('/');
    if (domain[2]) {
      domain = domain[2];
    } else {
      app.socket.emit('searchResult', '域名错了啦');
      return;
    }
    app.socket.emit('searchResult', `${domain}`);
    $('#list dd').each(function() {
      // setTimeout(() => {
      const self = $(this);
      const Index = $(this).index();
      const href = domain + self.find('a').attr('href');
      const text = self.find('a').text();
      ctx.service.biqu.addContent(href).then((res) => {
        const chapter = {
          bookId: book.bookId,
          title: text,
          content: res,
          order: Index,
        };
        ctx.service.chapter.addChapter(chapter).then((ret) => {
          app.socket.emit('erro1', ret);
          app.socket.emit('searchResult', ret);
        }).catch((e) => {
          app.socket.emit('erro', e);
        });
      });
      // }, Math.floor(Math.random() * 500));
    });
    app.socket.emit('erro', '加载中');
    return true;
  }
  async addContent(domain) {
    const { ctx } = this;
    return await ctx.service.getHtml.index(domain, 'GBK').then(($) => {
      let html = $('#content').html();
      html = html.replace(/<\/?br><\/?br><\/?br>/g, '').replace(/'&nbsp;'/g, '');
      return html;
    });
  }
}
module.exports = BookService;
