import request from '@/utils/request.js'

/**
 * 三级地址
 *  "id": "1767392532257461749",
    "adCode": "370612",
    "center": "121.601015,37.387454",
    "cityCode": "0535",
    "level": "district",
    "name": "牟平区",
    "orderNum": 3,
    "parentId": "1767392532257461709",
    "path": ",0,1767392532257461287,1767392532257461709",
    "children": null
 */
export const fetchAdressTree = () => {
	return request({
		url: "/wx/region/tree",
		method: "GET",
	})
}
/**
 * 收货地址列表
 * pageNum
 * pageSize
 */
export const fetchAddressList = (data) => {
	return request({
		url: "/wx/address/list",
		method: "GET",
		data
	})
}
/**
 * 新增收货地址
 * consigneeAddressIdPath 地址ID 行政区域path，英文逗号分隔
 * consigneeAddressPath 地区 必需 中文，英文逗号分隔 <= 128 字符
 * detail string 详细地址 必需<= 100 字符
 * lat 纬度
 * lon 经度
 * mobile string 收货人手机号 必需
 * name 收货人姓名 必需
 * isDefault 是否默认地址 可选 0否1是
 */
export const fetchAddressAdd = (data) => {
	return request({
		url: "/wx/address",
		method: "POST",
		data
	})
}
/**
 * 修改收货地址
 * id 必需
 * consigneeAddressIdPath 地址ID 行政区域path，英文逗号分隔
 * consigneeAddressPath 地区 必需 中文，英文逗号分隔 <= 128 字符
 * detail string 详细地址 必需<= 100 字符
 * lat 纬度
 * lon 经度
 * mobile string 收货人手机号 必需
 * name 收货人姓名 必需
 * isDefault 是否默认地址 可选 0否1是
 */
export const fetchAddressEdit = (data) => {
	return request({
		url: "/wx/address",
		method: "PUT",
		data
	})
}
/**
 * 删除收货地址
 * id 必需
 */
export const fetchAddressDelete = (id) => {
	return request({
		url: `/wx/address/${id}`,
		method: "DELETE",
	})
}
/**
 * 设置为默认地址
 * id integer 必需
 */
export const setAddressDefault = (data) => {
	return request({
		url: `/wx/address/set-default`,
		method: "POST",
		data
	})
}
/**
 * 收货地址详情
 * id integer 必需 示例值:1
 */
export const fetchAddressDetail = (id) => {
	return request({
		url: `/wx/address/${id}`,
		method: "GET",
	})
}