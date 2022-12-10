const { Router } = require('express');
const router = Router();
const likesController = require('../../controllers/Likes/Likes');
const { verifyToken } = require('../../middleware/verifyToken');

router.post('/', verifyToken, likesController.updateLikeDislike);

module.exports = router;