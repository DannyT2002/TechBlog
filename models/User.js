const { Model, DataType } = require("sequelize");

class User extends Model {}

User.init(
  {
    username: {
      type: DataType.STRING,
      allowNull: false,
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: false,
    underscored: true,
    modelName: "user",
  }
);
