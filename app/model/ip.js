module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const ip = app.model.define('ip', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ip: STRING(100),
    address: STRING(100),
    time: STRING,
    update: DATE
  });

  return ip;
};
