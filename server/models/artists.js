'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Artists.init({
    artist_id: {type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    artist_name: {type: DataTypes.STRING,
      allowNull: false
    },
    genre: {type: DataTypes.STRING,
      allowNull: false
    },
    popularity_score: {type: DataTypes.SMALLINT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Artists',
    tableName: 'Artists',
    timestamps: false
  });
  return Artists;
};