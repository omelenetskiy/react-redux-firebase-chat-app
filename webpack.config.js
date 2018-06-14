const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
	entry: {
		bundle: [
			'./src/index',
			isDevelopment && 'webpack-hot-middleware/client'
		].filter(Boolean)
	},
	output: {
		filename: '[name].js',
		path: path.resolve('./dist/js/'),
		publicPath: '/js/'
	},
	mode: isDevelopment ? 'development' : 'production',
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.js$/,
				use: 'babel-loader'
			},
			{
				test: /\.sass$/,
				use: [
					isDevelopment
						? 'style-loader'
						: MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							minimize: !isDevelopment && {
								autoprefixer: {
									add: true,
									browsers: ['last 2 versions']
								}
							}
						}
					},
					{
						loader: 'sass-loader',
						options: {
							data: '@import "./src/styles/const.sass";'
						}
					}
				]
			},
			{
				test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {}
					}
				]
			}
		]
	},
	plugins: [
		isDevelopment && new webpack.HotModuleReplacementPlugin(),
		!isDevelopment &&
			new MiniCssExtractPlugin({
				filename: '../css/[name].css'
			}),
		!isDevelopment &&
			new CleanWebpackPlugin(['dist'], { root: path.resolve('./') }),
		!isDevelopment &&
			new CopyWebpackPlugin([
				{
					context: 'src/static',
					from: '**/*',
					to: '../'
				}
			])
	].filter(Boolean)
};
