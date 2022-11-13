const { Router } = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth-controller');

const router = new Router();

router.post(
    '/auth/register',
    body('username', 'Invalid data given').trim()
        .notEmpty().withMessage('Username field cannot be empty')
        .isLength({ min: 4, max: 36 }).withMessage('Login must be at least 4 and at most 36 characters long')
        .isAlphanumeric().withMessage('Only letters and digits are allowed'),
    body('password', 'Invalid data given').trim()
        .notEmpty().withMessage('Password field cannot be empty')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .isAscii().withMessage('Have been used invalid characters'),
    body('confirmation', 'Password confirmation field cannot be empty').trim().notEmpty(),
    body('email', 'Email validation failed, please double check').trim().notEmpty().isEmail(),
    authController.register);
router.post(
    '/auth/login',
    body('username', 'Invalid data given').trim()
        .notEmpty().withMessage('Username field cannot be empty'),
    body('password', 'Invalid data given').trim()
        .notEmpty().withMessage('Password field cannot be empty'),
    authController.login);
router.post('/auth/logout', authController.logout);
router.post(
    '/auth/password-reset',
    body('email', 'Email validation failed, please double check').trim().notEmpty().isEmail(),
    authController.resetPassword);
router.post(
    '/auth/password-reset/:token',
    body('new_password', 'Invalid data given').trim()
        .notEmpty().withMessage('Password field cannot be empty')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .isAscii().withMessage('Have been used invalid characters'),
    authController.confirmReset);

module.exports = router;