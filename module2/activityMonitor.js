import os from 'os';
import childP from 'child_process';
import fs from 'fs';

const LOG_FILE = 'activityMonitor.log';

const supportedOS = ['linux', 'win32', 'darwin']
const myOs = os.type().toLocaleLowerCase();

if (!supportedOS.includes(myOs)) {
    console.log(`your operating system is not supported: ${myOs}`);
}

const getCommand = (os) => {
    const linuxCommand = 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
    const winCommand = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;
    return os === 'win32' ? winCommand : linuxCommand;
}

const execP = (command) => {
    return childP.execSync(command, (error, stdout, stderr) => {
        if (stderr) throw new Error(stderr);
        if (error !== null) throw new Error(error);

        return stdout;
    })
}

const getLineOfLog = (data) => `${Date.now()} : ${data}`;

const writeNewLine = (data) => {
    process.stdout.moveCursor(0, -1)
    process.stdout.clearLine(1)
    process.stdout.write(data);
}

const command = getCommand(myOs)
let writeTimer = 0;

process.stdout.write(execP(command).toString());
setInterval(() => {
    const data = execP(command).toString();
    writeNewLine(data);

    writeTimer += 1;

    if (writeTimer >= 600) {
        writeTimer = 0;
        fs.appendFile(LOG_FILE, getLineOfLog(data), (err) => {
            if (err) throw new Error(err);
        });
    }
}, 100);