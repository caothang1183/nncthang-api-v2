const Project = require("@models/project.model");
const Topic = require("@models/topic.model");
const PaginationUtils = require("@utils/pagination.utils");
const HandlerUtils = require("@utils/handler.utils");
const { v4: uuidv4 } = require("uuid");

Project.belongsTo(Topic, { as: "topic", foreignKey: "topic_id" });

exports.create = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).send({
        message: "fields can not empty",
      });

    const data = req.body;
    Object.assign(data, { id: uuidv4(), created_at: Date.now() });

    const project = await Project.create(data).catch((err) =>
      HandlerUtils.errorHandler(res, err)
    );
    return HandlerUtils.responseHandler(res, project);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  let include = [{ model: Topic, as: "topic" }];
  const { page, limit } = req.query;
  const data = await PaginationUtils.paginate(Project, page, limit, include);
  HandlerUtils.responseHandler(res, data);
  return HandlerUtils.responseHandler(res, data);
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  const project = await Project.findOne({ where: { id: id } }).catch((err) =>
    HandlerUtils.errorHandler(res, err)
  );
  return HandlerUtils.responseHandler(res, project);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  Object.assign(data, { id: uuidv4(), updated_at: Date.now() });
  const isUpdated = await Project.update(data, {
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

  const isDeleted = await Project.destroy({
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

exports.deleteAll = async (req, res) => {
  const userCount = await User.destroy({
    where: {},
    truncate: false,
  }).catch((err) => HandlerUtils.errorHandler(res, err));
  return res.status(200).send({ message: `${userCount} data rows deleted` });
};

exports.findAllActive = async (req, res) => {
  const users = await Project.findAll({ where: { deleted: false } }).catch(
    (err) => HandlerUtils.errorHandler(res, err)
  );
  return HandlerUtils.responseHandler(res, users);
};
