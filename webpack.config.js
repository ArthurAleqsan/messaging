
module.exports = {
    entry: './src/index.tsx', // Your library's entry file
    output: {
        // path: './public/index.html',
        filename: 'index.tsx',
        library: 'react-messaging-library', // The global variable name when used as a library
        libraryTarget: 'umd',
    },
};