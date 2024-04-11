"use strict";

const apptModel = (sequelize, DataTypes) => {
  const Appointments = sequelize.define("Appointments", {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("virtual", "in-person"),
      allowNull: false,
      defaultValue: "virtual",
    },
  });

  Appointments.getWithRecsAndConcerns = async function (apptID) {
    return await this.findAll({
      where: {id: apptID},
      include: [
        {
          model: sequelize.models.Recommendations,
        },
        {
          model: sequelize.models.Concerns,
        },
      ],
    });
  };

  return Appointments;
};

module.exports = apptModel;
