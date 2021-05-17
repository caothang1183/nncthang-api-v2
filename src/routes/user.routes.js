const users = require("@controllers/user.controller");

const router = require("express").Router();

router.post("/register", users.create);

router.get("/", users.findAll);

router.get("/status=activated", users.findAllActive);

router.get("/username=:username", users.findOne);

router.put("/id=:id", users.update);

router.delete("/id=:id", users.delete);

router.delete("/users", users.deleteAll);

module.exports = router;