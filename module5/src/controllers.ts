import { IncomingMessage, ServerResponse } from "http";
import { UrlWithParsedQuery, parse } from "url";
import { usersController } from "./users/users-controller";

export const controllers = (req: IncomingMessage, res: ServerResponse) => {
    const url: UrlWithParsedQuery = parse(req.url!, true);

    if (!url.pathname) {
        throw new Error('invalid url?')
    }

    const routes = url.pathname!.split('/');

    // routes[0] is an empty string because url start with / -> /api/users/

    if (routes && routes[1] !== 'api') {
        res.statusCode = 404;
        res.end('Not an API call')
    }

    const route = routes[2];

    switch (route) {
        case 'users': {
            usersController(req, res, routes.slice(3)) 
            break;
        }
        case 'test': {

            break;
        }
        default: {
            throw new Error('unknown route')
        }
    }
}