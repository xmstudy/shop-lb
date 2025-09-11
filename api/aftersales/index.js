import request from '@/utils/request.js'

/**
 * 售后原因选项列表
 */
export const fetchAfterSaleReasons = () => {
	return request({
		url: "/wx/after-sale-reasons",
		method: "GET",
	})
}

/**
 * 新增售后退款
 * @param {Object} data 售后申请数据
 * @param {string} data.orderId 订单号
 * @param {string} data.orderItemId 子订单编号
 * @param {string} data.serviceType 售后类型 1.仅退款 2.退货退款
 * @param {string} data.reason 申请原因不能为空
 * @param {string} data.problemDesc 申请说明<= 100 字符
 * @param {string} data.afterSaleImage 图片凭证 最多一张
 */
export const submitAfterSale = (data) => {
	return request({
		url: "/wx/after-sale",
		method: "POST",
		data
	})
}