import request from "@/utils/request.js";

/**
 * 分页搜索文章列表
 */
export const fetchArticleList = (params) => {
  return request({
    url: "/anno/article/list",
    method: "GET",
    params,
  });
};
/**
 * 文章详情
 * 1.雷波农特产品 2.雷波县情介绍
 */
export const fetchArticleDetail = (id) => {
  return request({
    url: `/anno/article/${id}`,
    method: "GET",
  });
};
