import { ServerResponse } from "http";
import { DB } from "../../db/db";
import { User } from "../../types/User";

export const deleteService = (res: ServerResponse, routes: Array<string>) => {
    res.setHeader('Content-Type', 'application/json');
    let users: User[] = [];
    try {
        users = DB;
    } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Error with reading Database' }));
    }

    const [requestId] = routes;

    try {
        const userToDelete: User | undefined = DB.find(user => user.id === requestId);

        if (!userToDelete) {
            res.statusCode = 404;
            res.end(JSON.stringify({ data: null, error: `user with id ${requestId} does not exist` }));
        }
        if (userToDelete) {
            const userIndex = users.findIndex(user => user.id !== userToDelete.id)
            DB.splice(userIndex, 1);
            res.statusCode = 200;
            res.end(JSON.stringify({
                "data": {
                    "success": true
                },
                "error": null
            }));
        }
    } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.end(JSON.stringify({ data: null, error: 'Error with reading/writing Database' }));
    }
}
