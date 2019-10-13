const express = require('express');
const bodyParser = require('body-parser')
const router = require('./modules/router');

const server = express();
const port = 3000;

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(router);
server.use('/statics', express.static('public'));

server.listen(port, () => console.log(`kittens are awake on port ${port}`));