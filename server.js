require('dotenv').config();
const fs = require("fs");
const https = require("https");
const path = require('path')
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const user_router = require('./routes/user_route');
const category_route = require('./routes/category_route');
const story_route = require('./routes/story_route');
const bookmark_route = require('./routes/bookmark_route');


connectDB();
const app = express();
app.use(cors());  // to accept cross origin requests
app.use(express.json()); // to accept data in json format
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    console.log("Application is successfully running")
    res.send("<h1>hello world</h1>")
});

app.use('/v1/api/users', user_router);
app.use('/v1/api/categories', category_route);
app.use('/v1/api/stories', story_route);
app.use('/v1/api/bookmarks', bookmark_route)

// ========================== Deployment Starts ==========================
app.use(express.static(path.join(__dirname, './swiptory_frontend/build')))
app.get('*', function (_, res) {
    res.sendFile(
        path.join(__dirname, './swiptory_frontend/build'),
        function (err) {
            res.status(500).send(err)
        }
    )
})

// ========================== Deployment Ends ==========================

const port = process.env.PORT || 8080;

const server = https.createServer(
    {
        key: fs.readFileSync(`./localhost+2-key.pem`, "utf8"),
        cert: fs.readFileSync(`./localhost+2.pem`, "utf8"),
    },
    app
);

server.listen(port, () => {
    console.log(`App is successfully running on port ${port}`)
});