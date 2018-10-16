module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const chapter = app.model.define('chapter', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    chapterid: INTEGER,
    bookid: INTEGER,
    name: STRING(100),
    url: STRING(100),
    content: TEXT(),
    status: INTEGER,
    update: DATE
  });

  return chapter;
};
