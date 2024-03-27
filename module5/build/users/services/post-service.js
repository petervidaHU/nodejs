"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
const db_1 = require("../../db/db");
const uuid_1 = require("uuid");
const postService = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    }).on('error', (error) => {
        console.error(error);
        res.statusCode = 500;
        res.end('error occurred reading post body');
    });
    req.on('end', () => {
        try {
            const { name, email } = JSON.parse(body);
            const id = (0, uuid_1.v4)();
            db_1.DB.push({
                name,
                email,
                id,
            });
            const response = {
                data: {
                    user: {
                        name,
                        email,
                        id,
                    },
                    links: {
                        self: `/api/users/${id}`,
                        hobbies: `/api/users/${id}/hobbies`,
                    }
                }
            };
            console.log('New user created:\n', name, '\n', email, '\n', id);
            res.statusCode = 201;
            res.end(JSON.stringify({ response }));
        }
        catch (error) {
            console.error(error);
            res.statusCode = 400;
            res.end('Bad request, json parsing problem Post method, body');
        }
    });
};
exports.postService = postService;
