const { Router } = require('express');
const questionsController = require('../../controllers/questions/Questions');
const { verifyToken } = require('../../middleware/verifyToken');

const router = Router();

router.post('/', verifyToken, questionsController.createQuestion);
router.get('/', questionsController.getQuestions);

module.exports = router