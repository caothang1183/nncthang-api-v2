const User = require("@models/user.model");
const Role = require("@models/role.model");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

User.belongsTo(Role, { as: "role", foreignKey: "role_id" });

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

    const { first_name, last_name, username, email, password } = req.body;
    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const newUser = {
          id: uuidv4(),
          first_name: first_name,
          last_name: last_name,
          username: username,
          role_id: 1,
          email: email,
          password: hash,
        };
        const user = await User.create(newUser).catch((err) =>
          errorHandler(res, err)
        );
        return responseHandler(res, user);
      });
    });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: `${username}` } : null;

  const users = await User.findAll({
    where: condition,
    include: [{ model: Role, as: "role" }],
  }).catch((err) => errorHandler(res, err));
  return responseHandler(res, users);
};

exports.findOne = async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ where: { username: username } }).catch((err) =>
    errorHandler(res, err)
  );
  return responseHandler(res, user);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const isUpdated = await User.update(req.body, {
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

  const isDeleted = await User.destroy({
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
  const users = await User.findAll({ where: { activated: true } }).catch((err) =>
    errorHandler(res, err)
  );
  return responseHandler(res, users);
};