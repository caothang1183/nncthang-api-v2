const users = require("@controllers/user.controller");
const auth = require("@authentication/verify.auth");
const router = require("express").Router();

router.post("/auth", users.authentication);

router.post(
  "/users/register",
  auth.verifyDevelopment,
  auth.verifyOwner,
  users.create
);

router.get("/users", auth.verifyAccess, auth.verifyDevelopment, users.findAll);

router.get(
  "/users/status=activated",
  auth.verifyAccess,
  auth.verifyDevelopment,
  users.findAllActive
);

router.get(
  "/users/username=:username",
  auth.verifyAccess,
  auth.verifyDevelopment,
  users.findOne
);

router.put(
  "/users/id=:id",
  auth.verifyAccess,
  auth.verifyDevelopment,
  users.update
);

router.delete(
  "/users/id=:id",
  auth.verifyOwner,
  auth.verifyAccess,
  auth.verifyDevelopment,
  users.delete
);

router.delete(
  "/users/all",
  auth.verifyOwner,
  auth.verifyAccess,
  auth.verifyDevelopment,
  users.deleteAll
);

module.exports = router;
