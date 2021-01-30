const { Router } = require("express");

const route = Router();

route.get("/", async (req, res) => {
    res.render("rules", {req})
});

module.exports = route;