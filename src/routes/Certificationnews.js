const { Router } = require("express");

const route = Router();

route.get("/", async (req, res) => {
    res.render("Certificationnews", {req})
});

module.exports = route;