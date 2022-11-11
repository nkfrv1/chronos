const { Router } = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/user-controller');

const router = new Router();

router.post(
    '/users',
    body('username', 'Invalid data given').trim()
        .notEmpty().withMessage('Username field cannot be empty')
        .isLength({ min: 4, max: 36 }).withMessage('Username must be at least 4 and at most 36 characters long')
        .isAlphanumeric().withMessage('Only letters and digits are allowed'),
    body('password', 'Invalid data given').trim()
        .notEmpty().withMessage('Password field cannot be empty')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .isAscii().withMessage('Have been used invalid characters'),
    body('email', 'Email validation failed, please double check').trim().notEmpty().isEmail(),
    userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getSpecificUser);
router.patch('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;