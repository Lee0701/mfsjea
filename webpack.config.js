
const path = require('path')

const modules = {
    entry: "./src/index.ts",
    target: "web",
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    "ts-loader"
                ]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: "mfsjea.min.js",
        path: path.resolve(__dirname, "dist")
    }
}

const browser = {
    entry: "./src/index.ts",
    target: "web",
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            presets: [["@babel/preset-env"]]
                        }
                    },
                    "ts-loader"
                ]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: "mfsjea.min.js",
        path: path.resolve(__dirname, "dist")
    }
}

module.exports = [browser]