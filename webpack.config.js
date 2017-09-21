const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry : {
        app: './client/index.js',
        vendors: ['react', 'react-dom', 'redux', 'react-redux', 'redux-form', 'react-router-dom', 'react-hammerjs']
    },
    output : {
        filename : 'bundle.js',
        path : __dirname+"/dist"
    },
    devServer: {
        historyApiFallback: true,
        contentBase: __dirname + '/dist',
        host: process.env.IP,
        port: process.env.PORT,
        "public": "periscope-clean-julesbe.c9users.io"
    },
    module : {
        loaders : [
            {
                test : /\.js$/,
                exclude : __dirname + 'node_modules',
                loader : 'babel-loader'
            }, {
                loader : ExtractTextPlugin.extract({
                    loader: 'css-loader!postcss-loader!less-loader'
                }),
                test : /\.less$/,
            }, {
                loader : ExtractTextPlugin.extract({
                    loader: 'css-loader'
                }),
                test : /\.css$/,
            }, {
                test : /\.(png|jpeg|jpg|gif|svg)$/,
                use : [
                    {
                        loader : "url-loader",
                        options : { limit : 20000, name : "./img/[hash].[ext]"}
                    },
                    "image-webpack-loader"
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles/styles.css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'bundle.vendor.js'
        })
    ]
};