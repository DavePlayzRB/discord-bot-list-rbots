const { Router } = require("express");

const route = Router();

route.get("/", async (req, res) => {
    res.render("topbots", {req})
});

module.exports = route;