module.exports = (connection, Sequelize) => {
  class Meme extends Sequelize.Model {}
  Meme.init(
    {
      _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      desc: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      created_on_time: {
        type: Sequelize.NUMBER(4),
      },
    },
    { sequelize: connection }
  );
  return Meme;
};
