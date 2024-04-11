"use strict";

const { start } = require("./src/server.js");
const { db } = require("./src/auth/models");
const { sequelize } = require("./src/models");

sequelize.sync().then(() => {
  db.sync().then(() => {
    start(process.env.PORT || 3001);
  });
});
