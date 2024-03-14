import chalk from 'chalk';
import mEventEmitter from './myEmitter.js';

class WithTime extends mEventEmitter {
    async execute(asyncFunc, ...args) {
        const startTime = new Date();
        this.eventEmitter.emit('begin')

        let dataFromFunc;
        try {
            dataFromFunc = await asyncFunc(...args);
            this.eventEmitter.emit('data', dataFromFunc)
        } catch (e) {
            console.error(chalk.red('no data fetched:'), e);
        } finally {
            let endTime = new Date();
            let diff = (endTime - startTime) / 1000;
            this.eventEmitter.emit('end', diff)
        }
    }
}

const fetchFromUrl = async (url, cb) => {
    if (!url) throw new Error('No url provided!')

    let data;
    try {
        const res = await fetch(url);
        data = await res.json();
    }
    catch (err) {
        throw new Error(`There was an error fetching: ${url}`, err)
    }

    if (cb && data) {
        cb(data)
    }

    return data;
}

const callBackForFun = (d) => {
    const prop = 'title'
    if (d && d[prop]) {
        console.log(`THE ${prop.toUpperCase()}: `, d[prop])
    } else {
        console.log(`NO ${prop.toUpperCase()} PROVIDED!`)
    }
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', (t) => console.log(chalk.yellow(`Done with execute: ${t} seconds`)));
withTime.on('data', (d) => console.log(`Data:`, d));

withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1', callBackForFun);

console.log(withTime.rawListeners("end"));