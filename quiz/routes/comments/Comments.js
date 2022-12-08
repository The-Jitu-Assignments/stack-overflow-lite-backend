const { Router } = require('express');
const router = Router();
const commentsController = require('../../controllers/comments/Comments');
const { verifyToken } = require('../../middleware/verifyToken');

router.post('/', verifyToken, commentsController.addComment);

module.exports = router;