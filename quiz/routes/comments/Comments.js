const { Router } = require('express');
const router = Router();
const commentsController = require('../../controllers/comments/Comments');

router.post('/', commentsController.addComment);

module.exports = router;