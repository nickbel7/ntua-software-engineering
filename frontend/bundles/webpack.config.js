const path = require('path');

// console.log(path.resolve(__dirname, '../assets/js/index.js'));

module.exports = {
    entry: path.resolve(__dirname, '..', 'assets/js/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: 'production',
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    }
};