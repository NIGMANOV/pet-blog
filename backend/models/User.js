import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

export const User = sequelize.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  },
});
