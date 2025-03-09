require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// middlewares
app.use(express.static(path.join(__dirname, "public")));

app.get("/");

app.use("*", (req, res) => {
  res.redirect("/not-found.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
