(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["subpackages/order/list/list"],{

/***/ 261:
/*!****************************************************************************************************************!*\
  !*** F:/UniApp/products/shopping-projects/shopping_25_07/main.js?{"page":"subpackages%2Forder%2Flist%2Flist"} ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _list = _interopRequireDefault(__webpack_require__(/*! ./subpackages/order/list/list.vue */ 262));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_list.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 262:
/*!*******************************************************************************************!*\
  !*** F:/UniApp/products/shopping-projects/shopping_25_07/subpackages/order/list/list.vue ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _list_vue_vue_type_template_id_1ddf5cee_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list.vue?vue&type=template&id=1ddf5cee&scoped=true& */ 263);
/* harmony import */ var _list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list.vue?vue&type=script&lang=js& */ 265);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _list_vue_vue_type_style_index_0_id_1ddf5cee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./list.vue?vue&type=style&index=0&id=1ddf5cee&lang=scss&scoped=true& */ 268);
/* harmony import */ var _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _list_vue_vue_type_template_id_1ddf5cee_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _list_vue_vue_type_template_id_1ddf5cee_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1ddf5cee",
  null,
  false,
  _list_vue_vue_type_template_id_1ddf5cee_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "subpackages/order/list/list.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 263:
/*!**************************************************************************************************************************************!*\
  !*** F:/UniApp/products/shopping-projects/shopping_25_07/subpackages/order/list/list.vue?vue&type=template&id=1ddf5cee&scoped=true& ***!
  \**************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_1ddf5cee_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./list.vue?vue&type=template&id=1ddf5cee&scoped=true& */ 264);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_1ddf5cee_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_1ddf5cee_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_1ddf5cee_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_1ddf5cee_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 264:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/UniApp/products/shopping-projects/shopping_25_07/subpackages/order/list/list.vue?vue&type=template&id=1ddf5cee&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uIcon: function () {
      return Promise.all(/*! import() | uni_modules/uview-ui/components/u-icon/u-icon */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uview-ui/components/u-icon/u-icon.vue */ 411))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var l0 = _vm.__map(_vm.filteredOrders, function (order, index) {
    var $orig = _vm.__get_orig(order)
    var m0 = _vm.getStatusText(order.status)
    var m1 = _vm.getTotalQuantity(order.products)
    return {
      $orig: $orig,
      m0: m0,
      m1: m1,
    }
  })
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 265:
/*!********************************************************************************************************************!*\
  !*** F:/UniApp/products/shopping-projects/shopping_25_07/subpackages/order/list/list.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./list.vue?vue&type=script&lang=js& */ 266);
/* harmony import */ var _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 266:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/UniApp/products/shopping-projects/shopping_25_07/subpackages/order/list/list.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 55));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 57));
var _orders = __webpack_require__(/*! @/api/orders */ 267);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'OrderList',
  data: function data() {
    return {
      currentStatus: 'all',
      refreshing: false,
      loading: false,
      hasMore: true,
      page: 1,
      pageSize: 10,
      statusTabs: [{
        label: '全部',
        value: 'all'
      }, {
        label: '待付款',
        value: '10'
      }, {
        label: '待发货',
        value: '20'
      }, {
        label: '待收货',
        value: '30'
      }, {
        label: '已完成',
        value: '40'
      }],
      allOrders: []
    };
  },
  computed: {
    filteredOrders: function filteredOrders() {
      var _this = this;
      if (this.currentStatus === 'all') {
        return this.allOrders;
      }
      return this.allOrders.filter(function (order) {
        return order.status == _this.currentStatus;
      });
    }
  },
  onLoad: function onLoad(options) {
    console.log('订单列表页面接收到参数:', options);

    // 处理从mine页面传递的参数
    if (options.status) {
      this.currentStatus = options.status;
      console.log('设置当前状态为:', this.currentStatus);
    }
    if (options.tab) {
      // 根据tab参数设置当前状态
      var tabStatusMap = {
        'pending': '10',
        'processing': '20',
        'shipped': '30',
        'completed': '40'
      };
      if (tabStatusMap[options.tab]) {
        this.currentStatus = tabStatusMap[options.tab];
        console.log('根据tab设置当前状态为:', this.currentStatus);
      }
    }

    // 重置分页参数
    this.page = 1;
    this.hasMore = true;
    this.allOrders = [];
  },
  mounted: function mounted() {
    var _this2 = this;
    // 延迟加载，确保状态设置完成
    this.$nextTick(function () {
      console.log('mounted时的当前状态:', _this2.currentStatus);
      _this2.loadOrders();
    });
  },
  methods: {
    // 返回上一页
    goBack: function goBack() {
      uni.navigateBack({
        delta: 1
      });
    },
    // 复制订单号
    copyOrderNumber: function copyOrderNumber(orderNumber) {
      uni.setClipboardData({
        data: orderNumber,
        success: function success() {
          uni.showToast({
            title: '订单号已复制',
            icon: 'success',
            duration: 1500
          });
        },
        fail: function fail() {
          uni.showToast({
            title: '复制失败',
            icon: 'none',
            duration: 1500
          });
        }
      });
    },
    // 显示更多选项
    showMoreOptions: function showMoreOptions() {
      uni.showActionSheet({
        itemList: ['搜索订单', '联系客服'],
        success: function success(res) {
          if (res.tapIndex === 0) {
            // 搜索订单
            uni.showToast({
              title: '搜索功能开发中',
              icon: 'none'
            });
          } else if (res.tapIndex === 1) {
            // 联系客服
            uni.showToast({
              title: '客服功能开发中',
              icon: 'none'
            });
          }
        }
      });
    },
    // 切换状态
    switchStatus: function switchStatus(status) {
      this.currentStatus = status;
      this.page = 1;
      this.hasMore = true;
      this.allOrders = []; // 清空当前列表
      this.loadOrders();
    },
    // 获取状态文本
    getStatusText: function getStatusText(status) {
      var statusMap = {
        '10': '待付款',
        '20': '待发货',
        '30': '待收货',
        '40': '已完成',
        '50': '已取消'
      };
      return statusMap[status] || '未知状态';
    },
    // 获取商品总数量
    getTotalQuantity: function getTotalQuantity(products) {
      return products.reduce(function (total, product) {
        return total + product.quantity;
      }, 0);
    },
    // 处理API返回的订单数据
    processOrderData: function processOrderData(orderData) {
      var _this3 = this;
      return {
        id: orderData.orderId,
        orderNumber: orderData.orderId,
        createTime: this.formatTime(orderData.createTime),
        status: orderData.status,
        totalAmount: parseFloat(orderData.flowPrice || 0).toFixed(2),
        products: (orderData.orderItems || []).map(function (goods) {
          return {
            image: goods.goodsImage || '',
            name: goods.goodsName || '商品名称',
            attributes: _this3.formatSpecs(goods.specs),
            price: parseFloat(goods.unitPrice || 0).toFixed(2),
            quantity: goods.goodsNum || 1
          };
        }),
        secondaryActions: this.getSecondaryActions(orderData.status),
        primaryActions: this.getPrimaryActions(orderData.status)
      };
    },
    // 格式化时间
    formatTime: function formatTime(timeStr) {
      if (!timeStr) return '';
      try {
        var date = new Date(timeStr);
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var day = String(date.getDate()).padStart(2, '0');
        var hours = String(date.getHours()).padStart(2, '0');
        var minutes = String(date.getMinutes()).padStart(2, '0');
        return "".concat(year, "-").concat(month, "-").concat(day, " ").concat(hours, ":").concat(minutes);
      } catch (error) {
        return timeStr;
      }
    },
    // 格式化规格信息
    formatSpecs: function formatSpecs(specs) {
      if (!specs) return '';
      if (typeof specs === 'string') {
        try {
          var specsArray = JSON.parse(specs);
          if (Array.isArray(specsArray)) {
            return specsArray.join(' | ');
          }
          return specs;
        } catch (error) {
          return specs;
        }
      }
      if (Array.isArray(specs)) {
        return specs.join(' | ');
      }
      return String(specs);
    },
    // 获取次要操作按钮
    getSecondaryActions: function getSecondaryActions(status) {
      var actions = [];
      switch (status) {
        case '10': // 待付款
        case 10:
          // 待付款
          actions.push({
            type: 'cancel',
            text: '取消订单'
          });
          break;
        case '20': // 待发货
        case 20:
          // 待发货
          actions.push({
            type: 'afterSale',
            text: '申请售后'
          });
          break;
        case '30': // 待收货
        case 30:
          // 待收货
          actions.push({
            type: 'logistics',
            text: '查看物流'
          });
          actions.push({
            type: 'confirmReceipt',
            text: '确认收货'
          });
          break;
        case '40': // 已完成
        case 40:
          // 已完成
          actions.push({
            type: 'reorder',
            text: '再来一单'
          });
          // 根据业务需求，已完成状态也可以申请售后（比如在收货后7天内）
          actions.push({
            type: 'afterSale',
            text: '申请售后'
          });
          break;
        case 'all':
          // 全部状态
          actions.push({
            type: 'logistics',
            text: '查看物流'
          });
          actions.push({
            type: 'afterSale',
            text: '申请售后'
          });
          break;
      }
      return actions;
    },
    // 获取主要操作按钮
    getPrimaryActions: function getPrimaryActions(status) {
      var actions = [];
      switch (status) {
        case '10':
          // 待付款
          actions.push({
            type: 'pay',
            text: '继续付款'
          });
          break;
        case '20':
          // 待发货
          actions.push({
            type: 'reorder',
            text: '再来一单'
          });
          break;
        case '30':
          // 待收货
          actions.push({
            type: 'confirm',
            text: '确认收货'
          });
          break;
        case '40':
          // 已完成
          actions.push({
            type: 'review',
            text: '去评价'
          });
          break;
      }
      return actions;
    },
    // 加载订单数据
    loadOrders: function loadOrders() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var params, response, orderList, newOrders;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!_this4.loading) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt("return");
              case 2:
                _this4.loading = true;
                _context.prev = 3;
                params = {
                  pageNum: _this4.page,
                  pageSize: _this4.pageSize
                }; // 如果不是全部状态，添加状态过滤
                if (_this4.currentStatus !== 'all') {
                  params.status = _this4.currentStatus;
                }

                // TODO fetchOrderList 会在这里使用
                _context.next = 8;
                return (0, _orders.fetchOrderList)(params);
              case 8:
                response = _context.sent;
                if (response.code === 200 && response.rows.length) {
                  orderList = response.rows || [];
                  newOrders = orderList.map(function (order) {
                    return _this4.processOrderData(order);
                  });
                  if (_this4.page === 1) {
                    _this4.allOrders = newOrders;
                  } else {
                    _this4.allOrders = [].concat((0, _toConsumableArray2.default)(_this4.allOrders), (0, _toConsumableArray2.default)(newOrders));
                  }

                  // 判断是否还有更多数据
                  if (newOrders.length < _this4.pageSize) {
                    _this4.hasMore = false;
                  }
                }
                _context.next = 16;
                break;
              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](3);
                console.error('Failed to fetch orders:', _context.t0);
                uni.showToast({
                  title: '加载订单失败',
                  icon: 'none'
                });
              case 16:
                _context.prev = 16;
                // 3秒超时自动关闭
                _this4.loading = false;
                _this4.page++;
                return _context.finish(16);
              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 12, 16, 20]]);
      }))();
    },
    // 下拉刷新
    onRefresh: function onRefresh() {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var params, response, orderList;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this5.refreshing = true;
                _this5.page = 1;
                _this5.hasMore = true;
                _context2.prev = 3;
                params = {
                  pageNum: _this5.page,
                  pageSize: _this5.pageSize
                }; // 如果不是全部状态，添加状态过滤
                if (_this5.currentStatus !== 'all') {
                  params.status = _this5.currentStatus;
                }

                // TODO fetchOrderList 会在这里使用
                _context2.next = 8;
                return (0, _orders.fetchOrderList)(params);
              case 8:
                response = _context2.sent;
                if (response.code === 200 && response.data) {
                  orderList = response.data.rows || response.data.list || response.data.records || [];
                  _this5.allOrders = orderList.map(function (order) {
                    return _this5.processOrderData(order);
                  });
                }
                _context2.next = 16;
                break;
              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](3);
                console.error('Failed to refresh orders:', _context2.t0);
                uni.showToast({
                  title: '刷新订单失败',
                  icon: 'none'
                });
              case 16:
                _context2.prev = 16;
                _this5.refreshing = false;
                return _context2.finish(16);
              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[3, 12, 16, 19]]);
      }))();
    },
    // 上拉加载更多
    onLoadMore: function onLoadMore() {
      if (this.hasMore && !this.loading) {
        this.loadOrders();
      }
    },
    // 处理按钮点击
    handleAction: function handleAction(actionType, order) {
      switch (actionType) {
        case 'cancel':
          this.cancelOrder(order);
          break;
        case 'pay':
          this.payOrder(order);
          break;
        case 'afterSale':
          this.afterSale(order);
          break;
        case 'reorder':
          this.reorder(order);
          break;
        case 'logistics':
          this.viewLogistics(order);
          break;
        case 'confirm':
          this.confirmOrder(order);
          break;
        case 'confirmReceipt':
          this.confirmReceipt(order);
          break;
        case 'review':
          this.reviewOrder(order);
          break;
        default:
          uni.showToast({
            title: '功能开发中',
            icon: 'none'
          });
      }
    },
    // 取消订单
    cancelOrder: function cancelOrder(order) {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                uni.showModal({
                  title: '确认取消',
                  content: '确定要取消这个订单吗？',
                  success: function () {
                    var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(res) {
                      return _regenerator.default.wrap(function _callee3$(_context3) {
                        while (1) {
                          switch (_context3.prev = _context3.next) {
                            case 0:
                              if (res.confirm) {
                                try {
                                  // TODO 取消订单接口 会在这里使用
                                  // const response = await cancelOrderApi(order.id)
                                  // if (response.code === 200) {
                                  uni.showToast({
                                    title: '订单已取消',
                                    icon: 'success'
                                  });
                                  _this6.onRefresh(); // 刷新订单列表
                                  // } else {
                                  //	uni.showToast({ title: response.msg || '取消订单失败', icon: 'none' })
                                  // }
                                } catch (error) {
                                  uni.showToast({
                                    title: '取消订单失败',
                                    icon: 'none'
                                  });
                                }
                              }
                            case 1:
                            case "end":
                              return _context3.stop();
                          }
                        }
                      }, _callee3);
                    }));
                    function success(_x) {
                      return _success.apply(this, arguments);
                    }
                    return success;
                  }()
                });
              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    // 继续付款
    payOrder: function payOrder(order) {
      // 跳转到订单详情页面进行支付
      uni.navigateTo({
        url: "/subpackages/order/detail/detail?orderId=".concat(order.id, "&orderNumber=").concat(order.orderNumber)
      });
    },
    // 申请售后
    afterSale: function afterSale(order) {
      // 构建跳转参数
      var params = {
        orderId: order.orderNumber,
        orderItemId: order.id,
        orderStatus: order.status
      };

      // 如果有商品信息，也传递过去
      if (order.products && order.products.length > 0) {
        var product = order.products[0]; // 取第一个商品
        params.productName = encodeURIComponent(product.name);
        params.productImage = encodeURIComponent(product.image);
        params.productPrice = product.price;
      }

      // 构建URL参数
      var urlParams = Object.keys(params).map(function (key) {
        return "".concat(key, "=").concat(params[key]);
      }).join('&');
      uni.navigateTo({
        url: "/subpackages/order/afterSale/afterSale?".concat(urlParams)
      });
    },
    // 确认收货
    confirmReceipt: function confirmReceipt(order) {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                uni.showModal({
                  title: '确认收货',
                  content: '确认已收到商品吗？确认后订单将完成。',
                  success: function () {
                    var _success2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(res) {
                      var response;
                      return _regenerator.default.wrap(function _callee5$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                              if (!res.confirm) {
                                _context5.next = 21;
                                break;
                              }
                              _context5.prev = 1;
                              uni.showLoading({
                                title: '处理中...'
                              });

                              // TODO fetchOrderComplete 会在这里使用
                              _context5.next = 5;
                              return (0, _orders.fetchOrderComplete)({
                                orderId: order.orderNumber || order.id
                              });
                            case 5:
                              response = _context5.sent;
                              if (!(response.code === 200)) {
                                _context5.next = 11;
                                break;
                              }
                              uni.showToast({
                                title: '确认收货成功',
                                icon: 'success'
                              });
                              // 刷新订单列表
                              setTimeout(function () {
                                _this7.onRefresh();
                              }, 200);
                              _context5.next = 12;
                              break;
                            case 11:
                              throw new Error(response.msg || '确认收货失败');
                            case 12:
                              _context5.next = 18;
                              break;
                            case 14:
                              _context5.prev = 14;
                              _context5.t0 = _context5["catch"](1);
                              console.error('确认收货失败:', _context5.t0);
                              uni.showToast({
                                title: _context5.t0.message || '确认收货失败，请重试',
                                icon: 'none'
                              });
                            case 18:
                              _context5.prev = 18;
                              uni.hideLoading();
                              return _context5.finish(18);
                            case 21:
                            case "end":
                              return _context5.stop();
                          }
                        }
                      }, _callee5, null, [[1, 14, 18, 21]]);
                    }));
                    function success(_x2) {
                      return _success2.apply(this, arguments);
                    }
                    return success;
                  }()
                });
              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    // 再来一单
    reorder: function reorder(order) {
      uni.showToast({
        title: '添加到购物车',
        icon: 'success'
      });
    },
    // 查看物流
    viewLogistics: function viewLogistics(order) {
      uni.navigateTo({
        url: '/subpackages/order/logistics/logistics?orderId=' + order.id
      });
    },
    // 确认收货
    confirmOrder: function confirmOrder(order) {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                uni.showModal({
                  title: '确认收货',
                  content: '确认已收到商品吗？',
                  success: function () {
                    var _success3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(res) {
                      return _regenerator.default.wrap(function _callee7$(_context7) {
                        while (1) {
                          switch (_context7.prev = _context7.next) {
                            case 0:
                              if (res.confirm) {
                                try {
                                  // TODO 确认收货接口 会在这里使用
                                  // const response = await confirmReceiptApi(order.id)
                                  // if (response.code === 200) {
                                  uni.showToast({
                                    title: '确认收货成功',
                                    icon: 'success'
                                  });
                                  _this8.onRefresh(); // 刷新订单列表
                                  // } else {
                                  //	uni.showToast({ title: response.msg || '确认收货失败', icon: 'none' })
                                  // }
                                } catch (error) {
                                  uni.showToast({
                                    title: '确认收货失败',
                                    icon: 'none'
                                  });
                                }
                              }
                            case 1:
                            case "end":
                              return _context7.stop();
                          }
                        }
                      }, _callee7);
                    }));
                    function success(_x3) {
                      return _success3.apply(this, arguments);
                    }
                    return success;
                  }()
                });
              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    },
    // 去评价
    reviewOrder: function reviewOrder(order) {
      uni.navigateTo({
        url: '/subpackages/order/evaluate/evaluate'
      });
    },
    // 查看订单详情
    viewOrderDetail: function viewOrderDetail(order) {
      uni.navigateTo({
        url: "/subpackages/order/ViewOrderInfo/ViewOrderInfo?orderId=".concat(order.orderNumber || order.id)
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 268:
/*!*****************************************************************************************************************************************************!*\
  !*** F:/UniApp/products/shopping-projects/shopping_25_07/subpackages/order/list/list.vue?vue&type=style&index=0&id=1ddf5cee&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_style_index_0_id_1ddf5cee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./list.vue?vue&type=style&index=0&id=1ddf5cee&lang=scss&scoped=true& */ 269);
/* harmony import */ var _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_style_index_0_id_1ddf5cee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_style_index_0_id_1ddf5cee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_style_index_0_id_1ddf5cee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_style_index_0_id_1ddf5cee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_style_index_0_id_1ddf5cee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 269:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/UniApp/products/shopping-projects/shopping_25_07/subpackages/order/list/list.vue?vue&type=style&index=0&id=1ddf5cee&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[261,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subpackages/order/list/list.js.map