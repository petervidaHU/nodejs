"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getService = void 0;
const db_1 = require("../../db/db");
const getService = (res, routes) => {
    res.setHeader('Content-Type', 'application/json');
    if (routes.length === 0) {
        res.setHeader('Cache-Control', 'public, max-age=3600');
        try {
            const users = db_1.DB;
            res.statusCode = 200;
            res.end(JSON.stringify(users));
        }
        catch (error) {
            console.error(error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Error with reading Database' }));
        }
    }
    else {
        const [requestId, hobbies] = routes;
        let user;
        try {
            user = db_1.DB.find(user => user.id === requestId);
        }
        catch (error) {
            console.error(error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Error with reading Database' }));
        }
        if (!user) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: `user with id ${requestId} does not exist` }));
        }
        if (hobbies) {
            res.setHeader('Cache-Control', 'private, max-age=3600');
            const hobbies = user && user.hobbies ? user.hobbies : [];
            res.statusCode = 200;
            res.end(JSON.stringify({
                data: {
                    hobbies,
                    links: {
                        self: `/api/users/${requestId}/hobbies`,
                        user: `/api/users/${requestId}`,
                    }
                }
            }));
        }
        else {
            res.statusCode = 200;
            res.end(JSON.stringify(user));
        }
    }
};
exports.getService = getService;
