require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

require("./database/configDB");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const routes = require("./routes/todos");
app.use(routes);

app.listen(5000, () => {
  console.log("App listening on port 5000");
});
