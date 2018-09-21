
module.exports = app => {
  app.get('/*', app.controller.app.index);
  app.io.route('chat', app.io.controllers.chat.index);
  app.io.route('ip', app.io.controllers.ip.index);
  app.io.route('ipChecked', app.io.controllers.ip.ipChecked);
};
