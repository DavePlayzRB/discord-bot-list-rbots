const { Router } = require("express");

const route = Router();

route.get("/", async (req, res) => {
    res.render("legal", {req})
});

module.exports = route;