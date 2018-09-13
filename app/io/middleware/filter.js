module.exports = (app) => {
  return async (ctx, next) => {
    // ctx.socket.emit('res', '包收到了!');
    await next();
  };
};
