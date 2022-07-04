
const router = require('express').Router();

router.use("/calculateYTD",   require("./calculateYTD"));
router.use("/calculatePrevYTD",   require("./calculatePrevYTD"));

module.exports = router;