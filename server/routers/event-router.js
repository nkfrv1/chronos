const { Router } = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const eventController = require('../controllers/event-controller');

const router = new Router();

router.post('/events', authMiddleware, eventController.createEvent);
router.get('/events', authMiddleware, eventController.getEvents);
router.get('/events/:id', authMiddleware, eventController.getSpecificEvent);
router.patch('/events/:id', authMiddleware, eventController.updateEvent);
router.delete('/events/:id', authMiddleware, eventController.deleteEvent);

module.exports = router;