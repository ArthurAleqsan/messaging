const path = require('path');
const srcPath = path.join(__dirname, 'src');

console.log(123, __dirname);

module.exports = {
    entry: {
        app: path.join(srcPath, 'index.tsx'), // Your library's entry file
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'index.tsx',
        library: 'react-messaging-library', // The global variable name when used as a library
    },
};