
const path = require('path')

module.exports = {
    entry: "./src/index.ts",
    target: "node",
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            presets: [["@babel/preset-env"]]
                        }
                    },
                    "ts-loader"
                ],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
        libraryExport: 'default',
        libraryTarget: "commonjs2"
    }
}