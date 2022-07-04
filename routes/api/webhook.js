const router = require('express').Router();
const webhookController = require('../../controllers/api/webhook.controller');

router.post('/savedata',webhookController.konnectiveWebhook);
router.get('/savedata',webhookController.konnectiveWebhook);

module.exports = router;