const router = require("express").Router();
const dogRoutes = require("./dogs");

router.use("/dogs", dogRoutes);

module.exports = router;