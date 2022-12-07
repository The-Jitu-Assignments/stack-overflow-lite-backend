const { Router } = require('express');
const questionsController = require('../../controllers/questions/Questions');
const { verifyToken } = require('../../middleware/verifyToken');

const router = Router();

router.post('/create', verifyToken, questionsController.createQuestion);

module.exports = router