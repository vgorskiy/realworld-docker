const express = require('express');
const app = express();
const { host, port, db, authApiUrl } = require('./configuration');
const { connectDb } = require('./helpers/db');
const mongoose = require('mongoose');
const axios = require('axios');

const postSchema = new mongoose.Schema({
    name: String
});
const Post = mongoose.model('Post', postSchema);



const startServer = () => {
    app.listen(port, () => {
        console.log(`Started api service on port ${port}`);
        console.log(`On host ${host}`);
        console.log(`Our db ${db}`);

        const post = new Post({ name: 'New Post' });

        // Post.find((err, posts) => {
        //     if (err) {
        //         console.error(err);

        //         return;
        //     }

        //     console.log(posts);
        // });

        console.log('1');

        post.save((err, savedPost) => {
            if (err) {
                console.error(err);

                return;
            }

            console.log(savedPost);
        });
    });
}

app.get('/test', (req, res) => {
    res.send('Api server is working');
});

app.get('/api/currentUser', (req, res) => {

    axios.get(`${authApiUrl}/currentUser`)
        .then(res => res.data)
        .then(currentUser => {
            res.json({
                currentUser
            });
        });
});

app.get('/currentUser1', (req, res) => {

    console.log(111111111111);

    axios.get(`${authApiUrl}/currentUser`)
        .then(res => res.data)
        .then(currentUser => {
            res.json({
                server: 'api',
                currentUser
            });
        });
});

app.get('/api/testauth', (req, res) => {
    res.json({
        testauth: true
    });
});

connectDb()
    .on('error', console.error)
    .on('disconnected', connectDb)
    .once('open', startServer);
