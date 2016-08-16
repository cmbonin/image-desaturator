var path = require('path');

module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				loader: 'babel',
				include: [path.resolve(__dirname, 'src')],
				exclude: [path.resolve(__dirname, 'node_modules')],
				test: /\.jsx?$/,
				query: {
					plugins: ['transform-runtime'],
					presets: ['es2015', 'react'],
				},
			},
			{
				loader: 'file',
				test: /\.(eot|svg|ttf|woff2?)$/
			},
			{
				loader: 'style!css',
				test: /\.css$/,
			},
			{
				// SASS loader for app styles
        include: [path.resolve(__dirname, 'src/styles')],
				loader: 'style!css!sass?outputStyle=expanded',
        test: /\.scss$/
      },
			{
				// SASS loader for module components
				loader: 'style!css!sass?outputStyle=expanded',
				include: [path.resolve(__dirname, 'src/components')],
        test: /\.scss$/
			},
		],
	},
};
