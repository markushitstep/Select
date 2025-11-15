import { Configuration as WebpackConfiguration, HotModuleReplacementPlugin } from "webpack"
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server"
import HtmlWebpackPlugin from "html-webpack-plugin"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import ESLintWebpackPlugin from "eslint-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import CopyWebpackPlugin from "copy-webpack-plugin"
import Dotenv from "dotenv-webpack"
import path from "path"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"

const PORT = 61005

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration
}

const babelConfigPath = path.resolve(__dirname, "babel.config.json")
const config = {
    mode: "development",
    entry: path.resolve(__dirname, "src/index.tsx"),
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        chunkFilename: "[name].[contenthash].js",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        configFile: babelConfigPath
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ["@svgr/webpack", "url-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@api": path.resolve(__dirname, "src/api"),
            "@components": path.resolve(__dirname, "src/components"),
            "@context": path.resolve(__dirname, "src/context"),
            "@css": path.resolve(__dirname, "src/css"),
            "@helpers": path.resolve(__dirname, "src/helpers"),
            "@icons": path.resolve(__dirname, "src/icons"),
            "@layout": path.resolve(__dirname, "src/layout"),
            "@modals": path.resolve(__dirname, "src/modals"),
            "@pages": path.resolve(__dirname, "src/pages"),
        }
    },
    plugins: [
        new Dotenv({ path: path.resolve(__dirname, ".env.dev") }),
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, "public/index.html"), templateParameters: { RAND: Math.random().toString().replace(".", "") } }),
        new HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin({ async: false }),
        new ESLintWebpackPlugin({
            extensions: ["js", "jsx", "ts", "tsx"],
            context: __dirname,
            failOnError: false,
            quiet: false,
            emitWarning: true,
            files: [__dirname],
            overrideConfigFile: path.resolve(__dirname, "eslint.config.ts")
        }),
        new MiniCssExtractPlugin({ filename: "[name].[contenthash].css", chunkFilename: "[name].[contenthash].css" }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "public"),
                    to: path.resolve(__dirname, "dist"),
                    globOptions: {
                        ignore: [path.resolve(__dirname, "public/index.html")]
                    }
                }
            ]
        }),
        new ReactRefreshWebpackPlugin()
    ],
    optimization: {
        splitChunks: { chunks: "all" }
    },
    devtool: "inline-source-map",
    devServer: {
        static: path.resolve(__dirname, "dist"),
        historyApiFallback: true,
        port: PORT,
        hot: true,
        watchFiles: [
            path.resolve(__dirname, "src/**/*")
        ]
    }
}
export default config