const Blog = require("@models/blog.model");
const Category = require("@models/category.model");
const PaginationUtils = require("@utils/pagination.utils");
const HandlerUtils = require("@utils/handler.utils");
const { v4: uuidv4 } = require("uuid");

Blog.belongsTo(Category, { as: "category", foreignKey: "category_id" });

exports.create = async (req, res) => {
  console.log(req.file);
  try {
    if (!req.body)
      return res.status(400).send({
        message: "fields can not empty",
      });
    const data = req.body;

    Object.assign(data, {
      id: uuidv4(),
      // url: `${req.file.destination}/${req.file.originalname}`
      created_at: Date.now()
    });

    const blog = await Blog.create(data).catch((err) =>
      HandlerUtils.errorHandler(res, err)
    );
    HandlerUtils.responseHandler(res, blog);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  let include = [{ model: Category, as: "category" }];
  const { page, limit } = req.query;
  const data = await PaginationUtils.paginate(Blog, page, limit, include);
  HandlerUtils.responseHandler(res, data);
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findOne({ where: { id: id } }).catch((err) =>
    HandlerUtils.errorHandler(res, err)
  );
  return HandlerUtils.responseHandler(res, blog);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  data = req.body;
  Object.assign(data, {
    // url: `${req.file.destination}/${req.file.originalname}`
    updated_at: Date.now()
  });
  const isUpdated = await Blog.update(data, {
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

  const isDeleted = await Blog.destroy({
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
