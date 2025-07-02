import { User } from "../models/User.js";

export class UserController {
  async registration(req, res) {
    try {
      const { email, password } = req.body;

      const candidate = await User.findOne({ where: { email } });

      if (candidate) {
        return res.status(401).json({ message: "Email уже занят" });
      }

      const newUser = {
        email: email,
        password: password,
      };

      const createUser = await User.create(newUser);

      return res
        .status(201)
        .json({ message: "Вы успешно зарегистрировались", user: createUser });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async authorization(req, res) {
    try {
      const { email, password } = req.body;

      const candidate = await User.findOne({ where: { email } });

      if (!candidate || candidate.password !== password) {
        return res.status(401).json({ message: "Неверный email или пароль" });
      }

      return res.status(200).json({ message: "Вы успешно авторизовались" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
