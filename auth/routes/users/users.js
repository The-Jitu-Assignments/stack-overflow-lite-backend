const { Router } = require('express');

const userController = require('../../controllers/users/users');

const router = Router();

router.post('/register', userController.signup);
router.post('/login', userController.login);

module.exports = router;