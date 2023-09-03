import { Sequelize } from "sequelize";

const db = new Sequelize("lyrid_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
