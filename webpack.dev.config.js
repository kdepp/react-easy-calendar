var webpack = require('webpack'),
    path = require('path');

module.exports = {
    entry: {
        bundle: [
            'webpack-dev-server/client?http://localhost:8384',
            'webpack/hot/dev-server',
            './example/app.js',
        ]
    },
    output: {
        path: path.join(__dirname, 'example'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel?presets[]=stage-0&presets[]=es2015&presets[]=react&plugins[]=transform-object-assign']
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            __DEVELOPMENT__: true,
        })
    ],
    devtool: 'eval-source-map'
};
