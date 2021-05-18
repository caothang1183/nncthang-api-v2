const categories = require("@controllers/category.controller");

const router = require("express").Router();

router.post("/", categories.create);

router.get("/", categories.findAll);

router.get("/id=:id&filter=blogs", categories.findAllBlogsByCategory);

router.get("/id=:id", categories.findOne);

router.post("/id=:id", categories.update);

router.delete("/id=:id", categories.delete);

module.exports = router;