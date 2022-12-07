const { Router } = require('express');
const questionsController = require('../../controllers/questions/Questions');

const router = Router();

router.post('/create', questionsController.createQuestion);

module.exports = router