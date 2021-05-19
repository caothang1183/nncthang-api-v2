const Project = require("@models/project.model");
const Topic = require("@models/topic.model");
const HandlerUtils = require("@utils/handler.utils");
const PaginationUtils = require("@utils/pagination.utils");

Topic.hasMany(Project, { as: "Projects", foreignKey: "topic_id" });

exports.create = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).send({
        message: "fields can not empty",
      });
    const data = req.body;
    Object.assign(data, { id: uuidv4(), created_at: Date.now() });
    const topic = await Topic.create(data).catch((err) =>
      HandlerUtils.errorHandler(res, err)
    );
    return HandlerUtils.responseHandler(res, topic);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  const { page, limit } = req.query;
  const data = await PaginationUtils.paginate(Topic, page, limit);
  return HandlerUtils.responseHandler(res, data);
};

exports.findAllProjectByTopic = async (req, res) => {
  const id = req.params.id;
  var condition = id ? { topic_id: `${id}` } : null;

  const projects = await Project.findAll({
    where: condition,
  }).catch((err) => errorHandler(res, err));
  return responseHandler(res, projects);
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  const topic = await Topic.findByPk(id).catch((err) =>
    HandlerUtils.errorHandler(res, err)
  );
  return HandlerUtils.responseHandler(res, topic);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  Object.assign(data, { id: uuidv4(), updated_at: Date.now() });
  const isUpdated = await Topic.update(data, {
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

  const isDeleted = await Topic.destroy({
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
