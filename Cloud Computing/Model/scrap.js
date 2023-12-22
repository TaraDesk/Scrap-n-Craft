const Sequelize = require("sequelize");
const connection = require("../config/db/db.js");

var scrap = connection.define(
  "scrap",
  {
    ItemId: Sequelize.INTEGER,
    Email: Sequelize.STRING,
    Title: Sequelize.STRING,
    Desc: Sequelize.STRING,
    Category: Sequelize.STRING,
    Tools: Sequelize.TEXT,
    Steps: Sequelize.TEXT,
    Status: Sequelize.STRING,
  },
  {
    FreezeTableName: true,
    timestamps: false,
    type: Sequelize.TEXT,
    unique: true,
  }
);

scrap.removeAttribute("id");
module.exports = scrap;

