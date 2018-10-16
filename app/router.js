module.exports = app => {
  app.get('/*', app.controller.app.index);
  const keys = Object.keys(app.io.controllers);
  keys.forEach(res => {
    const Objectkeys = Object.keys(app.io.controllers[res]);
    Objectkeys.forEach(ret => {
      app.io.route(res + '/' + ret, app.io.controllers[res][ret]);
    });
  });
};
