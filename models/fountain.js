'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fountain extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Fountain.belongsTo(models.Profile, { foreignKey: 'profileId' })
      Fountain.hasMany(models.Rating, { foreignKey: 'fountainId' })
    }
  }
  Fountain.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    avgRating: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
				max: 5,
      },
    },
    profileId: { // profileId is the id of the profile that created the fountain
      type: DataTypes.BIGINT,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Profiles',
        key: 'id',
      },
    },
    photo: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lon: DataTypes.FLOAT,
    nodeId: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Fountain',
  });
  return Fountain;
};