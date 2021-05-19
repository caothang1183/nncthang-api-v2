const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000 || process.env.PORT;
require("module-alias/register");
require("@database/connection");
const routerApi = require("@routes/index.routes");
app.use(cors());
app.use(express.static('dist'));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use("/api", routerApi);

// error api routes not exist
app.get("/*", (_, res) => {
  res.status(404).json({
      message: "Not Found",
      description: "Page not found",
  });
});

app.listen(PORT, (err) => {
  if (err) return console.log("Fail to load Server");
  console.log(`Server is running on port:${PORT}`);
});
