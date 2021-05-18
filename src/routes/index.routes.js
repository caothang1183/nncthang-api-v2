const express = require('express');
const router = express.Router();
const userRoutes = require("@routes/user.routes");
const roleRoutes = require("@routes/role.routes");
const projectRoutes = require("@routes/project.routes");
const categoryRoutes = require("@routes/category.routes");
const blogRoutes = require("@routes/blog.routes");
const topicRoutes = require("@routes/topic.routes");

router.get("/api", (req, res) => {
  res.json({ message: "Welcome to nncthang API" });
})

router.use(express.json());

router.use(roleRoutes);
router.use(userRoutes);
router.use(projectRoutes);
router.use(categoryRoutes);
router.use(blogRoutes);
router.use(topicRoutes);

module.exports = router;