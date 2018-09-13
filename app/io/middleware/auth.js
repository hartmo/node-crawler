module.exports = (app) => {
  return async (ctx, next) => {
    ctx.socket.emit('res', '链接成功');
    await next;
  };
};
