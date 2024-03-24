import { IncomingMessage, ServerResponse } from "http";

export const deleteService = (req: IncomingMessage, res: ServerResponse) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('this is delete');
}