const User = require("@models/user.model");
const Role = require("@models/role.model");
const HandlerUtils = require("@utils/handler.utils");
const PaginationUtils = require("@utils/pagination.utils");

Role.hasMany(User, { as: "Users", foreignKey: "role_id" });

exports.create = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).send({
        message: "fields can not empty",
      });
    const data = req.body;
    Object.assign(data, { id: uuidv4(), created_at: Date.now() });

    const role = await Role.create(data).catch((err) =>
      HandlerUtils.errorHandler(res, err)
    );
    return HandlerUtils.responseHandler(res, role);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  const { page, limit } = req.query;
  const data = await PaginationUtils.paginate(Role, page, limit);
  return HandlerUtils.responseHandler(res, data);
};

exports.findAllUserWithRole = async (req, res) => {
  const id = req.params.id;
  var condition = id ? { role_id: `${id}` } : null;
  const users = await User.findAll({
    where: condition,
  }).catch((err) => HandlerUtils.errorHandler(res, err));
  return HandlerUtils.responseHandler(res, users);
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  console.log(req.query);
  const role = await Role.findByPk(id).catch((err) =>
    HandlerUtils.errorHandler(res, err)
  );
  return HandlerUtils.responseHandler(res, role);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const isUpdated = await Role.update(req.body, {
    where: { id: id },
  }).catch((err) => HandlerUtils.errorHandler(res, err));
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
  }).catch((err) => HandlerUtils.errorHandler(res, err));
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
