import request from '@/utils/request.js'

/**
 * 获取用户信息
 */
export const fetchUserInfo = () => {
	return request({
		url: "/wx/get-member",
		method: "GET",
	})
}
/**
 * 更新用户信息
 * avatarUrl
string 
头像
可选
nickname
string 
昵称
必需
>= 0 字符
<= 32 字符
 */
export const UpdateUserInfo = (data) => {
	return request({
		url: "/wx/update-member",
		method: "POST",
		data
	})
}