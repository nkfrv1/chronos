const { Router } = require('express');
const eventController = require('../controllers/event-controller');

const router = new Router();

router.post('/events', eventController.createEvent);
router.get('/events', eventController.getEvents);
router.get('/events/:id', eventController.getSpecificEvent);
router.patch('/events/:id', eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);

module.exports = router;