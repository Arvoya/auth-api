"use strict";

const concernsModel = (sequelize, DataTypes) =>
  sequelize.define("Concerns", {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("physical", "mental"),
      allowNull: false,
    },
    appointmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

module.exports = concernsModel;
