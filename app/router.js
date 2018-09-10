
module.exports = app => {
  app.get('/app/book', app.controller.app.book);
  app.get('/*', app.controller.app.index);
  app.io.of('/').route('chat', app.io.controllers.chat);
};
