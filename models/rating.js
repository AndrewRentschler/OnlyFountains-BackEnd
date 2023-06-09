'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rating.belongsTo(models.Profile, { foreignKey: 'profileId' })
      Rating.belongsTo(models.Fountain, { foreignKey: 'fountainId' })
    }
  }

  Rating.init({
    // value: DataTypes.INTEGER,
    value: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
				max: 5,
      },
    },

    // fountainID: DataTypes.INTEGER,
    fountainId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Fountains',
        key: 'id',
      },
    },

    // raterId: DataTypes.INTEGER,
    raterId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Profiles',
        key: 'id',
      },
    },

  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};