const { Router } = require('express');
const questionsController = require('../../controllers/questions/Questions');
const { verifyToken } = require('../../middleware/verifyToken');

const router = Router();

router.post('/', verifyToken, questionsController.createQuestion);
router.get('/', questionsController.getQuestions);
router.get('/myQuestions', verifyToken, questionsController.getMyQuestions);
router.get('/:id', questionsController.getQuestion);
router.delete('/:id', verifyToken, questionsController.deleteQuestion);
router.get('/quiz/searchQn', questionsController.findQuestions);
router.get('/quiz/mostAnsweredQn', questionsController.getMostAnsweredQn);


module.exports = router