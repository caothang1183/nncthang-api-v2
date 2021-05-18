const topics = require("@controllers/topic.controller");

const router = require("express").Router();

router.post("/", topics.create);

router.get("/", topics.findAll);

router.get("/id=:id&filter=projects", topics.findAllProjectByTopic);

router.get("/id=:id", topics.findOne);

router.post("/id=:id", topics.update);

router.delete("/id=:id", topics.delete);

module.exports = router;