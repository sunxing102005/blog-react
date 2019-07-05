const path = require("path");
const projectName = require("../package.json").name;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const shouldUseSourceMap = process.env.NODE_ENV !== "production";
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
const paths = require("./paths");
// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less/;
function resolve(dir) {
    return path.join(__dirname, "..", dir);
}
const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader
            // options: Object.assign(
            //     {},
            //     shouldUseRelativeAssetPaths
            //         ? { publicPath: "../../" }
            //         : undefined
            // )
        },
        {
            loader: require.resolve("css-loader"),
            options: cssOptions
        },
        {
            // Options for PostCSS as we reference these options twice
            // Adds vendor prefixing based on your specified browser support in
            // package.json
            loader: require.resolve("postcss-loader"),
            options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebook/create-react-app/issues/2677
                ident: "postcss",
                plugins: () => [
                    require("postcss-flexbugs-fixes"),
                    require("postcss-preset-env")({
                        autoprefixer: {
                            flexbox: "no-2009"
                        },
                        stage: 3
                    })
                ],
                sourceMap: shouldUseSourceMap
            }
        }
    ];
    if (preProcessor) {
        loaders.push({
            loader: require.resolve(preProcessor),
            options: {
                sourceMap: shouldUseSourceMap,
                modifyVars: {
                    "primary-color": "#00bebe"
                },
                javascriptEnabled: true
            }
        });
    }
    return loaders;
};
module.exports = {
    bail: true,
    devtool: shouldUseSourceMap ? "source-map" : false,
    entry: {
        app: paths.appIndexJs
    },
    context: path.resolve(__dirname, "../"),
    output: {
        filename: "static/" + projectName + "/js/[name]-[hash:5].js",
        path: resolve("dist"),
        publicPath: "/",
        chunkFilename: "static/" + projectName + "/js/[name].[hash:5].chunk.js"
    },
    resolve: {
        extensions: [
            ".mjs",
            ".web.js",
            ".js",
            ".json",
            ".web.jsx",
            ".jsx",
            ".ts",
            ".tsx"
        ],
        alias: {
            "@": resolve("src")
        },
        plugins: []
    },
    resolveLoader: {
        plugins: []
    },
    module: {
        strictExportPresence: true,
        rules: [
            { parser: { requireEnsure: false } },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.(js|mjs|jsx)$/,
                enforce: "pre",
                use: [
                    {
                        options: {
                            formatter: require.resolve(
                                "react-dev-utils/eslintFormatter"
                            ),
                            eslintPath: require.resolve("eslint")
                        },
                        loader: require.resolve("eslint-loader")
                    }
                ],
                include: resolve("src")
            },
            {
                oneOf: [
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve("url-loader"),
                        options: {
                            limit: 10000,
                            name:
                                "static/" +
                                projectName +
                                "/media/[name].[hash:8].[ext]"
                        }
                    },
                    {
                        test: /\.(js|mjs|jsx)$/,
                        include: resolve("src"),

                        loader: require.resolve("babel-loader"),
                        options: {
                            customize: require.resolve(
                                "babel-preset-react-app/webpack-overrides"
                            ),
                            plugins: [
                                [
                                    require.resolve(
                                        "babel-plugin-named-asset-import"
                                    ),
                                    {
                                        loaderMap: {
                                            svg: {
                                                ReactComponent:
                                                    "@svgr/webpack?-prettier,-svgo![path]"
                                            }
                                        }
                                    }
                                ],
                                [
                                    "import",
                                    {
                                        libraryName: "antd",
                                        libraryDirectory: "es",
                                        style: true
                                    }
                                ],
                                [
                                    "@babel/plugin-proposal-decorators",
                                    {
                                        legacy: true
                                    }
                                ]
                            ],
                            cacheDirectory: true,
                            cacheCompression: true,
                            compact: true
                        }
                    },
                    {
                        test: /\.(js|mjs)$/,
                        exclude: /@babel(?:\/|\\{1,2})runtime/,
                        loader: require.resolve("babel-loader"),
                        options: {
                            babelrc: false,
                            configFile: false,
                            compact: false,
                            presets: [
                                [
                                    require.resolve(
                                        "babel-preset-react-app/dependencies"
                                    ),
                                    { helpers: true }
                                ]
                            ],
                            cacheDirectory: true,
                            cacheCompression: true,
                            sourceMaps: false
                        }
                    },
                    {
                        test: cssRegex,
                        exclude: cssModuleRegex,
                        loader: getStyleLoaders({
                            importLoaders: 1,
                            sourceMap: shouldUseSourceMap
                        }),
                        sideEffects: true
                    },
                    {
                        test: cssModuleRegex,
                        loader: getStyleLoaders({
                            importLoaders: 1,
                            sourceMap: shouldUseSourceMap,
                            modules: true,
                            getLocalIdent: getCSSModuleLocalIdent
                        })
                    },
                    {
                        test: lessRegex,
                        exclude: lessModuleRegex,
                        loader: getStyleLoaders(
                            {
                                importLoaders: 2,
                                sourceMap: shouldUseSourceMap
                            },
                            "less-loader"
                        )
                    },
                    {
                        test: lessModuleRegex,
                        loader: getStyleLoaders(
                            {
                                importLoaders: 2,
                                sourceMap: shouldUseSourceMap,
                                modules: true,
                                getLocalIdent: getCSSModuleLocalIdent
                            },
                            "less-loader"
                        )
                    },
                    {
                        loader: require.resolve("file-loader"),
                        exclude: [
                            /\.(js|mjs|jsx)$/,
                            /\.html$/,
                            /\.(ts|tsx)$/,
                            /\.json$/
                        ],
                        options: {
                            name:
                                "static/" +
                                projectName +
                                "/media/[name].[hash:8].[ext]"
                        }
                    },
                    {
                        test: /\.(html)$/,
                        use: {
                            loader: "html-loader",
                            options: {
                                attrs: ["img:src", "link:href"]
                            }
                        }
                    }
                ]
            }
        ]
    },
    stats: {
        warningsFilter: warning => /Conflicting order between/gm.test(warning)
    },
    performance: false
};
