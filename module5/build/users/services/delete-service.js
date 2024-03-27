"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteService = void 0;
const db_1 = require("../../db/db");
const deleteService = (res, routes) => {
    res.setHeader('Content-Type', 'application/json');
    let users = [];
    try {
        users = db_1.DB;
    }
    catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Error with reading Database' }));
    }
    const [requestId] = routes;
    try {
        const userToDelete = db_1.DB.find(user => user.id === requestId);
        if (!userToDelete) {
            res.statusCode = 404;
            res.end(JSON.stringify({ data: null, error: `user with id ${requestId} does not exist` }));
        }
        if (userToDelete) {
            const userIndex = users.findIndex(user => user.id !== userToDelete.id);
            db_1.DB.splice(userIndex, 1);
            res.statusCode = 200;
            res.end(JSON.stringify({
                "data": {
                    "success": true
                },
                "error": null
            }));
        }
    }
    catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.end(JSON.stringify({ data: null, error: 'Error with reading/writing Database' }));
    }
};
exports.deleteService = deleteService;
