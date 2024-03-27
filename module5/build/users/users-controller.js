"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const services_1 = require("./services/");
const usersController = (req, res, routes) => {
    const { method } = req;
    switch (method) {
        case 'GET':
            (0, services_1.getService)(res, routes);
            break;
        case 'POST':
            (0, services_1.postService)(req, res);
            break;
        case 'DELETE':
            (0, services_1.deleteService)(res, routes);
            break;
        case 'PATCH':
            (0, services_1.patchService)(req, res, routes);
            break;
        default: {
            throw new Error('no method????');
        }
    }
};
exports.usersController = usersController;
