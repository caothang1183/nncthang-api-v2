const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
const PORT = 5000 || process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(router);
require("module-alias/register");
require("@database/connection");

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to nncthang API" });
});

const userRoute = require("@routes/user.routes");
app.use("/api/users", userRoute);
const roleRoute = require("@routes/role.routes");
app.use("/api/roles", roleRoute);

app.listen(PORT, (err) => {
  if (err) return console.log("Fail to load Server");
  console.log(`Server is running on port:${PORT}`);
});
