const roles = require("@controllers/role.controller");
const auth = require("@authentication/verify.auth");
const router = require("express").Router();

router.get("/roles", roles.findAll);

router.post("/roles", auth.verifyAccess, roles.create);

router.get("/roles/id=:id&filter=users", roles.findAllUserWithRole);

router.get("/roles/id=:id", roles.findOne);

router.post("/roles/id=:id", auth.verifyAccess, roles.update);

router.delete("/roles/id=:id", auth.verifyAccess, roles.delete);

module.exports = router;
