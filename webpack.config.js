var path = require('path');

module.exports = {
    entry: [
        'angular2/bundles/angular2-polyfills.js',
        path.resolve('app/app')
    ],
    output: {
        path: path.resolve('www/build/js'),
        filename: 'app.bundle.js',
        pathinfo: true
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript',
            },
            {
                test: /\.js$/,
                loader: 'awesome-typescript',
                query: {
                    doTypeCheck: false,
                    useWebpackText: true
                },
                include: path.resolve('app'),
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
              test: /\.png$/, 
              loader: 'url-loader?limit=100000'},
            {
                test: /\.woff(2)?(\?v=.+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=.+)?$/,
                loader: 'file'
            },
            {
                test: /\.html$/,
                loader: 'html'
            }
        ],
        noParse: [
            /es6-shim/,
            /reflect-metadata/,
            /zone\.js(\/|\\)dist(\/|\\)zone-microtask/
        ]
    },
    resolve: {
        root: [
            'app'
        ],
        alias: {
            'angular2': path.resolve('node_modules/angular2'),
            'ionic': 'ionic-angular'
        },
        extensions: ['', '.js', '.ts']
    },
    sassLoader: {
        includePaths: [
            'node_modules/ionic-angular',
            'node_modules/ionicons/dist/scss'
        ]
    }
};