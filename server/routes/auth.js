const express = require("express");
const auth = require("../controllers/auth");

const routes = express.Router();

routes.post("/", async (req, res, next) => {
  try {
    const user = await auth.login(req.body);
    res.json(user);
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    next(err);
  }
});

module.exports = routes;