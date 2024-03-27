"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const controllers_1 = require("./controllers");
const server = (0, http_1.createServer)((req, res) => {
    try {
        (0, controllers_1.controllers)(req, res);
    }
    catch (err) {
        res.statusCode = 500;
        res.end('error' + err);
    }
    res.on('finish', () => {
        // log
    });
});
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
