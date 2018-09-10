
module.exports = app => {
  app.get('/*', app.controller.app.index);
  app.io.of('/').route('chat', app.io.controllers.chat);
};
