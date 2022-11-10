const dotenvExpand = require('dotenv-expand');
dotenvExpand.expand(require('dotenv').config());
const express = require('express');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('static'));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.disable('x-powered-by');

app.get('/', (req, res) => {
    res.send(`<h1>Root</h1>`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});