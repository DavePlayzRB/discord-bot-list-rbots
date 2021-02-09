const { Router } = require("express");

const route = Router();

route.get("/", async (req, res) => {
    res.render("certification", {req})
});

module.exports = route;