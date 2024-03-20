const Sequelize = require("sequelize");
const config = require("../config/config");

const dbConfig = config.db;
const sequelize = new Sequelize(
  dbConfig.database, dbConfig.username, dbConfig.password, 
    {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
  });


sequelize
  .authenticate()
  .then(() =>
    console.info(
      `[pid ${process.pid}] Successfully connected to db "${dbConfig.database}"`
    )
  )
  .catch(err => {
    console.error(
      `[pid ${process.pid}] Error connecting to db "${dbConfig.database}"`,
      err
    );
    process.exit(1);
  });


module.exports = sequelize;
