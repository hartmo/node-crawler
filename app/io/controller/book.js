const Controller = require('egg').Controller;
const async = require('async');
const moment = require('moment');
module.exports = app => {
  class Controller extends app.Controller {
    async index() {
      const { ctx } = this;
      const message = ctx.args[0];
      await ctx.socket.emit('res', '链接成功');
    }
    /**
     * 搜索
     */
    async search() {
      const { ctx } = this;
      const search = ctx.args[0];
      const MAXLIMIT = ctx.args[1] || 5;
      try {
        await ctx.service.getHtml.index(search).then($ => {
          if (!$('meta[property="og:novel:book_name"]').attr('content')) {
            const val = '被屏蔽了呗';
            ctx.socket.emit('searchError', { val });
            return;
          }
          console.log(1);
          const item = {
            name: $('meta[property="og:novel:book_name"]').attr('content'),
            author: $('meta[property="og:novel:author"]').attr('content'),
            url: $('meta[property="og:novel:latest_chapter_url"]').attr('content'),
            classification: $('meta[property="og:novel:category"]').attr('content'),
            state: $('meta[property="og:novel:status"]').attr('content'),
            update: moment(
              $('meta[property="og:novel:update_time"]').attr('content')
            ).format('YYYY-MM-DD')
          };
          this.queryBook($, item, MAXLIMIT)
            .then(res => {
              ctx.socket.emit('searchSuccess', res);
            })
            .catch(e => {
              ctx.socket.emit('searchError', e);
            });
        });
      } catch (e) {
        ctx.socket.emit('searchError', e);
      }
    }
    async queryBook($, item, MAXLIMIT) {
      const { ctx } = this;
      const booklist = [];
      try {
        item = await ctx.service.book.queryBook(item);
        const main = this.domainURI(item.url);
        $('#list dd').each(function() {
          booklist.push({
            url: main + $(this).find('a').attr('href'),
            name: $(this).find('a').text(),
            chapterid: $(this).index() + 1,
            bookid: item.id, // 预留入库的时候获取
            status: 0
          });
        });
        let list = await ctx.service.book.queryChapter({ bookid: item.id });
        list = this.getNewChapter(booklist, list);
        item.listLength = list.length;
        // 章节获取成功
        this.ChapterList(item.id, list, MAXLIMIT);
        ctx.socket.emit('error', list);
        return item;
      } catch (e) {
        ctx.socket.emit('error', e);
      }
    }
    /**
     * 获取域名
     * @param {String} str
     */
    domainURI(url) {
      const durl = /http:\/\/([^\/]+)\//i;
      const domain = url.match(durl);
      return domain[1];
    }
    /**
     * 获取所有书籍内容
     * @param {Int} bookid  书本id
     * @param {Arrany} arr  数组
     * @param {Int} MAXLIMIT 最大链接数
     */
    async ChapterList(bookid, arr, MAXLIMIT) {
      const { ctx } = this;
      const start = new Date();
      const arrErr = [];
      await async.mapLimit(
        arr,
        MAXLIMIT,
        (item, callback) => {
          this.chapter(item, start)
            .then(res => {
              ctx.socket.emit('chapterSuccess', res);
              callback(null, res);
            })
            .catch(e => {
              ctx.socket.emit('chapterErr', e);
              callback(null, e);
              arrErr.push(e.data);
            });
        },
        (err, result) => {
          const end = (new Date() - start) / 1000;
          result.sort((a, b) => {
            return a.chapterid - b.chapterid;
          });
          this.updateChapter(bookid, result);
          if (arrErr.length) {
            this.ChapterList(bookid, arrErr, MAXLIMIT);
          }
          return !err;
        }
      );
    }
    /**
     * 获取章节内容
     * @param {Array} list
     */
    async chapter(item, start) {
      const { ctx } = this;
      return await ctx.service.getHtml
        .index(item.url)
        .then($ => {
          const content = $('#content').html();
          const end = (new Date() - start) / 1000;
          item.content = content;
          item.status = 1;
          return {
            msg: '获取' + item.url + '成功,共耗时' + end + '秒\n\r',
            status: 0,
            data: item
          };
        })
        .catch(e => {
          const end = (new Date() - start) / 1000;
          item.status = 0;
          return {
            msg: '获取' + item.url + '失败,共耗时' + end + '秒\n\r',
            state: -1,
            data: item,
            e
          };
        });
    }
    /**
     *插入章节
     * @param {int} bookid
     * @param {Array} arr
     */
    async updateChapter(bookid, arr) {
      const { ctx } = this;
      return await ctx.service.book.queryChapter({ bookid }).then(res => {
        const chapter = this.getNewChapter(arr, res);
        ctx.socket.emit('search', chapter);
        // ctx.service.book.insertChapter(chapter).then(ret => {
        //   ctx.socket.emit('search', ret);
        // });
        return chapter;
      });
    }
    /**
     * 获取过滤之后的章节
     * @param {Array} arrayA
     * @param {Array} arrayB
     */
    getNewChapter(arrayA, arrayB) {
      return arrayA.map(itemA => {
        const findItem = arrayB.find(itemB => itemB.name === itemA.name);
        return findItem ? findItem.data : itemA.data;
      });
    }
  }
  return Controller;
};
