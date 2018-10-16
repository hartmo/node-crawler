const Service = require('egg').Service;
const moment = require('moment');
class bookService extends Service {
  // 查找书本
  async queryBook(item) {
    const { ctx } = this;
    const mysql = 'books';
    let book = await ctx.service.mysql.query(mysql, { name: item.name });
    if (!book) {
      item.status = 1;
      book = await ctx.service.mysql.insert(mysql, item).then(res => {
        item.id = res.insertId;
        return item;
      });
    } else {
      const update = Object.assign(book, item);
      ctx.service.mysql.update(mysql, update);
    }
    return await book;
  }
  // 查找书本下的所有章节
  async queryChapter(item) {
    const { ctx } = this;
    const mysql = 'chapters';
    return (await ctx.service.mysql.query(mysql, item)) || [];
  }
  // 插入章节
  async insertChapter(arr) {
    const { ctx } = this;
    const mysql = 'chapters';
    return await ctx.service.mysql.insert(mysql, arr) || {};
  }
}
module.exports = bookService;
