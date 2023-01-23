'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Event, EventStage,SetTime}) {
      Stage.belongsToMany(Stage,  {
        foreignKey: "stage_id",
        as: "events",
        through: EventStage    
      })
      Stage.hasMany(SetTime, {
        foreignKey: "stage_id",
        as:"set_times"
        })     
  } 
}
  Stage.init({
    stage_id: {
      type: DataTypes.INTEGER,
      allowNull:false},
    name: {
      type: DataTypes.STRING,
    allowNull:false},
  }, {
    sequelize,
    modelName: 'Stage',
    tableName: 'stages',
    timestamps: false

  });
  return Stage;
};