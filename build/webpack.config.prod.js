const paths = require("./paths");

const webpack = require("webpack");

const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BaseConfig = require("./webpack.config.base.js");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const safePostCssParser = require("postcss-safe-parser");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const projectName = require("../package.json").name;
function resolve(dir) {
    return path.join(__dirname, "..", dir);
}
const shouldUseSourceMap = false;

module.exports = merge(BaseConfig, {
    mode: "production",
    devtool: "#source-map",
    output: {
        filename: "static/" + projectName + "/js/[name]-[hash:5].js",
        path: resolve("../../../think-js/projects/self-blog-fontend/www"),
        publicPath: "/",
        chunkFilename: "static/" + projectName + "/js/[name].[hash:5].chunk.js"
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        ecma: 8
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2
                    },
                    mangle: {
                        safari10: true
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true
                    }
                },
                parallel: true,
                cache: true,
                sourceMap: shouldUseSourceMap
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    parser: safePostCssParser,
                    map: shouldUseSourceMap
                        ? {
                              inline: false,
                              annotation: true
                          }
                        : false
                }
            })
        ],
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                antd: {
                    name: "antd-UI",
                    priority: 20, // 权重要大于 vendor 和 app 不然会被打包进 vendor 或者 app
                    test: /[\\/]node_modules[\\/]antd[\\/]/
                },
                vendor: {
                    name: "chunk-vendor",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: "initial" // 只打包初始时依赖的第三方
                }
            }
        },
        runtimeChunk: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `static/${projectName}/css/[name]-css-[hash:5].css`,
            path: resolve("../../../think-js/projects/self-blog-fontend/www")
        }),
        new webpack.DefinePlugin({
            SERVER_HOST: JSON.stringify("prd")
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["**/static/"]
        }),
        new HtmlWebpackPlugin({
            filename: `../view/index_index.html`,
            template: paths.appHtml,
            favicon: resolve("favicon.ico"),
            title: "系统",
            inject: true,
            // chunks: ["manifest", "vendor", "app"]
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        })
    ]
});
