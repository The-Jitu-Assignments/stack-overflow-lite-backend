const { Router } = require('express');
const router = Router();
const likesController = require('../../controllers/Likes/Likes');

router.post('/', likesController.addLike);

module.exports = router;