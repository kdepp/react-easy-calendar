var webpack = require('webpack'),
    path = require('path');

module.exports = {
    entry: {
        bundle: [
            './src/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'lib'),
        filename: 'calendar.js',
        library: 'react-easy-calendar',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel?presets[]=stage-0&presets[]=es2015']
            }
        ]
    }
};
