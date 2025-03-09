require("dotenv").config();
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const app = express();
const port = process.env.PORT;

const frontendUrl = process.env.FRONTEND_URL;
// middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());

app.get("/services/redirect", (req, res) => {
  const { link } = req.query;
  if (!link) {
    return res.redirect("/not-found.html");
  }
  const decodedLink = decodeURI(link);
  res.redirect(frontendUrl + decodedLink);
});

app.use("*", (_req, res) => {
  res.redirect("/not-found.html");
});

app.listen(port, () => {
  console.log(`shortener app listening on port ${port}`);
});
