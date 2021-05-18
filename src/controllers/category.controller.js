const Blog = require("@models/blog.model");
const Category = require("@models/category.model");

Category.hasMany(Blog, { as: "Blogs", foreignKey: "category_id" });

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
    const category = await Category.create({ name, description }).catch((err) =>
      errorHandler(res, err)
    );
    return responseHandler(res, category);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  const categories = await Category.findAll().catch((err) =>
    errorHandler(res, err)
  );
  return responseHandler(res, categories);
};

exports.findAllBlogsByCategory = async (req, res) => {
  const id = req.params.id;
  var condition = id ? { category_id: `${id}` } : null;

  const blogs = await Blog.findAll({
    where: condition,
  }).catch((err) => errorHandler(res, err));
  return responseHandler(res, blogs);
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  const category = await Category.findByPk(id).catch((err) =>
    errorHandler(res, err)
  );
  return responseHandler(res, category);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const isUpdated = await Category.update(req.body, {
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
  const isDeleted = await Category.destroy({
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
