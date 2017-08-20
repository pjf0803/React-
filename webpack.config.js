const path = require('path');

module.exports = {  
	entry: "./app/main.js",  
	output: {
		path : path.resolve(__dirname, "dist"), 
		filename : "bundle.js",
		publicPath : "/public/"
	},
    module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/ ,
				use: {
					loader: 'babel-loader',
					options: {
				  		presets: ['es2015','react']
					}
				}
			}
		]
	}
}