'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Slot extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'id' });
    }
  }
  Slot.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      start_date: DataTypes.DATEONLY,
      end_date: DataTypes.DATEONLY,
      start_time: {
        type: DataTypes.TIME,
        allowNull: false,
        set(value) {
          this.setDataValue('start_time', value);
        },
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: false,
        set(value) {
          this.setDataValue('end_time', value);
        },
      },
      weekdays: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Slot',
    }
  );
  return Slot;
};
