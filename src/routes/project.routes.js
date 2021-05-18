const projects = require("@controllers/project.controller");
const auth = require("@authentication/verify.auth");
const router = require("express").Router();

router.post("/projects", auth.verifyAccess, projects.create);

router.get("/projects", projects.findAll);

router.get("/projects/id=:id", projects.findOne);

router.post("/projects/id=:id", auth.verifyAccess, projects.update);

router.delete("/projects/id=:id", auth.verifyAccess, projects.delete);

router.delete("/projects/all", auth.verifyAccess, projects.deleteAll);

module.exports = router;
