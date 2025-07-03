import dotenv from "dotenv";
import express, { json } from "express";
import { sequelize } from "./database/sequelize.js";
import { User } from "./models/User.js";
import { userRouter } from "./routes/UserRoute.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const connectDB = async () => {
  try {
    await User.sync({ force: true });
    console.log("Таблица для модели user только что была создана заново!");
    await sequelize.authenticate();
    console.log("Соединение с БД было успешно установлено");
  } catch (e) {
    console.log("Невозможно выполнить подключение к БД: ", e);
  }
};

app.use("/api/user", userRouter);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server started ${process.env.PORT}`);
});
