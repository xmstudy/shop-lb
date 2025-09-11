/**
 * 认证相关工具函数
 */

// 存储键名常量
const STORAGE_KEYS = {
	TOKEN: 'token',
	USER_INFO: 'userInfo',
	IS_LOGIN: 'isLogin',
	LOGIN_TIME: 'loginTime'
}

/**
 * 保存登录信息
 * @param {Object} data 登录返回的数据
 */
export function saveLoginInfo(data) {
	try {
		// 保存token
		if (data.token) {
			uni.setStorageSync(STORAGE_KEYS.TOKEN, data.token)
			console.log('Token已保存:', data.token)
		}
		
		// 保存用户信息
		if (data.userInfo) {
			uni.setStorageSync(STORAGE_KEYS.USER_INFO, data.userInfo)
			console.log('用户信息已保存:', data.userInfo)
		}
		
		// 保存登录状态
		uni.setStorageSync(STORAGE_KEYS.IS_LOGIN, true)
		uni.setStorageSync(STORAGE_KEYS.LOGIN_TIME, Date.now())
		
		// 验证保存是否成功
		const savedToken = uni.getStorageSync(STORAGE_KEYS.TOKEN)
		const savedUserInfo = uni.getStorageSync(STORAGE_KEYS.USER_INFO)
		const savedLoginStatus = uni.getStorageSync(STORAGE_KEYS.IS_LOGIN)
		
		console.log('登录信息保存验证:', {
			token: !!savedToken,
			userInfo: !!savedUserInfo,
			loginStatus: savedLoginStatus
		})
		
		return !!(savedToken && savedUserInfo && savedLoginStatus)
	} catch (error) {
		console.error('保存登录信息失败', error)
		return false
	}
}

/**
 * 获取token
 * @returns {String} token
 */
export function getToken() {
	return uni.getStorageSync(STORAGE_KEYS.TOKEN) || ''
}

/**
 * 获取用户信息
 * @returns {Object} 用户信息
 */
export function getUserInfo() {
	return uni.getStorageSync(STORAGE_KEYS.USER_INFO) || {}
}



/**
 * 检查是否已登录
 * @returns {Boolean} 是否已登录
 */
export function isLoggedIn() {
	return uni.getStorageSync(STORAGE_KEYS.IS_LOGIN) === true
}

/**
 * 清除登录信息
 */
export function clearLoginInfo() {
	try {
		uni.removeStorageSync(STORAGE_KEYS.TOKEN)
		uni.removeStorageSync(STORAGE_KEYS.USER_INFO)
		uni.removeStorageSync(STORAGE_KEYS.IS_LOGIN)
		uni.removeStorageSync(STORAGE_KEYS.LOGIN_TIME)
		console.log('登录信息已清除')
	} catch (error) {
		console.error('清除登录信息失败', error)
	}
}

/**
 * 检查token是否过期
 * @param {Number} expireTime 过期时间（毫秒），默认24小时
 * @returns {Boolean} 是否过期
 */
export function isTokenExpired(expireTime = 24 * 60 * 60 * 1000) {
	const loginTime = uni.getStorageSync(STORAGE_KEYS.LOGIN_TIME)
	if (!loginTime) return true
	
	const now = Date.now()
	return (now - loginTime) > expireTime
}

/**
 * 获取登录状态信息
 * @returns {Object} 登录状态信息
 */
export function getLoginStatus() {
	return {
		isLoggedIn: isLoggedIn(),
		token: getToken(),
		userInfo: getUserInfo(),
		isExpired: isTokenExpired()
	}
}

/**
 * 调试函数：检查当前登录状态
 */
export function debugLoginStatus() {
	const status = {
		token: getToken(),
		userInfo: getUserInfo(),
		isLoggedIn: isLoggedIn(),
		loginTime: uni.getStorageSync(STORAGE_KEYS.LOGIN_TIME)
	}
	
	console.log('=== 登录状态调试信息 ===')
	console.log('Token:', status.token ? '已保存' : '未保存')
	console.log('用户信息:', status.userInfo ? '已保存' : '未保存')
	console.log('登录状态:', status.isLoggedIn)
	console.log('登录时间:', status.loginTime)
	console.log('========================')
	
	return status
}

/**
 * 合并用户信息
 * @param {Object} newUserInfo 新的用户信息
 * @returns {Object} 合并后的用户信息
 */
export function mergeUserInfo(newUserInfo) {
	try {
		const currentUserInfo = getUserInfo() || {}
		
		// 合并用户信息：新信息优先，但保留登录时的关键字段
		const mergedUserInfo = {
			...currentUserInfo,  // 保留登录时的信息
			...newUserInfo,      // 新信息覆盖
			// 特殊处理某些字段，确保不被覆盖
			token: currentUserInfo.token, // 保留登录时的token
			openid: currentUserInfo.openid, // 保留登录时的openid
			sessionKey: currentUserInfo.sessionKey // 保留登录时的sessionKey
		}
		
		// 更新本地存储
		uni.setStorageSync(STORAGE_KEYS.USER_INFO, mergedUserInfo)
		
		console.log('用户信息已合并:', mergedUserInfo)
		return mergedUserInfo
	} catch (error) {
		console.error('合并用户信息失败:', error)
		return newUserInfo
	}
} 