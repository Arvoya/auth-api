"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const concernsModel = require("./concerns/model.js");
const recsModel = require("./recs/model.js");
const apptsModel = require("./appointments/appointment.js");
const Collection = require("./data-collections.js");

const environment = process.env.NODE_ENV;
const DATABASE_URL = process.env.DATABASE_URL || "sqlite::memory:";
const testOrProduction = environment === "test" || environment === "production";

const sequelize = new Sequelize(
  DATABASE_URL,
  testOrProduction ? { logging: false } : {},
);
const concerns = concernsModel(sequelize, DataTypes);
const recs = recsModel(sequelize, DataTypes);
const appts = apptsModel(sequelize, DataTypes);

// TODO: JOIN TABLES APPT Table Primary Key -> recs & concerns Foreign Key

appts.hasMany(recs, { foreignKey: "appointmentID", sourceKey: "id" });
appts.hasMany(concerns, { foreignKey: "appointmentID", sourceKey: "id" });
recs.belongsTo(appts, { foreignKey: "appointmentID", targetKey: "id" });
concerns.belongsTo(appts, { foreignKey: "appointmentID", targetKey: "id" });

module.exports = {
  sequelize,
  concerns: new Collection(concerns),
  recs: new Collection(recs),
  appts: new Collection(appts),
};
