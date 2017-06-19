var webpack = require("webpack");

module.exports = {
    entry : {
        app: './client/app.js',
        vendors: ['react','react-dom']
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
                loader: 'file-loader?name=/client/dist/[name].[ext]'
            }, {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: "url-loader?limit=10000&mimetype=application/font-woff&name=/client/dist/[name].[ext]" 
            }, {
                test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: "file-loader?name=/client/dist/[name].[ext]"
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: './client/dist/bundle.vendor.js'
        })
    ]
};