const merge = require("webpack-merge");
const webpack = require("webpack");
const projectName = require("../package.json").name;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");
const path = require("path");
const BaseConfig = require("./webpack.config.base.js");
const config = require("../config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
function resolve(dir) {
    return path.join(__dirname, "..", dir);
}
module.exports = merge(BaseConfig, {
    devtool: config.dev.devtool,
    mode: "development",
    devServer: {
        // clientLogLevel: "warning",
        // historyApiFallback: true,
        // hot: true,
        // contentBase: false, // since we use CopyWebpackPlugin.
        // compress: true,
        host: config.dev.host,
        port: config.dev.port,
        open: config.dev.autoOpenBrowser
        // disableHostCheck: true,
        // overlay: config.dev.errorOverlay
        //     ? { warnings: false, errors: true }
        //     : false,
        // publicPath: config.dev.assetsPublicPath,
        // proxy: config.dev.proxyTable,
        // quiet: true, // necessary for FriendlyErrorsPlugin
        // watchOptions: {
        //     poll: config.dev.poll
        // }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            SERVER_HOST: JSON.stringify("dev")
        }),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: paths.appHtml,
            title: "SUNX BLOG",
            favicon: resolve("favicon.ico"),
            inject: true
        }),
        new MiniCssExtractPlugin({
            filename: `static/css/[name]-css-[hash:5].css`
        })
    ]
});
