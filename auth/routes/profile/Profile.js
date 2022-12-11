const { Router } =  require('express');
const profileController = require('../../controllers/profile/Profile');
const router = Router();

router.post('/', profileController.createProfile);

module.exports = router;
