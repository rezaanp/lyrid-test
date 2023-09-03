import { Op } from "sequelize";
import employee from "../models/employee-model.js";

const get = async (req, res, next) => {
  try {
    const { pageIndex = 0, limit = 10, search = "" } = req.query;
    const offset = pageIndex * limit;

    const options = {
      offset: offset,
      limit: parseInt(limit),
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { role: { [Op.like]: `%${search}%` } },
        ],
      },
    };

    const data = await employee.findAll(options);
    const total = await employee.count({ where: options.where });
    const numberOfPages = Math.ceil(total / limit);

    res.json({
      total,
      pageIndex: Number(pageIndex),
      numberOfPages,
      data,
    });
  } catch (error) {
    next();
  }
};

const getById = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    const employeeById = await employee.findOne({
      where: {
        uuid: employeeId,
      },
    });

    if (!employeeById) return res.status(403).json({ error: "Data Not Found" });

    res.json(employeeById);
  } catch (error) {
    next();
  }
};

const create = async (req, res, next) => {
  try {
    const { name, role, salary, age, imageProfil } = req.body;

    await employee.create({ name, role, salary, age, imageProfil });
    res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    next();
  }
};

const update = async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    const { name, role, salary, age, imageProfil } = req.body;

    const employeeById = await employee.findOne({
      where: {
        uuid: employeeId,
      },
    });

    if (!employeeById) return res.status(404).json({ error: "Data Not Found" });

    (employeeById.name = name),
      (employeeById.role = role),
      (employeeById.salary = salary);
    employeeById.age = age;
    employeeById.imageProfil = imageProfil;

    await employeeById.save();

    res.json({ message: "Employee Updated successfully" });
  } catch (error) {
    next();
  }
};

const remove = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    const employeeById = await employee.findOne({
      where: {
        uuid: employeeId,
      },
    });

    if (!employeeById) return res.status(404).json({ error: "Data Not Found" });

    await employeeById.destroy();

    res.status(204).end();
  } catch (error) {
    next();
  }
};

export default { get, getById, create, update, remove };
