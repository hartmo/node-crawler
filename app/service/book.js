const Service = require('egg').Service;
class BookService extends Service {
  async find(id) {
    const book = await this.app.mysql.get('book', { id });
    return { book };
  }
}
module.exports = BookService;