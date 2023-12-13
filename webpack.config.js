// Generated using webpack-cli https://github.com/webpack/webpack-cli
require('dotenv').config()
const path = require('path')
const isProduction = process.env.NODE_ENV == 'production'

const config = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
    output: {
        filename: 'index.js',
        libraryTarget: 'commonjs2',
    },
}

module.exports = () => {
    if (isProduction) {
        config.mode = 'production'
    } else {
        config.mode = 'development'
    }
    return config
}
