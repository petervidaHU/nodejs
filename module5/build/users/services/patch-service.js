"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchService = void 0;
const db_1 = require("../../db/db");
const patchService = (req, res, routes) => {
    res.setHeader('Content-Type', 'application/json');
    const [requestId, hobbies] = routes;
    if (!requestId) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Bad request, id is needed' }));
    }
    if (!hobbies) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Updating users not implemented yet' }));
    }
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    }).on('error', (error) => {
        console.error(error);
        res.statusCode = 500;
        res.end('error occurred reading post body');
    });
    req.on('end', () => {
        const { hobbies } = JSON.parse(body);
        if (!hobbies || hobbies.length === 0) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'There is no hobbies to add or remove' }));
        }
        let user;
        let userIndex = null;
        try {
            user = db_1.DB.find(user => user.id === requestId);
            userIndex = db_1.DB.findIndex(user => user.id === requestId);
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
        const existingHobbies = user && user.hobbies ? user.hobbies : [];
        Array.from(new Set(hobbies)).forEach((hobby) => {
            const id = existingHobbies.findIndex(existingHobby => existingHobby === hobby);
            if (id > -1) {
                existingHobbies.splice(id, 1);
                console.log('removed', existingHobbies);
            }
            else {
                existingHobbies.push(hobby);
                console.log('added', existingHobbies);
            }
            if (user && userIndex !== null) {
                db_1.DB[userIndex] = Object.assign(Object.assign({}, user), { hobbies: existingHobbies });
            }
        });
        res.statusCode = 200;
        res.end(JSON.stringify({
            data: {
                user,
                links: {
                    self: `/api/users/${requestId}/hobbies`,
                    user: `/api/users/${requestId}`,
                }
            }
        }));
    });
};
exports.patchService = patchService;
