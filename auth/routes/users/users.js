const { Router } = require('express');
const userController = require('../../controllers/users/users');
const { verifyToken } = require('../../middleware/verifyToken');

// console.log(verifyToken())

const router = Router();

router.post('/register', userController.signup);
router.post('/login', userController.login);
router.get('/myProfile', verifyToken, userController.getMyDetails);

module.exports = router;