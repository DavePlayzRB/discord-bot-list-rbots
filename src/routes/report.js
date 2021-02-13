const { Router } = require("express");

const route = Router();

route.get("/", async (req, res) => {
    res.render("report", {req})
});

module.exports = route;