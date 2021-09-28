module.exports = {
	devServer: {
		port: '3344',
		hot:true,
		open: true,
		proxy: {
			'^/api': {
				target: 'http://localhost:3456',
				changeOrigin: true,
				pathRewrite: {
					'^/api': '', //请求的时候使用这个api就可以
				},
			},
		},
	},
}
