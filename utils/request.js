// uniapp 基础请求封装，参数风格与 axios 一致
import {
	BASE_URL
} from '@/config/index.js'
import {
	getToken,
	clearLoginInfo
} from './auth.js'

// 页面黑名单：这些页面不携带token且不做401跳转
const pageBlacklist = ['/subpackages/user/login/login'];

function request({
	url,
	method = 'GET',
	data = {},
	headers = {},
	returnFullResponse = false,
	...rest
} = {}) {
	return new Promise((resolve, reject) => {
		// 处理URL，如果是相对路径则拼接BASE_URL
		const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
		// 获取当前页面路径
		let isBlacklisted = false;
		if (typeof uni !== 'undefined' && uni.getCurrentPages) {
			const pages = getCurrentPages();
			if (pages && pages.length > 0) {
				const currentPage = pages[pages.length - 1];
				const currentPath = '/' + currentPage.route;
				isBlacklisted = pageBlacklist.includes(currentPath);
			}
		}
		const token = getToken();
		const allHeaders = {
			...headers,
		};
		// 黑名单页面不携带token
		if (token && !isBlacklisted) {
			allHeaders['Authorization'] = `${token}`;
		}
		uni.request({
			url: fullUrl,
			method,
			data,
			header: allHeaders,
			...rest,
			success: (res) => {
				// 黑名单页面不做401跳转
				if (res.statusCode === 401 && !isBlacklisted) {
					if (typeof uni !== 'undefined' && uni.$emit) {
						uni.$emit('tokenExpired');
					}
					clearLoginInfo();
					// 获取当前页面路径和参数
					let redirect = '';
					if (typeof uni !== 'undefined' && uni.getCurrentPages) {
						const pages = getCurrentPages();
						if (pages && pages.length > 0) {
							const currentPage = pages[pages.length - 1];
							let fullPath = currentPage.route;
							const query = currentPage.options || {};
							const queryStr = Object.keys(query).map(key =>
								`${key}=${encodeURIComponent(query[key])}`).join('&');
							if (queryStr) {
								fullPath += '?' + queryStr;
							}
							redirect = encodeURIComponent('/' + fullPath);
						}
					}
					if (typeof uni !== 'undefined' && uni.reLaunch) {
						uni.reLaunch({
							url: `/subpackages/user/login/login${redirect ? ('?redirect=' + redirect) : ''}`
						});
					} else {
						window.location.href =
							`/subpackages/user/login/login${redirect ? ('?redirect=' + redirect) : ''}`;
					}
					reject(returnFullResponse ? res : res.data);
				} else {
					// 默认返回res.data，除非指定returnFullResponse为true
					resolve(returnFullResponse ? res : res.data);
				}
			},
			fail: (err) => {
				reject(err);
			}
		});
	});
}

export default request;