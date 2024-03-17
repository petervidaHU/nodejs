import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';

const dirname = new URL('.', import.meta.url).pathname;
const csvFilePath = path.join(dirname, 'csv', 'sample.csv');
const outputFile = path.join(dirname, 'json', 'jsonOutput.json');

const readStreamFromCsv = fs.createReadStream(csvFilePath);
const writeStreamToOutput = fs.createWriteStream(outputFile, { flags: 'a' });

writeStreamToOutput.write('[')


let first = true;

readStreamFromCsv.pipe(csv()).on('data', (r) => {
    const json = JSON.parse(r);
    const jsonS = JSON.stringify(json);
    console.log(jsonS);
    if (first) {
        writeStreamToOutput.write('\n' + jsonS);
        first = false;
    } else {
        writeStreamToOutput.write(',\n' + jsonS);
    }
})
    .on('end', () => {
        writeStreamToOutput.write('\n]')
        writeStreamToOutput.end();
        console.log('ok');
    })
    .on('error', (e) => {
        writeStreamToOutput.write('\n]')
        writeStreamToOutput.end();
        console.log('there was an error on some row', e);
    });
