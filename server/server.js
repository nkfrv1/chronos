const dotenvExpand = require('dotenv-expand');
dotenvExpand.expand(require('dotenv').config());
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const errorMiddleware = require('./middlewares/error-middleware');
const userRouter = require('./routers/user-router');


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('static'));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.disable('x-powered-by');
app.use(fileUpload());
app.use('/api', userRouter);
app.use(errorMiddleware);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});