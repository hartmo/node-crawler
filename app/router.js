
module.exports = app => {
  app.post('/app/addbook', app.controller.app.addBook);
  app.get('/*', app.controller.app.index);
  app.io.route('chat', app.io.controllers.chat.index);
  app.io.route('search', app.io.controllers.search.index);
};
