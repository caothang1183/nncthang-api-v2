const roles = require("@controllers/role.controller");

const router = require("express").Router();

router.post("/", roles.create);

router.get("/", roles.findAll);

router.get("/id=:id&filter=users", roles.findAllUserWithRole);

router.get("/id=:id", roles.findOne);

router.post("/id=:id", roles.update);

router.delete("/id=:id", roles.delete);

module.exports = router;