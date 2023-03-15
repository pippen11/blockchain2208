'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user2 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // user에 있는 ID값을 user_id라는 칼럼 이름으로 UserInfo 모델에 추가
      users.hasOne(models.UserInfo, {foreignKey: "user_id", sourceKey: "id"})

    }
    // hasOne, hasMany, belongsTo, belongsToMany

  }
  user2.init({
    user_id: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user2',
  });
  return user2;
};