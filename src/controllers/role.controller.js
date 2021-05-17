const User = require("@models/user.model");
const Role = require("@models/role.model");

Role.hasMany(User, { as: "Users", foreignKey: "role_id" });

const errorHandler = (res, err) =>
  res.status(500).send({
    message: err.message || "Error occurred",
  });

const responseHandler = (res, data) => res.status(200).send(data);

exports.create = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).send({
        message: "fields can not empty",
      });
    const { name, description } = req.body;
    const role = await Role.create({ name, description }).catch(err => errorHandler(res, err));
    return responseHandler(res, role);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  const roles = await Role.findAll().catch(err => errorHandler(res, err));
  return responseHandler(res, roles);
};

exports.findAllUserWithRole = async (req, res) => {
  const id = req.params.id;
  var condition = id ? { role_id: `${id}` } : null;

  const users = await User.findAll({
    where  : condition,
  }).catch(err => errorHandler(res, err));
  return responseHandler(res, users);
};   

exports.findOne = async (req, res) => {
  const id = req.params.id;
  const role = await Role.findByPk(id).catch(err => errorHandler(res, err));
  return responseHandler(res, role);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const isUpdated = await Role.update(req.body, {
    where: { id: id },
  }).catch((err) => errorHandler(res, err));
  if (isUpdated == 1) {
    res.status(200).send({
      message: "updated data successfully!",
    });
  } else {
    res.status(500).send({
      message: `cannot delete data with id=${id}.`,
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  const isDeleted = await Role.destroy({
    where: { id: id },
  }).catch((err) => errorHandler(res, err));
  if (isDeleted == 1) {
    res.status(200).send({
      message: "delete data successfully!",
    });
  } else {
    res.status(500).send({
      message: `cannot delete data with id=${id}.`,
    });
  }
};

