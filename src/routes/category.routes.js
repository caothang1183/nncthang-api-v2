const categories = require("@controllers/category.controller");

const router = require("express").Router();

router.get("/categories", categories.findAll);

router.post("/categories", categories.create);

router.get("/categories/id=:id&filter=blogs", categories.findAllBlogsByCategory);

router.get("/categories/id=:id", categories.findOne);

router.post("/categories/id=:id", categories.update);

router.delete("/categories/id=:id", categories.delete);

module.exports = router;