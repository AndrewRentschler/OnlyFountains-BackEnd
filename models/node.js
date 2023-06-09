'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Node extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Node.init({
    nodeType: DataTypes.STRING,
    nodeId: DataTypes.INTEGER,
    lat: DataTypes.DOUBLE,
    lon: DataTypes.DOUBLE,
    tags: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Node',
  });
  return Node;
};