import request from "@/utils/request.js";

/**
 *	微信小程序登录接口
	@param {string} code   
 */
export const WxLogin = (data) => {
  return request({
    url: "/wx/login",
    method: "GET",
    data,
  });
};
/**
 *	授权手机号
	@param {string} code   
 */
export const WxPhone = (data) => {
  return request({
    url: "/wx/auth-phone",
    method: "POST",
    data,
  });
};
