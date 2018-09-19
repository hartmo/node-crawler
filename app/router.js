
module.exports = app => {
  app.get('/*', app.controller.app.index);
  app.io.route('chat', app.io.controllers.chat.index);
};
