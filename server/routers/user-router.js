const { Router } = require('express');
const userController = require('../controllers/user-controller');

const router = new Router();

router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getSpecificUser);
router.get('/users/:id/calendars', userController.getUserCalendars); // Not sure that it must be here
router.patch('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;