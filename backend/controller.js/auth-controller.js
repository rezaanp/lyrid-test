import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import user from "../models/user-model.js";

const register = async (req, res, next) => {
  try {
    const { name, username, password, confirmPassword } = req.body;

    const users = await user.findOne({
      where: {
        username,
      },
    });

    if (users)
      return res.status(400).json({ error: "Username already exists" });

    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ error: "Password and confirm password do not match" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await user.create({ name, username, password: hashedPassword });

    res.json({ message: "Register Success" });
  } catch (error) {
    next();
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const users = await user.findOne({ where: { username } });

    if (!users) return res.status(401).json({ error: "Authentication failed" });

    const passwordMatch = await bcrypt.compare(password, users.password);
    if (passwordMatch) {
      // eslint-disable-next-line no-undef
      const token = jwt.sign({ userId: users.uuid }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      res.json({ token });
    }
    return res.status(401).json({ error: "Authentication failed" });
  } catch (error) {
    next();
  }
};

export default { login, register };
