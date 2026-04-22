const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/sw.js', to: 'sw.js' },
                { from: 'src/offline.html', to: 'offline.html' }
            ]
        }),
        new WorkboxPlugin.GenerateSW({
            swDest: 'workbox-sw.js',
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [
                {
                    urlPattern: /\/api\/news/,
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'api-cache-v1',
                        expiration: {
                            maxEntries: 10,
                            maxAgeSeconds: 24 * 60 * 60
                        }
                    }
                },
                {
                    urlPattern: /\.(?:js|css|html)$/,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'static-cache-v1'
                    }
                }
            ],
            navigateFallback: '/offline.html'
        })
    ],
    devServer: {
        static: './dist',
        port: 8080,
        hot: true,
        open: true
    }
};