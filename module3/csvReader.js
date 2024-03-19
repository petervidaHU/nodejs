import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';

const dirname = new URL('.', import.meta.url).pathname;
const csvFilePath = path.join(dirname, 'csv', 'sample.csv');
const outputFile = path.join(dirname, 'json', 'jsonOutput.json');

const writeStreamToOutput = fs.createWriteStream(outputFile, { flags: 'a' });

writeStreamToOutput.write('[')
let first = true;

csv()
    .fromFile(csvFilePath)
    .subscribe(async (line) => {
        return new Promise((resolve, reject) => {
            const json = JSON.stringify(line);
            const dataToWrite = first ? `\n${json}` : `,\n${json}`;
            writeStreamToOutput.write(dataToWrite, 'utf8', (e) => {
                if (e) {
                    console.log('error : ', e);
                    reject();
                } else {
                    first = false;
                    resolve();
                }
            });
        });
    }, (error) => {
        console.log('error in CSV file', error);
        writeStreamToOutput.write('\n]');
        writeStreamToOutput.end();
    }, () => {
        console.log('ok');
        writeStreamToOutput.write('\n]');
        writeStreamToOutput.end();
    })

