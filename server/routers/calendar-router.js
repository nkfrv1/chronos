const { Router } = require('express');
const calendarController = require('../controllers/calendar-controller');

const router = new Router();

router.post('/calendars', calendarController.createCalendar);
router.get('/calendars', calendarController.getCalendars);
router.get('/calendars/:id', calendarController.getSpecificCalendar);
router.get('/calendars/:id/events', calendarController.getCalendarEvents);
router.patch('/calendars/:id', calendarController.updateCalendar);
router.delete('/calendars/:id', calendarController.deleteCalendar);

module.exports = router;