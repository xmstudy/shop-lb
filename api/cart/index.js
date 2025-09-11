import request from '@/utils/request.js'

/**
 * 查询购物车
 */
export const fetchCartList = () => {
	return request({
		url: "/wx/cart/get-all",
		method: "GET",
	})
}
/**
 * 查询购物车商品数量
 */
export const fetchCartCount = () => {
	return request({
		url: "/wx/cart/count",
		method: "GET",
	})
}
/**
 * 加购物车
 * skuId 商品规格ID 必需
 * goodsNum 购买数量
 */
export const AddCart = (data) => {
	return request({
		url: "/wx/cart",
		method: "POST",
		data
	})
}
/**
 * 修改购物车商品数量
 * skuId 商品规格ID 必需
 * goodsNum 购买数量
 */
export const changeCartNum = (data) => {
	return request({
		url: "/wx/cart",
		method: "POST",
		data
	})
}
/**
 * 删除购物车商品
 skuIds skuId 多个逗号分隔，例如1,2,3
 */
export const deleteCart = (skuIds) => {
	return request({
		url: `/wx/cart/${skuIds}`,
		method: "DELETE",
	})
}