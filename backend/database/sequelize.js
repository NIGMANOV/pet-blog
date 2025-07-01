import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("petblog", "postgres", "samir2001", {
  host: "localhost",
  dialect: "postgres",
});
