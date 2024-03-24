import { IncomingMessage, ServerResponse } from "http";
import {
    getService,
    postService,
    deleteService,
    patchService,
} from "./services/";

export const usersController = (req: IncomingMessage, res: ServerResponse, routes: Array<string>) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            getService(res, routes);
            break;
        case 'POST':
            postService(req, res);
            break;
        case 'DELETE':
            deleteService(req, res);
            break;
        case 'PATCH':
            patchService(req, res, routes);
            break;
        default: {
            throw new Error('no method????');
        }
    }
}