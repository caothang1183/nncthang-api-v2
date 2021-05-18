const jwt = require("jsonwebtoken");

exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please login");
  res.redirect("/users/login");
};

exports.forwardAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/success");
};

exports.verifyAccess = (req, res, next) => {
  const { authorization } = req.headers;
  if (typeof authorization === "undefined") return res.sendStatus(403);
  const token = authorization.split("|")[1];
  try {
    var decoded = jwt.verify(token, "kagencySecret", {
      algorithms: ["HS256"],
    });
  } catch (err) {
    return res.status(401).send({ message: "Invalid Token" });
  }
  next();
};

exports.verifyDevelopment = (req, res, next) => {
  const { department, authorization } = req.headers;
  const token = authorization.split("|")[1];
  var decoded = jwt.verify(token, "kagencySecret", {
    algorithms: ["HS256"],
  });
  if (decoded["user"].role_id !== 3)
    return res
      .status(401)
      .send({ message: "your account don't have permission" });
  if (department !== "development")
    return res.status(401).send({ message: "department can not define" });
  next();
};

exports.verifyOwner = (req, res, next) => {
  const { owner } = req.headers;
  if (owner !== "nncthang")
    return res
      .status(401)
      .send({ message: "your account don't have permission" });
  next();
};
