module.exports = app => {
  app.beforeStart(async function() {
    console.log(1);
    console.log('----------------------------------');
    await app.model.sync({ force: true });
  });
};
