const blogs = require("@controllers/blog.controller");

const router = require("express").Router();

router.post("/", blogs.create);

router.get("/", blogs.findAll);

router.get("/id=:id", blogs.findOne);

router.post("/id=:id", blogs.update);

router.delete("/id=:id", blogs.delete);

router.delete("/all", blogs.deleteAll);

module.exports = router;