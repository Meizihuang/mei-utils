const path = require("path");
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

module.exports = {
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        publicPath: "/"
    },
    resolve: {
        // 别名
        alias: {
            "@": path.resolve(__dirname, "../src")
        },
        // 省略后缀
        extensions: ['.js', '.json', '.css']
    },
    devtool: "inline-source-map",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    devServer: {

        // 使用 inline 模式时，控制台显示消息级别
        clientLogLevel: "warning",

        // contentBase: path.resolve(__dirname, "../", "dist"),

        // 静态文件查找位置
        contentBase: false,

        //  auto open browser
        open: true,
        host: "localhost",
        port: 8080,

        // overlay 编译错误或警告时，在浏览器全屏显示 
        overlay: {
            warnings: false,
            errors: true
        },

        // hot update
        hot: true,

        // hotOnly: true,

        // 一切服务都启用gzip 压缩
        compress: true,

        // 代理后端api
        proxy: {},

        // 除了初始启动信息之外的任何内容都不会再被打印到控制台
        quiet: true,
        publicPath: "/",

        // 当webpack watch 失败后，使用轮询监听
        watchOptions: {
            poll: true
        },

        // 任意 404 响应时都跳转至index.html
        historyApiFallback: {
            rewrites: [{
                from: /.*/,
                to: path.posix.join("/", 'index.html')
            },],
        },
    },
    optimization: {
        nodeEnv: 'development'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "mei-utils",
            filename: "index.html",
            template: "index.html",
            inject: true
        }),
        // hot update
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
}