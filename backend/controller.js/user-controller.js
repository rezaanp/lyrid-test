import { Op } from "sequelize";
import user from "../models/user-model.js";
import bcrypt from "bcrypt";

const get = async (req, res, next) => {
  try {
    const { pageIndex = 0, limit = 10, search = "" } = req.query;
    const offset = pageIndex * limit;

    const options = {
      attributes: ["uuid", "name", "username", "createdAt"],
      offset: offset,
      limit: parseInt(limit),
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { username: { [Op.like]: `%${search}%` } },
        ],
      },
    };

    const users = await user.findAll(options);
    const total = await user.count({ where: options.where });
    const numberOfPages = Math.ceil(total / limit);

    res.json({
      total,
      pageIndex: Number(pageIndex),
      numberOfPages,
      data: users?.map((user) => ({
        ...user?.dataValues,
        isEditable: req.userId === user?.uuid,
      })),
    });
  } catch (error) {
    next();
  }
};

const getById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const userById = await user.findOne({
      attributes: ["name", "username", "createdAt"],
      where: {
        uuid: userId,
      },
    });

    if (!userById) return res.status(403).json({ error: "Data Not Found" });

    res.json(userById);
  } catch (error) {
    next();
  }
};

const create = async (req, res, next) => {
  try {
    const { name, username, password, confirmPassword } = req.body;

    const userByUsername = await user.findOne({
      where: {
        username,
      },
    });

    if (userByUsername)
      return res.status(400).json({ error: "Username already exists" });

    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ error: "Password and confirm password do not match" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await user.create({ name, username, password: hashedPassword });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next();
  }
};

const update = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, username, password, confirmPassword } = req.body;

    const userById = await user.findOne({
      where: {
        uuid: userId,
      },
    });

    const userByUsername = await user.findOne({
      where: {
        username,
      },
    });

    if (!userById) return res.status(404).json({ error: "Data Not Found" });

    const isEditable = req.userId === userId;
    if (!isEditable) return res.status(403).json({ error: "Not Your Access" });
    //CHECK USERNAME EXIST
    if (userByUsername) {
      if (userByUsername.uuid !== userById.uuid)
        return res.status(400).json({ error: "Username already exists" });
    }
    //CHECK PASSWORD AND CONFIRM PASSWORD
    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ error: "Password and confirm password do not match" });

    //SET PASSWORD
    let hasPassword;
    if (!password && !confirmPassword) {
      hasPassword = userById.password;
    } else {
      hasPassword = await bcrypt.hash(password, 10);
    }

    (userById.name = name), (userById.username = username);
    userById.password = hasPassword;

    await userById.save();

    res.json({ message: "User Updated successfully" });
  } catch (error) {
    next();
  }
};

const remove = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const userById = await user.findOne({
      where: {
        uuid: userId,
      },
    });

    if (!userById) return res.status(404).json({ error: "Data Not Found" });

    const isDeletable = req.userId === userId;
    if (!isDeletable) return res.status(403).json({ error: "Not Your Access" });

    await userById.destroy();

    res.status(204).end();
  } catch (error) {
    next();
  }
};

export default { get, getById, create, update, remove };
