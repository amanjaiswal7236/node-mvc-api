const express = require('express');
const userController = require('../controllers/user.controller');
const { validateUser, validateUserId, validateUserUpdate } = require('../middlewares/validators');

const router = express.Router();

router.get('/', userController.listUsers);
router.get('/:userId', validateUserId, userController.getUserById);
router.post('/', validateUser, userController.createUser);
router.put('/:userId', validateUserId, validateUserUpdate, userController.updateUser);
router.patch('/:userId', validateUserId, validateUserUpdate, userController.updateUser);
router.delete('/:userId', validateUserId, userController.deleteUser);

module.exports = router;
