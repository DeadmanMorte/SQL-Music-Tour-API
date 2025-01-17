'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventStage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EventStage.init({
    event_stage_id: {
      type: DataTypes.INTEGER,
      allowNull: false}
  }, {
    sequelize,
    modelName: 'EventStage',
    tableName:'event_stages',
    timestamps:false
  });
  return EventStage;
};