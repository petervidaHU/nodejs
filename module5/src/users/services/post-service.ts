import { IncomingMessage, ServerResponse } from "http";
import { DB } from "../../db/db";
import { v4 as uuid } from 'uuid';

export const postService = (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader('Content-Type', 'application/json');
    let body = '';

    req.on('data', (chunk: any) => {
        body += chunk.toString();
    }).on('error', (error: any) => {
        console.error(error);
        res.statusCode = 500;
        res.end('error occurred reading post body');
    });

    req.on('end', () => {
        try {
            const { name, email } = JSON.parse(body);
            const id = uuid();


            DB.push({
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
        } catch (error) {
            console.error(error);
            res.statusCode = 400;
            res.end('Bad request, json parsing problem Post method, body');
        }
    });
}