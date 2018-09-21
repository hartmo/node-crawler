const Controller = require('egg').Controller;
module.exports = app => {
  class Controller extends app.Controller {
    async index() {
      const { ctx } = this;
      const message = this.ctx.args[0];
      await this.getIpList(message, 1).then(res => {
        ctx.socket.emit('ipList', res);
      });
    }
    async ipChecked() {
      const { ctx } = this;
      const message = this.ctx.args[0];
      ctx.service.getHtml.check('http://www.baidu.com', { enableProxy: true, timeout: 3000, proxy: message }).then(ret => {
        ctx.socket.emit('ipchecked', ret);
      });
    }
    /**
     * 获取ip地址
     * @param {String} url 地址
     * @param {Int} count 页数
     * @param {Array} arr 总条数
     */
    async getIpList(url, count) {
      const { ctx } = this;
      const arr = [];
      return await ctx.service.getHtml.index(url + count, 'UTF-8').then($ => {
        $('#ip_list tr').each(function() {
          const $this = $(this);
          const $index = $this.index();
          if ($index > 0) {
            const tr = $this.children('td'); // 行 tr
            const ip = tr.eq(1).text(); // ip
            const port = tr.eq(2).text(); // port
            const address = tr.eq(3).text(); // address
            const type = tr.eq(5).text(); // http,https
            const speed = parseFloat(tr.eq(6).find('.bar').attr('title')); // speed
            const conTime = parseFloat(tr.eq(7).find('.bar').attr('title')); // conTime
            const checked = 0;
            const ipObj = {
              type,
              ip,
              port,
              address,
              speed,
              conTime,
              checked,
              url: type + '://' + ip + ':' + port
            };
            if (2 / Number(conTime) < 50 || 2 / Number(conTime) >= 100) {
              if (6.31 / Number(speed) < 50 || 6.31 / Number(speed) >= 100) {
                arr.push(ipObj);
              }
            }
          }
        });
        return arr;
      });
    }
  }
  return Controller;
};
