import request from '@/utils/request.js'
import {
	BASE_URL
} from '@/config/index.js'
/**
 * 首页轮播图
 */
export const fetchHomeBanner = () => {
	return request({
		url: "/anno/slider/list",
		method: "GET",
	})
}
/**
 * 上传图片
 */
export const UploadFile = (filePath) => {
	return new Promise((resolve, reject) => {
		// 获取API基础URL
		
		uni.uploadFile({
			url: BASE_URL + "/wx/upload/file",
			filePath: filePath,
			name: "file",
			header: {
				Authorization: uni.getStorageSync('token') || '',
			},
			success: (res) => {
				try {
					resolve(JSON.parse(res.data));
				} catch (error) {
					reject(new Error('响应数据解析失败'));
				}
			},
			fail: (error) => {
				reject(error);
			}
		});
	});
}