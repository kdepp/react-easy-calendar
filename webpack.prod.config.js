var webpack = require('webpack'),
    path = require('path');

module.exports = {
    entry: {
        bundle: [
            './src/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'calendar.js',
        libraryTarget: 'umd',
        library: 'ReactEasyCalendar'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel?presets[]=stage-0&presets[]=es2015&presets[]=react']
            }
        ]
    }
};
