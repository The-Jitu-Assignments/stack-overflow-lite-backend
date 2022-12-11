const { Router } =  require('express');
const profileController = require('../../controllers/profile/Profile');
const { verifyToken } = require('../../middleware/verifyToken');
const router = Router();

router.post('/', verifyToken, profileController.createProfile);
router.get('/:userId', profileController.getProfile)

module.exports = router;
