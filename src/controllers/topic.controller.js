const Project = require("@models/project.model");
const Topic = require("@models/topic.model");

Topic.hasMany(Project, { as: "Projects", foreignKey: "topic_id" });

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
    const topic = await Topic.create({ name, description }).catch(err => errorHandler(res, err));
    return responseHandler(res, topic);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  const topics = await Topic.findAll().catch(err => errorHandler(res, err));
  return responseHandler(res, topics);
};

exports.findAllProjectByTopic = async (req, res) => {
  const id = req.params.id;
  var condition = id ? { topic_id: `${id}` } : null;

  const projects = await Project.findAll({
    where  : condition,
  }).catch(err => errorHandler(res, err));
  return responseHandler(res, projects);
};   

exports.findOne = async (req, res) => {
  const id = req.params.id;
  const topic = await Topic.findByPk(id).catch(err => errorHandler(res, err));
  return responseHandler(res, topic);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const isUpdated = await Topic.update(req.body, {
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

  const isDeleted = await Topic.destroy({
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

