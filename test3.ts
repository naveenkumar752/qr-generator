const { formatQRData } = require('./src/utils/qr-handlers');
console.log(formatQRData('social', { platform: 'youtube', username: 'mkbhd' }));
console.log(formatQRData('social', { platform: 'youtube', username: 'test' }));
