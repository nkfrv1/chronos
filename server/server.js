const dotenvExpand = require('dotenv-expand');
dotenvExpand.expand(require('dotenv').config());
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const authRouter = require('./routers/auth-router');
const userRouter = require('./routers/user-router');
const calendarRouter = require('./routers/calendar-router');
const categoryRouter = require('./routers/category-router');
const eventRouter = require('./routers/event-router');
const errorMiddleware = require('./middlewares/error-middleware');


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('static'));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.disable('x-powered-by');
app.use(fileUpload());
app.use('/api', authRouter, userRouter, calendarRouter, categoryRouter, eventRouter);
app.use(errorMiddleware);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
