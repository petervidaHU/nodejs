import { createServer } from 'http';
import { controllers } from './controllers';
import { DB } from './db/db';

const server = createServer((req, res) => {
    try {
        controllers(req, res)
    } catch (err) {
        res.statusCode = 500;
        res.end('error' + err)
    }

    res.on('finish', () => {
        // log
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});