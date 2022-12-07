const { Router } = require('express');
const answersController = require('../../controllers/answers/Answers');
const { verifyToken } = require('../../middleware/verifyToken');

const router = Router();

router.post('/', verifyToken, answersController.addAnswer);

module.exports = router;