const nodeExternals = require('webpack-node-externals');

serverConfig = {
    target: 'node',
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    entry: {
        server: './src/server/server.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
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
