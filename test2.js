const { readFileSync } = require('fs');
const qrHandlers = readFileSync('./src/utils/qr-handlers.ts', 'utf8');
console.log(qrHandlers.includes('youtube: \'https://youtube.com/@\','));
