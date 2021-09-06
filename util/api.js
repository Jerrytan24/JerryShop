const baseUrl = "http://175.24.116.94:8082"
export const JerryRequest = (config) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + config.url,
			method: config.method || 'GET',
			data: config.data || {},
			success(res) {
				resolve(res)
			},
			fail(erro) {
			    uni.showToast({
					title: "请求失败"
				}),
				reject(erro)
			}
		})
	})
}
const baseUrl2 = "http://175.24.116.94:8082/api"
export const JerrySecond = function(config){
		uni.request({
			url:baseUrl2+config.url,
			method: config.method || 'GET',
			data: config.data || {},
			success(res) {
				return res;
			},
			fail(err) {
				uni.showToast({
					title: "请求失败"
				})
				return err;
			}
		})
}
