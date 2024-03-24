import { ServerResponse } from "http";
import { DB } from "../../db/db";
import { User } from "../../types/User";

export const getService = (res: ServerResponse, routes: Array<string>) => {
  res.setHeader('Content-Type', 'application/json');

  if (routes.length === 0) {
    try {
      const users = DB;

      res.statusCode = 200;
      res.end(JSON.stringify(users));
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Error with reading Database' }));
    }
  } else {
    const [requestId, hobbies] = routes;
    let user: User | undefined;

    try {
      user = DB.find(user => user.id === requestId);
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Error with reading Database' }));
    }

    if (!user) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: `user with id ${requestId} does not exist` }));
    }

    if (hobbies) {
      const hobbies = user && user.hobbies ? user.hobbies : [];

      res.statusCode = 200;
      res.end(JSON.stringify({
        data: {
          hobbies,
          links: {
            self: `/api/users/${requestId}/hobbies`,
            user: `/api/users/${requestId}`,
          }
        }
      }
      ));
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify(user));
    }
  }
}