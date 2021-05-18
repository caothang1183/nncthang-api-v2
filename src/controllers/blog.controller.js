const Blog = require("@models/blog.model");
const Category = require("@models/category.model");
const { v4: uuidv4 } = require("uuid");

Blog.belongsTo(Category, { as: "category", foreignKey: "category_id" });

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
    const { category } = req.body;
    const currentCategory = await Category.findOne({
      where: { name: `${category}` },
    });
    if (currentCategory === null) {
      currentCategory = await Category.create({ name: `${category}` });
    }
    const data = req.body;
    Object.assign(data, { id: uuidv4(), category_id: currentCategory.id });

    const blog = await Blog.create(data).catch((err) => errorHandler(res, err));
    console.log(blog);
    return responseHandler(res, blog);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  const blogs = await Blog.findAll({
    include: [{ model: Category, as: "category" }],
  }).catch((err) => errorHandler(res, err));
  return responseHandler(res, blogs);
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findOne({ where: { id: id } }).catch((err) =>
    errorHandler(res, err)
  );
  return responseHandler(res, blog);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const isUpdated = await Blog.update(req.body, {
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

  const isDeleted = await Blog.destroy({
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
