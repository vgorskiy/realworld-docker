const express = require('express');
const app = express();
const { host, port, db, apiUrl } = require('./configuration');
const { connectDb } = require('./helpers/db');
const axios = require('axios');

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started auth service on port ${port}`);
        console.log(`On host ${host}`);
        console.log(`Our db ${db}`);
    });
}

app.get('/test', (req, res) => {
    res.send('Api server is working');
});

app.get('/currentUser', (req, res) => {
    console.log(2222222222);

    res.json({
        id: '1234',
        email: 'foo@gmail.com'
    });
});

app.get('/api/apidata', (req, res) => {
    axios.get(`${apiUrl}/testauth`)
        .then(res => res.data)
        .then(testauth => {
            res.json({
                apidata: testauth
            });
        });
});

connectDb()
    .on('error', console.error)
    .on('disconnected', connectDb)
    .once('open', startServer);
