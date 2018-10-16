const Service = require('egg').Service;
const moment = require('moment');
class bookService extends Service {
  // 搜索
  async query(mysqlname, item) {
    return await this.app.mysql.get(mysqlname, item);
  }
  // 插入
  async insert(mysqlname, item) {
    const time = moment().format('YYYY-MM-DD');
    if (item instanceof Array) {
      item.forEach(res => {
        res.created_at = time;
        res.updated_at = time;
      });
    } else {
      item.created_at = time;
      item.updated_at = time;
    }
    return await this.app.mysql.insert(mysqlname, item);
  }
  // 修改
  async update(mysqlname, item) {
    item.updated_at = moment().format('YYYY-MM-DD');
    return await this.app.mysql.update(mysqlname, item);
  }
  // 删除
  async delete(mysqlname, item) {
    item.updated_at = moment().format('YYYY-MM-DD');
    return await this.app.mysql.delete(mysqlname, item);
  }
}
module.exports = bookService;
