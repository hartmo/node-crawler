const Service = require('egg').Service;
const moment = require('moment');
class BookService extends Service {
  async addChapter(book) {
    const mysqlBook = await this.app.mysql.get('chapter', { title: book.title, BookId: Number(book.BookId) });
    if (!mysqlBook) {
      /**
       * 如果没有书本，则插入一条数据，如果有就更新更新时间和状态
       */
      const insertResult = await this.app.mysql.insert('chapter', {
        title: book.title,
        BookId: Number(book.bookId),
        content: book.content,
        order: Number(book.order),
      });
      if (insertResult.affectedRows === 1) {
        return {
          msg: '入库成功',
          status: 1,
          title: book.title,
          bookId: Number(book.bookId),
        };
      } else {
        return {
          msg: '入库失败',
          status: -1,
          title: book.title,
          bookId: Number(book.bookId),
        };
      }
    }
    return {
      msg: '已存在',
      status: 0,
      title: book.title,
      bookId: Number(book.bookId),
    };
  }
}
module.exports = BookService;
