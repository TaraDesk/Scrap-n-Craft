const sequelize = require("sequelize");
var connection = new sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  connectTimeout: 30000,
  dialect: "mysql",
  logging: true,
  multipleStatements: true,
  port: 3306,
});

try {
  connection.authenticate();
  connection.log("Database Connected!");
  connection.sync();
} catch (err) {
  console.error(err);
}

module.exports = connection;

