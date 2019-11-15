const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

clientConfig = {
    entry: {
        server: './src/index.js',
    },
    output: {
        filename: 'client.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 80
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: __dirname + "/server",
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
};

module.exports = [clientConfig];

