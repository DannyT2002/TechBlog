const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        console.log('Hashing password for new user');
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        console.log('Hashed password:', newUserData.password);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        console.log('Hashing password for updated user');
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        console.log('Hashed password:', updatedUserData.password);
        return updatedUserData;
      },
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
