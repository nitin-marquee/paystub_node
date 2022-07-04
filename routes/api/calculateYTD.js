const router = require('express').Router();

const calculatePrevYTDAPI = require('../../controllers/api/calculate.controller');


  // ========== [API Routes] ================ //
router.get('/calcute',calculatePrevYTDAPI.calculate);

module.exports = router;