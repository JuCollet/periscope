var webpack = require("webpack");

module.exports = {
    entry : {
        app: './client/app.js',
        vendors: ['react', 'react-dom', 'redux', 'react-redux', 'redux-form', 'react-router-dom']
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
        "public": "periscope-julesbe.c9users.io"
    },
    module : {
        loaders : [
            {
                test : /\.js$/,
                exclude : __dirname + 'node_modules',
                loader : 'babel-loader'
            }, {
                test : /\.less$/,
                loader : "style-loader!css-loader!less-loader"
            }, {
                test : /\.css$/,
                loader : "style-loader!css-loader"
            }, {
                test : /\.(png|jpeg|gif|svg)$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'bundle.vendor.js'
        })
    ]
};