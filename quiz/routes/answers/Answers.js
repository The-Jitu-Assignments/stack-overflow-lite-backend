const { Router } = require('express');
const answersController = require('../../controllers/answers/Answers');

const router = Router();

router.post('/', answersController.addAnswer);

module.exports = router;