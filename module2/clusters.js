import cluster from 'cluster';
import http from 'http';
import os from 'os';

const port = 6666;

const requestH = (req, res) => {
    res.writeHead(200);
    if (req.url === '/error') {
        throw new Error('errrrrr');
    } else {
        res.end('<div>good response</div>')
    }
}

const server = http.createServer(requestH);

console.log(`${cluster.isPrimary ? 'primary cluster' : 'working class hero'}`);

if (cluster.isPrimary) {
    const cpus = os.cpus().length;

    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }

    cluster.on('fork', (worker) => {
        console.log(`worker - ${worker.id}`)
    })

    cluster.on('listening', (worker, address) => {
        console.log(`this worker: ${worker.id} --> this port: ${JSON.stringify(address.port)}`)
        worker.on('message', messageHandler)
    })

    cluster.on('disconnect', (worker) => {
        console.log(`worker disconnected: ${worker.id}`)
    })

    cluster.on('exit', (worker) => {
        console.log(`worker exit: ${worker.id}`)
    })

    let numRequest = 0;

    function messageHandler(message) {
        if (message.cmd && message.cmd === 'notifyRequest') {
            numRequests += 1;
            console.log(`Requests received: ${numRequests}`);
        }
    }
} else {
    server.listen(port + cluster.worker.id, (error) => {
        if (error) {
            return console.log(`Server error ${error}`);
        }
        console.log(`Server running :${port + cluster.worker.id}/`);
    })

    process.on('uncaughtException', (error) => {
        console.error(`${(new Date).toUTCString()} uncaught exception: ${error.message}`);
        console.error(error.stack);
        process.exit(1);
    });
}
