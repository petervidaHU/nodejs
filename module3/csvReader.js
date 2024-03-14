import fs from 'fs';
import csv from 'csvtojson';

const csvFilePath = 'csv/sample.csv';
const outputFile = 'json/jsonOutput1.json';
const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(outputFile, { flags: 'a' });

const c = csv();
writeStream.write('[')

let first = true;

readStream.pipe(c).on('data', (r) => {
    const json = JSON.parse(r);
    const jsonS = JSON.stringify(json);
    console.log(jsonS);
    if (first) {
        writeStream.write('\n' + jsonS);
        first = false;
    } else {
        writeStream.write(',\n' + jsonS);
    }
})
    .on('end', () => {
        writeStream.write('\n]')
        writeStream.end();
        console.log('ok');
    })
    .on('error', (e) => {
        writeStream.write('\n]')
        writeStream.end();
        console.log('there was an error on some row', e);
    });
