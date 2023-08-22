
module.exports = {
    entry: './src/index.js', // Your library's entry file
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '.src/index.tsx',
      library: 'react-messaging-library', // The global variable name when used as a library
      libraryTarget: 'umd',
    },
  };