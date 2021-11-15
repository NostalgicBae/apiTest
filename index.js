const express = require('express');
const Datastore = require('nedb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Setup API Server

app.listen(port, () => console.log(`Starting server at ${port}`));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

// Setup Database

const database = new Datastore('database.db');
database.loadDatabase();

// Setup GET API route

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return
        }
        response.json(data);
    });
});

// Setup POST API route

app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});