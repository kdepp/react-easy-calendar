var webpack = require('webpack'),
    path = require('path');

module.exports = {
    entry: {
        bundle: [
            './example/app.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'lib'),
        filename: 'calendar.js',
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
