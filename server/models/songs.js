'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Songs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Songs.init({
    song_name: {type: DataTypes.STRING,
      primaryKey:true,
      allowNull: false
    },
    track_length: {type: DataTypes.SMALLINT,
      allowNull: false
    },
    total_plays: {type: DataTypes.INTEGER,
      allowNull: false
    },
    artist_id: {type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Songs',
    tableName: 'Songs',
    timestamps: false
  });
  return Songs;
};