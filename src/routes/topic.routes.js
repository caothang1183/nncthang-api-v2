const topics = require("@controllers/topic.controller");
const auth = require("@authentication/verify.auth");
const router = require("express").Router();

router.get("/topics", topics.findAll);

router.post("/topics", auth.verifyAccess, topics.create);

router.get("/topics/id=:id&filter=projects", topics.findAllProjectByTopic);

router.get("/topics/id=:id", topics.findOne);

router.post("/topics/id=:id", auth.verifyAccess, topics.update);

router.delete("/topics/id=:id", auth.verifyAccess, topics.delete);

module.exports = router;
