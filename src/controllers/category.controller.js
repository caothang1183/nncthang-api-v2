const Blog = require("@models/blog.model");
const Category = require("@models/category.model");
const PaginationUtils = require("@utils/pagination.utils");
const HandlerUtils = require("@utils/handler.utils");
Category.hasMany(Blog, { as: "Blogs", foreignKey: "category_id" });

exports.create = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).send({
        message: "fields can not empty",
      });
    const created_at = Date.now();
    const { name, description } = req.body;
    const category = await Category.create({ name, description, created_at }).catch((err) =>
      HandlerUtils.errorHandler(res, err)
    );
    return HandlerUtils.responseHandler(res, category);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  const { page, limit } = req.query;
  const data = await PaginationUtils.paginate(Category, page, limit);
  return HandlerUtils.responseHandler(res, data);
};

exports.findAllBlogsByCategory = async (req, res) => {
  const id = req.params.id;
  var condition = id ? { category_id: `${id}` } : null;

  const blogs = await Blog.findAll({
    where: condition,
  }).catch((err) => HandlerUtils.errorHandler(res, err));
  return HandlerUtils.responseHandler(res, blogs);
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  const category = await Category.findByPk(id).catch((err) =>
    HandlerUtils.errorHandler(res, err)
  );
  return HandlerUtils.responseHandler(res, category);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  Object.assign(data, {
    updated_at: Date.now()
  });
  const isUpdated = await Category.update(req.body, {
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
  const isDeleted = await Category.destroy({
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
