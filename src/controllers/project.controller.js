const Project = require("@models/project.model");
const Topic = require("@models/topic.model");
const { v4: uuidv4 } = require("uuid");

Project.belongsTo(Topic, { as: "topic", foreignKey: "topic_id" });

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

    const { topic } = req.body;

    const currentTopic = await Topic.findOne({ where: { name: `${topic}` } });
    if (currentTopic === null) {
      currentTopic = await Topic.create({ name: `${topic}` });
    }
    const data = req.body;
    Object.assign(data, { id: uuidv4(), topic_id: currentTopic.id });

    const project = await Project.create(data).catch((err) =>
      errorHandler(res, err)
    );
    return responseHandler(res, project);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  const projects = await Project.findAll({
    include: [{ model: Topic, as: "topic" }],
  }).catch((err) => errorHandler(res, err));
  return responseHandler(res, projects);
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  const project = await Project.findOne({ where: { id: id } }).catch((err) =>
    errorHandler(res, err)
  );
  return responseHandler(res, project);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const isUpdated = await Project.update(req.body, {
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

  const isDeleted = await Project.destroy({
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

exports.deleteAll = async (req, res) => {
  const userCount = await User.destroy({
    where: {},
    truncate: false,
  }).catch((err) => errorHandler(res, err));
  return res.status(200).send({ message: `${userCount} data rows deleted` });
};

exports.findAllActive = async (req, res) => {
  const users = await Project.findAll({ where: { deleted: false } }).catch(
    (err) => errorHandler(res, err)
  );
  return responseHandler(res, users);
};
