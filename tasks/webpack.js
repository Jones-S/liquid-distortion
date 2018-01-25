import path from 'path'
import webpack from 'webpack'

const DIST_DIR   = path.join(__dirname, "../dist"),
      CLIENT_DIR = path.join(__dirname, "../src");

let config = {
    entry: {
      main: [
        './app.js'
      ]
    },
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, DIST_DIR)
    },
    context: path.resolve(__dirname, CLIENT_DIR)
}

function scripts() {

    return new Promise(resolve => webpack(config, (err, stats) => {

        if (err) console.log('Webpack', err)

        console.log(stats.toString({ /* stats options */ }))

        resolve()
    }))
}

module.exports = { config, scripts }
