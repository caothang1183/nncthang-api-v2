const blogs = require("@controllers/blog.controller");
const auth = require("@authentication/verify.auth");
const router = require("express").Router();

router.get("/blogs", blogs.findAll);

router.post("/blogs", auth.verifyAccess, blogs.create);

router.get("/blogs/id=:id", blogs.findOne);

router.post("/blogs/id=:id", auth.verifyAccess, blogs.update);

router.delete("/blogs/id=:id", auth.verifyAccess, blogs.delete);

router.delete("/blogs/all", auth.verifyAccess, blogs.deleteAll);

module.exports = router;
