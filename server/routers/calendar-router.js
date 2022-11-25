const { Router } = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const calendarController = require('../controllers/calendar-controller');

const router = new Router();

router.post('/calendars', authMiddleware, calendarController.createCalendar);
router.get('/calendars', authMiddleware, calendarController.getCalendars);
router.get('/calendars/:id', authMiddleware, calendarController.getSpecificCalendar);
router.get('/calendars/:id/events', authMiddleware, calendarController.getCalendarEvents);
router.patch('/calendars/:id', authMiddleware, calendarController.updateCalendar);
router.delete('/calendars/:id', authMiddleware, calendarController.deleteCalendar);

module.exports = router;