const express = require('express');
const Datastore = require('nedb');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Setup API Server

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
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