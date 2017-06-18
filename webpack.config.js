var webpack = require("webpack");

module.exports = {
    entry : {
        app: './client/app.js'
    },
    output : {
        filename : './client/dist/bundle.js',
        path : __dirname
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './client/dist',
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
                loader: 'file-loader?name=/img/[name].[ext]'
            }
        ]
    }
};