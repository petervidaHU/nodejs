import http from 'http';
import https from 'https';
import url from 'url';
import fs from 'fs';

const port1 = 5004;
const port2 = 5005;

const serverPlain = http.createServer((req, res) => {
    const { query } = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/html');
    res.end(`asdfgh - ${query.aa ?? 'no aa'}`);
})

/* serverPlain.listen(port1, () => {
    console.log('plain server is running at:', port1)
}); */

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}

const serverFancy = https.createServer(options, (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    
    https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (response) => {
        let data = '';
        
        response.on('data', (chunk) => {
            data += chunk;
            console.log(chunk)
        });
                
        response.on('end', () => {
            console.log(data)
            const {url, explanation} = JSON.parse(data);
            res.end(`<h2>Image of the day</h2><img src="${url}"></br><p>${explanation}</p>`);
        });
        
    }).on('error', (error) => {
        console.log("Error: " + error.message);
    });
})

serverFancy.listen(port2, () => {
    console.log('ssl server is running at ', port2);
})