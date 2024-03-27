"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const url_1 = require("url");
const users_controller_1 = require("./users/users-controller");
const controllers = (req, res) => {
    const url = (0, url_1.parse)(req.url, true);
    if (!url.pathname) {
        throw new Error('invalid url?');
    }
    const routes = url.pathname.split('/');
    // routes[0] is an empty string because url start with / -> /api/users/
    if (routes && routes[1] !== 'api') {
        res.statusCode = 404;
        res.end('Not an API call');
    }
    const route = routes[2];
    switch (route) {
        case 'users': {
            (0, users_controller_1.usersController)(req, res, routes.slice(3));
            break;
        }
        case 'test': {
            break;
        }
        default: {
            throw new Error('unknown route');
        }
    }
};
exports.controllers = controllers;
