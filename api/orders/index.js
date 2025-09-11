import request from '@/utils/request.js'

/**
 * 预览确认订单信息
 * 确认下单页面，由后台返回下单的商品信息，运费，可用优惠券，默认收货地址，默认门店地址，折扣优惠等信息
 */
export const fetchOrderPreview = (data) => {
	return request({
		url: "/wx/order/preview",
		method: "POST",
		data
	})
}

/**
 * 创建订单
 goodsList array [object {2}]  购买商品列表 必需
   skuId integer 规格ID 必需 
   goodsNum integer  购买数量

 memberCouponId integer 会员优惠券ID 可选
 memberRemark string 买家备注 可选
 deliveryType string 配送方式 必需 1.快递 2.自提
 memberAddressId integer 收货地址ID 可选 
 shopAddressId string 自提门店ID 可选
 contactName string 自提联系人（买家）可选
 contactMobile string 自提联系电话（买家）可选
 isCart boolean 是否是购物车下单 必需
   购物车页面提交的订单需要传true，下单成功后会从购物车清除已下单的商品
 flowPrice number 订单总计金额 必需 单位元，精度2位小数
 orderType 订单类型 可选 1.普通 2.秒杀 3.团购
 promotionId 促销活动ID 可选
 pintuanRecordId 拼团记录ID 参与哪个团的ID，不传表示自己开团
  */
export const fetchOrderCreate = (data) => {
	return request({
		url: "/wx/order/create",
		method: "POST",
    data
	})
}

/**
 * 订单支付
 * paymentMethod
string 
支付方式
必需
1.微信支付 2.余额支付 3.园区卡支付
orderId
string 
订单号

 */
export const fetchOrderPay = (data) => {
	return request({
		url: "/wx/order/pay",
		method: "POST",
    data
	})
}

/**
 * 订单列表
pageNum
integer 
页码，第几页
可选
示例值:
1
pageSize
integer 
页数，一页多少条
可选
示例值:
10
status
integer 
可选
状态: 10.待付款 20.待发货 30.待收货 40.已完成 50.已取消
 */
export const fetchOrderList = (data) => {
	return request({
		url: "/wx/order/list",
		method: "GET",
		data
	})
}

/**
 * 订单详情
 * orderId string 订单号
*/
export const fetchOrderDetail = (orderId) => {
	return request({
		url: `/wx/order/${orderId}`,
		method: "GET",
	})
}

/**
 * 取消订单
 * orderId string 订单号
*/
export const fetchOrderCancel = (orderId) => {
	return request({
		url: `/wx/order/cancel/${orderId}`,
		method: "GET",
	})
}

/**
 * 确认收货
 * orderId string 订单号
*/
export const fetchOrderComplete = (data) => {
	return request({
		url: `/wx/order/complete`,
		method: "POST",
		data
	})
}

/**
 * 核销订单
 * orderId
string 
订单号
必需
takeCode
string 
提货码

*/
export const fetchOrderVerify = (data) => {
	return request({
		url: `/wx/order/verify`,
		method: "POST",
    data
	})
}

/**
 * 查询物流轨迹
id
string 
订单号或售后单号
必需
type
integer 
查询类型 1.订单物流 2.售后物流
 */
export const fetchLogisticsTrace = (data) => {
	return request({
		url: `/wx/logistics/query-traces`,
		method: "POST",
    data
	})
}