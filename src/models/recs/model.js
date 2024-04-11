"use strict";

const recsModel = (sequelize, DataTypes) =>
  sequelize.define("Recommendations", {
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

module.exports = recsModel;
