module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const book = app.model.define('book', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: STRING(100),
    author: STRING(100),
    url: STRING(100),
    classification: STRING(100),
    status: INTEGER,
    state: STRING(20),
    update: DATE,
  });

  return book;
};
