const Service = require('egg').Service;
const moment = require('moment');
class BookService extends Service {
  async add(book) {
    const mysqlBook = await this.app.mysql.get('book', { name: book.name });
    if (!mysqlBook) {
      /**
       * 如果没有书本，则插入一条数据，如果有就更新更新时间和状态
       */
      const insertResult = await this.app.mysql.insert('book', {
        name: book.name,
        url: book.url,
        status: book.status,
        author: book.author,
        'simple-introduction': book.simpleIntroduction,
        updatetime: book.updatetime,
        img: book.img,
        cfrom: book.cfrom,
      });
      if (insertResult.affectedRows === 1) {
        return {
          msg: '成功入库',
          status: 1,
          updatetime: book.updatetime,
          img: book.img,
          author: book.author,
          bookname: book.name,
          bookStatus: book.status,
          bookId: insertResult.id,
        };
      } else {
        return {
          msg: '入库失败',
          status: -1,
          updatetime: book.updatetime,
          img: book.img,
          author: book.author,
          bookname: book.name,
          bookStatus: book.status,
          bookId: 0,
        };
      }
    }
    if (moment(mysqlBook.updatetime).unix() !== moment(book.updatetime).unix()) {
      const row = {
        id: mysqlBook.id,
        status: book.status,
        updatetime: book.updatetime,
      };
      const updateResult = await this.app.mysql.update('book', row);
      if (updateResult.affectedRows === 1) {
        return {
          msg: '更新成功',
          status: 2,
          updatetime: book.updatetime,
          img: book.img,
          author: book.author,
          bookname: book.name,
          bookStatus: book.status,
          bookId: updateResult.id,
        };
      } else {
        return {
          msg: '更新失败',
          status: -2,
          updatetime: book.updatetime,
          img: book.img,
          author: book.author,
          bookname: book.name,
          bookStatus: book.status,
          bookId: updateResult.id,
        };
      }
    }
    return {
      msg: '暂无更新',
      status: 0,
      updatetime: book.updatetime,
      img: book.img,
      author: book.author,
      bookname: book.name,
      bookStatus: book.status,
      bookId: mysqlBook.id,
    };
  }
}
module.exports = BookService;
