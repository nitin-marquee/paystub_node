const router = require('express').Router();

const calculatePrevYTDAPI = require('../../controllers/api/calculate.controller');


  // ========== [API Routes] ================ //
router.post('/calcute',calculatePrevYTDAPI.calculate);

module.exports = router;