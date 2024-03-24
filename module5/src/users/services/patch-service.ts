import { IncomingMessage, ServerResponse } from "http";
import { DB } from "../../db/db";
import { User } from "../../types/User";

export const patchService = (req: IncomingMessage, res: ServerResponse, routes: Array<string>) => {
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

    req.on('data', (chunk: any) => {
        body += chunk.toString();
    }).on('error', (error: any) => {
        console.error(error);
        res.statusCode = 500;
        res.end('error occurred reading post body');
    });

    req.on('end', () => {
        const { hobbies }: { hobbies: Array<string> } = JSON.parse(body);
        if (!hobbies || hobbies.length === 0) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'There is no hobbies to add or remove' }));
        }

        let user: User | undefined;
        let userIndex: number | null = null;

        try {
            user = DB.find(user => user.id === requestId);
            userIndex = DB.findIndex(user => user.id === requestId);
        } catch (error) {
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
                console.log('removed', existingHobbies)
            } else {
                existingHobbies.push(hobby);
                console.log('added', existingHobbies)
            }
            if (user && userIndex !== null) {
                DB[userIndex] = { ...user, hobbies: existingHobbies };
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
        }
        ));
    })
}
