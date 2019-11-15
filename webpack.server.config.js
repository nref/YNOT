const nodeExternals = require('webpack-node-externals');

serverConfig = {
    entry: {
        server: './src/server/server.js',
    },
    output: {
        filename: 'server.js'
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: __dirname + "/client",
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        ["@babel/transform-runtime"]
                    ]
                }
            }
        ]
    },
};

module.exports = [serverConfig];
