const projects = require("@controllers/project.controller");

const router = require("express").Router();

router.post("/", projects.create);

router.get("/", projects.findAll);

router.get("/id=:id", projects.findOne);

router.post("/id=:id", projects.update);

router.delete("/id=:id", projects.delete);

router.delete("/all", projects.deleteAll);

module.exports = router;