(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["subpackages/order/detail/detail"],{

/***/ 270:
/*!********************************************************************************************************************!*\
  !*** F:/UniApp/products/shopping-projects/shopping_25_07/main.js?{"page":"subpackages%2Forder%2Fdetail%2Fdetail"} ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _detail = _interopRequireDefault(__webpack_require__(/*! ./subpackages/order/detail/detail.vue */ 271));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_detail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 271:
/*!***********************************************************************************************!*\
  !*** F:/UniApp/products/shopping-projects/shopping_25_07/subpackages/order/detail/detail.vue ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _detail_vue_vue_type_template_id_08f7b1ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detail.vue?vue&type=template&id=08f7b1ce&scoped=true& */ 272);
/* harmony import */ var _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detail.vue?vue&type=script&lang=js& */ 274);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _detail_vue_vue_type_style_index_0_id_08f7b1ce_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detail.vue?vue&type=style&index=0&id=08f7b1ce&lang=scss&scoped=true& */ 276);
/* harmony import */ var _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _detail_vue_vue_type_template_id_08f7b1ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _detail_vue_vue_type_template_id_08f7b1ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "08f7b1ce",
  null,
  false,
  _detail_vue_vue_type_template_id_08f7b1ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "subpackages/order/detail/detail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 272:
/*!******************************************************************************************************************************************!*\
  !*** F:/UniApp/products/shopping-projects/shopping_25_07/subpackages/order/detail/detail.vue?vue&type=template&id=08f7b1ce&scoped=true& ***!
  \******************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_08f7b1ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=template&id=08f7b1ce&scoped=true& */ 273);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_08f7b1ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_08f7b1ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_08f7b1ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_08f7b1ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 273:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/UniApp/products/shopping-projects/shopping_25_07/subpackages/order/detail/detail.vue?vue&type=template&id=08f7b1ce&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    uPopup: function () {
      return Promise.all(/*! import() | uni_modules/uview-ui/components/u-popup/u-popup */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uview-ui/components/u-popup/u-popup")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uview-ui/components/u-popup/u-popup.vue */ 435))
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
  var g0 = !_vm.loading ? _vm.productList && _vm.productList.length > 0 : null
  var g1 = !_vm.loading ? _vm.goodsTotalPrice.toFixed(2) : null
  var g2 = _vm.availableCoupons.length
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1,
        g2: g2,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 274:
/*!************************************************************************************************************************!*\
  !*** F:/UniApp/products/shopping-projects/shopping_25_07/subpackages/order/detail/detail.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=script&lang=js& */ 275);
/* harmony import */ var _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 275:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/UniApp/products/shopping-projects/shopping_25_07/subpackages/order/detail/detail.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 57));
var _globalData = _interopRequireDefault(__webpack_require__(/*! @/utils/globalData.js */ 185));
var _orders = __webpack_require__(/*! @/api/orders */ 267);
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var BaseContainer = function BaseContainer() {
  __webpack_require__.e(/*! require.ensure | components/BaseWrapper */ "components/BaseWrapper").then((function () {
    return resolve(__webpack_require__(/*! @/components/BaseWrapper.vue */ 428));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  name: 'OrderDetail',
  components: {
    BaseContainer: BaseContainer
  },
  data: function data() {
    return {
      showCoupon: false,
      showPayment: false,
      showPaymentSuccess: false,
      // 支付成功弹窗显示状态
      paymentAmount: '0.00',
      // 支付金额
      orderData: null,
      // 存储订单数据
      loading: true,
      // 加载状态
      selectedAddress: null,
      // 选中的地址
      shippingFee: 0,
      // 运费
      discountAmount: 0,
      // 折扣金额
      totalAmount: 0,
      // 总金额
      productInfo: null,
      // 单个商品信息（兼容旧版本）
      productList: [],
      // 多商品列表
      availableCoupons: [],
      // 可用优惠券
      selectedCoupons: [],
      paymentMethods: [{
        name: '微信支付',
        desc: '推荐使用微信支付',
        icon: 'weixin-fill',
        selected: true
      }, {
        name: '对公转账',
        desc: '企业用户推荐',
        icon: 'plus-people-fill',
        selected: false
      }],
      selectedPayment: {
        name: '微信支付',
        desc: '推荐使用微信支付',
        icon: 'weixin-fill'
      }
    };
  },
  computed: {
    // 计算商品价格合计
    goodsTotalPrice: function goodsTotalPrice() {
      if (this.orderData && this.orderData.goodsList && this.orderData.goodsList.length > 0) {
        return this.orderData.goodsList.reduce(function (sum, goods) {
          var price = parseFloat(goods.goodsPrice || 0);
          var quantity = parseInt(goods.goodsNum || 1);
          return sum + price * quantity;
        }, 0);
      }
      // 如果没有订单数据，使用产品列表计算
      if (this.productList && this.productList.length > 0) {
        return this.productList.reduce(function (sum, product) {
          var unitPrice = parseFloat(product.unitPrice || 0);
          var quantity = parseInt(product.quantity || 1);
          return sum + unitPrice * quantity;
        }, 0);
      }
      // 兼容旧版本 - 使用单个商品信息
      if (this.productInfo) {
        return parseFloat(this.productInfo.price || 0);
      }
      return 0;
    },
    // 计算优惠券折扣总额
    couponDiscount: function couponDiscount() {
      return this.selectedCoupons.reduce(function (sum, coupon) {
        // 兼容新旧数据格式
        var amount = coupon.originalData ? coupon.originalData.price : parseFloat(coupon.amount);
        return sum + amount;
      }, 0);
    },
    totalPrice: function totalPrice() {
      // 商品价格合计 + 运费 - 优惠券折扣
      var goodsTotal = this.goodsTotalPrice;
      var shippingFee = parseFloat(this.shippingFee || 0);
      var couponDiscount = this.couponDiscount;
      return (goodsTotal + shippingFee - couponDiscount).toFixed(2);
    },
    couponText: function couponText() {
      if (this.selectedCoupons.length === 0) {
        return "".concat(this.availableCoupons.length, "\u5F20\u53EF\u7528");
      } else {
        return "- \xA5".concat(this.couponDiscount.toFixed(1));
      }
    },
    couponTextClass: function couponTextClass() {
      return this.selectedCoupons.length > 0 ? 'discount-highlight' : '';
    },
    totalDiscount: function totalDiscount() {
      return this.availableCoupons.reduce(function (sum, coupon) {
        // 兼容新旧数据格式
        var amount = coupon.originalData ? coupon.originalData.price : parseFloat(coupon.amount);
        return sum + amount;
      }, 0).toFixed(1);
    },
    selectedDiscount: function selectedDiscount() {
      return this.couponDiscount.toFixed(1);
    }
  },
  onLoad: function onLoad(options) {
    // 处理从外部传递过来的订单数据
    if (options.orderData) {
      try {
        var orderData = JSON.parse(decodeURIComponent(options.orderData));
        this.orderData = orderData; // 存储订单数据
      } catch (error) {
        console.error('解析订单数据失败:', error);
      }
    }
  },
  onShow: function onShow() {
    var _this = this;
    console.log('onShow - globalData:', _globalData.default);
    console.log('onShow - this.orderData:', this.orderData);

    // 检查是否有全局地址数据
    if (_globalData.default.selectedAddress) {
      this.selectedAddress = _globalData.default.selectedAddress;
      _globalData.default.selectedAddress = null; // 用完即清空
    }

    // 检查是否有全局订单数据需要处理
    if (_globalData.default.orderData && (!this.orderData || !this.orderData.goodsList)) {
      this.orderData = _globalData.default.orderData;
      _globalData.default.orderData = null; // 用完即清空

      // 有全局订单数据时，需要获取订单预览来补充完整信息
      setTimeout(function () {
        _this.getOrderPreview();
      }, 100);
    } else if (!this.orderData || !this.orderData.goodsList) {
      // 没有任何订单数据时，获取订单预览
      setTimeout(function () {
        _this.getOrderPreview();
      }, 100);
    } else {
      // 如果已经有完整的订单数据，直接结束loading状态
      console.log('已有完整订单数据，直接结束loading');
      this.loading = false;
    }
  },
  onUnload: function onUnload() {
    // 页面卸载时清理全局数据
    _globalData.default.selectedAddress = null;
  },
  methods: {
    // 获取订单预览数据
    getOrderPreview: function getOrderPreview() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var requestData, res;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                // 构建请求参数
                requestData = {
                  goodsList: [],
                  orderType: 1,
                  // 默认普通订单
                  promotionId: null // 默认无促销活动
                }; // 如果有全局订单数据，使用它

                console.log('getOrderPreview - globalData.orderData:', _globalData.default.orderData);
                console.log('getOrderPreview - this.orderData:', _this2.orderData);
                if (!_globalData.default.orderData) {
                  _context.next = 9;
                  break;
                }
                requestData = {
                  goodsList: _globalData.default.orderData.goodsList || [],
                  orderType: _globalData.default.orderData.orderType || 1,
                  promotionId: _globalData.default.orderData.promotionId || null
                };
                _globalData.default.orderData = null; // 用完即清空
                _context.next = 17;
                break;
              case 9:
                if (!(_this2.orderData && _this2.orderData.goodsList)) {
                  _context.next = 13;
                  break;
                }
                // 如果有本地订单数据，使用它
                requestData = {
                  goodsList: _this2.orderData.goodsList || [],
                  orderType: _this2.orderData.orderType || 1,
                  promotionId: _this2.orderData.promotionId || null
                };
                _context.next = 17;
                break;
              case 13:
                // 没有订单数据，结束loading并提示跳转
                _this2.loading = false;
                uni.showToast({
                  title: '订单数据已失效',
                  icon: 'none'
                });
                setTimeout(function () {
                  uni.reLaunch({
                    url: '/pages/index/index'
                  });
                }, 1000);
                return _context.abrupt("return");
              case 17:
                _context.next = 19;
                return (0, _orders.fetchOrderPreview)(requestData);
              case 19:
                res = _context.sent;
                if (res.code === 200) {
                  // 更新页面数据
                  _this2.updateOrderPreview(res.data);
                } else {
                  // 接口失败时也要结束loading
                  _this2.loading = false;
                  uni.showToast({
                    title: res.msg || '获取订单预览失败',
                    icon: 'error'
                  });
                }
                _context.next = 28;
                break;
              case 23:
                _context.prev = 23;
                _context.t0 = _context["catch"](0);
                console.error('获取订单预览失败:', _context.t0);
                // 网络错误时也要结束loading
                _this2.loading = false;
                uni.showToast({
                  title: '网络错误，请重试',
                  icon: 'error'
                });
              case 28:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 23]]);
      }))();
    },
    // 更新订单预览信息
    updateOrderPreview: function updateOrderPreview(data) {
      var _this3 = this;
      // 更新商品信息 - 处理多个商品
      if (data.goodsList && data.goodsList.length > 0) {
        // 构建商品列表
        this.productList = data.goodsList.map(function (goods) {
          return {
            image: goods.goodsImage || '/static/images/home.png',
            name: goods.goodsName || '商品名称',
            description: "".concat(_this3.formatSpecs(goods.specs) || '默认规格', " | \u5355\u4EF7 \xA5").concat(goods.goodsPrice || '0'),
            price: (goods.goodsPrice * goods.goodsNum).toFixed(2),
            quantity: goods.goodsNum || 1,
            unitPrice: goods.goodsPrice || 0
          };
        });

        // 兼容旧版本 - 保留第一个商品的信息
        var firstGoods = data.goodsList[0];
        this.productInfo = {
          image: firstGoods.goodsImage || '/static/images/home.png',
          name: firstGoods.goodsName || '雷波青茶',
          description: "".concat(this.formatSpecs(firstGoods.specs) || '10斤装', " | ").concat(firstGoods.goodsPrice || '199.9', "\u5143"),
          price: (firstGoods.goodsPrice * firstGoods.goodsNum).toString(),
          quantity: firstGoods.goodsNum || 1
        };
      }

      // 存储完整的商品列表（用于后续创建订单）
      this.orderData = {
        goodsList: data.goodsList,
        totalPrice: data.totalAmount,
        orderType: data.orderType || 1,
        promotionId: data.promotionId || null
      };

      // 只有在没有地址数据时才更新地址，避免覆盖用户已选择的地址
      if (data.memberAddress && (!this.selectedAddress || !this.selectedAddress.id)) {
        this.selectedAddress = {
          id: data.memberAddress.id,
          name: data.memberAddress.name || data.memberAddress.consigneeName,
          phone: data.memberAddress.mobile || data.memberAddress.phone || data.memberAddress.consigneePhone,
          province: data.memberAddress.province || '',
          city: data.memberAddress.city || '',
          district: data.memberAddress.district || '',
          detail: data.memberAddress.detail || data.memberAddress.consigneeAddress || '',
          isDefault: data.memberAddress.isDefault || false
        };

        // 如果有地址路径，解析省市区
        if (data.memberAddress.consigneeAddressPath) {
          var addressParts = data.memberAddress.consigneeAddressPath.split(',');
          if (addressParts.length >= 3) {
            this.selectedAddress.province = addressParts[0];
            this.selectedAddress.city = addressParts[1];
            this.selectedAddress.district = addressParts[2];
          }
        }
      }

      // 更新优惠券列表 - 处理真实的优惠券数据格式
      if (data.coupons && Array.isArray(data.coupons)) {
        this.availableCoupons = data.coupons.map(function (coupon) {
          return {
            id: coupon.id,
            amount: coupon.price.toString(),
            // 面额
            label: coupon.couponName,
            // 优惠券名称
            dateRange: _this3.formatCouponDateRange(coupon.endTime),
            // 过期时间
            note: "\u6EE1".concat(coupon.useAmount, "\u53EF\u7528"),
            // 使用条件
            selected: false,
            // 保存原始数据用于后续处理
            originalData: coupon
          };
        });
      } else if (data.availableCoupons) {
        // 兼容旧格式
        this.availableCoupons = data.availableCoupons;
      }

      // 更新运费
      this.shippingFee = data.shippingFee || 0;

      // 更新折扣金额
      this.discountAmount = data.discountAmount || 0;

      // 更新总金额
      this.totalAmount = data.totalAmount || 0;

      // 更新已选优惠券
      if (data.selectedCoupons) {
        this.selectedCoupons = data.selectedCoupons;
        this.updateSelectedCoupons();
      }

      // 数据加载完成，隐藏骨架屏
      this.loading = false;
    },
    // 格式化规格显示
    formatSpecs: function formatSpecs(specs) {
      try {
        var specsArray = JSON.parse(specs);
        return specsArray.join(' / ');
      } catch (error) {
        return specs;
      }
    },
    // 格式化优惠券日期范围
    formatCouponDateRange: function formatCouponDateRange(endTime) {
      try {
        if (!endTime) return '有效期未知';
        var endDate = new Date(endTime);
        var now = new Date();

        // 格式化结束时间
        var endDateStr = endDate.toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).replace(/\//g, '.');

        // 如果已过期，显示过期
        if (endDate < now) {
          return "\u5DF2\u8FC7\u671F (".concat(endDateStr, ")");
        }

        // 计算剩余天数
        var diffTime = endDate - now;
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 7) {
          return "\u5373\u5C06\u8FC7\u671F (".concat(endDateStr, ")");
        } else {
          return "\u6709\u6548\u671F\u81F3 ".concat(endDateStr);
        }
      } catch (error) {
        console.error('格式化优惠券日期失败:', error);
        return '有效期未知';
      }
    },
    selectAddress: function selectAddress() {
      // 跳转到地址列表页面，标记为从订单页面进入
      uni.navigateTo({
        url: '/subpackages/address/list/list?from=order'
      });
    },
    addAddress: function addAddress() {
      // 跳转到地址列表页面，用于添加新地址
      uni.navigateTo({
        url: '/subpackages/address/list/list?from=order'
      });
    },
    // 更新地址信息
    updateAddress: function updateAddress(address) {
      console.log('地址更新:', address);
      // 确保使用 mobile 字段作为电话
      var updatedAddress = _objectSpread(_objectSpread({}, address), {}, {
        phone: address.mobile || address.phone
      });
      this.selectedAddress = updatedAddress;
      // 将地址数据存储到全局，确保页面切换时数据不丢失
      _globalData.default.selectedAddress = updatedAddress;
      // 地址更新后不自动调用预览接口，保持用户修改的地址
    },
    showCouponModal: function showCouponModal() {
      this.showCoupon = true;
    },
    closeCouponModal: function closeCouponModal() {
      this.showCoupon = false;
    },
    toggleCoupon: function toggleCoupon(index) {
      this.availableCoupons[index].selected = !this.availableCoupons[index].selected;
      this.updateSelectedCoupons();
    },
    updateSelectedCoupons: function updateSelectedCoupons() {
      this.selectedCoupons = this.availableCoupons.filter(function (coupon) {
        return coupon.selected;
      });
    },
    confirmCouponSelection: function confirmCouponSelection() {
      this.updateSelectedCoupons();
      this.closeCouponModal();
      // 优惠券选择后不自动调用预览接口，保持用户选择
    },
    showPaymentModal: function showPaymentModal() {
      this.showPayment = true;
    },
    closePaymentModal: function closePaymentModal() {
      this.showPayment = false;
    },
    selectPayment: function selectPayment(index) {
      // 重置所有支付方式的选择状态
      this.paymentMethods.forEach(function (payment, i) {
        payment.selected = i === index;
      });
    },
    confirmPaymentSelection: function confirmPaymentSelection() {
      // 更新选中的支付方式
      var selectedPayment = this.paymentMethods.find(function (payment) {
        return payment.selected;
      });
      if (selectedPayment) {
        this.selectedPayment = selectedPayment;
      }
      this.closePaymentModal();
    },
    confirmOrder: function confirmOrder() {
      // 验证地址
      if (!this.selectedAddress || !this.selectedAddress.name) {
        uni.showToast({
          title: '请选择收货地址',
          icon: 'error'
        });
        return;
      }

      // 验证支付方式
      if (!this.selectedPayment) {
        uni.showToast({
          title: '请选择支付方式',
          icon: 'error'
        });
        return;
      }

      // 验证订单数据
      if (!this.orderData || !this.orderData.goodsList || this.orderData.goodsList.length === 0) {
        uni.showToast({
          title: '订单数据无效',
          icon: 'error'
        });
        return;
      }

      // 验证商品数据
      var _iterator = _createForOfIteratorHelper(this.orderData.goodsList),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var goods = _step.value;
          if (!goods.skuId || !goods.goodsNum || goods.goodsNum <= 0) {
            uni.showToast({
              title: '商品数据无效',
              icon: 'error'
            });
            return;
          }
        }

        // 验证总价
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (parseFloat(this.totalPrice) <= 0) {
        uni.showToast({
          title: '订单金额无效',
          icon: 'error'
        });
        return;
      }

      // 验证地址ID
      if (!this.selectedAddress.id) {
        uni.showToast({
          title: '收货地址无效',
          icon: 'error'
        });
        return;
      }

      // 验证支付方式
      if (!this.selectedPayment || !this.selectedPayment.name) {
        uni.showToast({
          title: '请选择支付方式',
          icon: 'error'
        });
        return;
      }
      uni.showLoading({
        title: '正在提交订单...'
      });

      // 创建订单
      this.createOrder();
    },
    // 创建订单
    createOrder: function createOrder() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var orderData, res, errorMessage;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                // 构建订单数据
                orderData = {
                  goodsList: _this4.orderData.goodsList,
                  deliveryType: '1',
                  // 1.快递 2.自提
                  memberAddressId: _this4.selectedAddress.id,
                  // 收货地址ID
                  isCart: false,
                  // 不是购物车下单
                  flowPrice: parseFloat(_this4.totalPrice),
                  // 订单总计金额
                  orderType: _this4.orderData.orderType || 1,
                  // 1.普通订单
                  memberRemark: '',
                  // 买家备注
                  memberCouponId: _this4.selectedCoupons.length > 0 ? _this4.selectedCoupons[0].id : null,
                  // 优惠券ID
                  promotionId: _this4.orderData.promotionId || null // 促销活动ID
                }; // 调用创建订单接口
                _context2.next = 4;
                return (0, _orders.fetchOrderCreate)(orderData);
              case 4:
                res = _context2.sent;
                console.log('createOrder - API response:', res);
                console.log('createOrder - res.data:', res.data);
                if (!(res.code === 200)) {
                  _context2.next = 15;
                  break;
                }
                uni.hideLoading();
                // 创建订单成功，开始支付
                // 确保orderId存在
                if (res.data) {
                  _context2.next = 12;
                  break;
                }
                uni.showToast({
                  title: '订单创建成功但订单ID为空',
                  icon: 'error'
                });
                return _context2.abrupt("return");
              case 12:
                _this4.processPayment(res.data);
                _context2.next = 20;
                break;
              case 15:
                uni.hideLoading();
                uni.showToast({
                  title: res.msg || '订单创建失败',
                  icon: 'error'
                });
                // 订单创建失败，返回详情页
                setTimeout(function () {
                  uni.navigateBack();
                }, 2000);

                // 清除全局数据
                _globalData.default.orderData = null;
                _globalData.default.selectedAddress = null;
              case 20:
                _context2.next = 32;
                break;
              case 22:
                _context2.prev = 22;
                _context2.t0 = _context2["catch"](0);
                console.error('创建订单失败:', _context2.t0);
                uni.hideLoading();

                // 根据错误类型显示不同的提示
                errorMessage = '网络错误，请重试';
                if (_context2.t0.message) {
                  errorMessage = _context2.t0.message;
                } else if (_context2.t0.errMsg) {
                  errorMessage = _context2.t0.errMsg;
                }
                uni.showToast({
                  title: errorMessage,
                  icon: 'error'
                });

                // 网络错误，返回详情页
                setTimeout(function () {
                  uni.navigateBack();
                }, 2000);

                // 清除全局数据
                _globalData.default.orderData = null;
                _globalData.default.selectedAddress = null;
              case 32:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 22]]);
      }))();
    },
    // 处理支付
    processPayment: function processPayment(orderInfo) {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var errorMessage;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                if (orderInfo) {
                  _context3.next = 4;
                  break;
                }
                uni.showToast({
                  title: '订单信息无效',
                  icon: 'error'
                });
                return _context3.abrupt("return");
              case 4:
                console.log('processPayment - orderInfo:', orderInfo);

                // 根据支付方式处理
                _context3.t0 = _this5.selectedPayment.name;
                _context3.next = _context3.t0 === '微信支付' ? 8 : _context3.t0 === '对公转账' ? 11 : 14;
                break;
              case 8:
                _context3.next = 10;
                return _this5.handleWechatPay(orderInfo);
              case 10:
                return _context3.abrupt("break", 17);
              case 11:
                _context3.next = 13;
                return _this5.handleBankTransfer(orderInfo);
              case 13:
                return _context3.abrupt("break", 17);
              case 14:
                _context3.next = 16;
                return _this5.handleOtherPayment(orderInfo);
              case 16:
                return _context3.abrupt("break", 17);
              case 17:
                _context3.next = 28;
                break;
              case 19:
                _context3.prev = 19;
                _context3.t1 = _context3["catch"](0);
                console.error('支付处理失败:', _context3.t1);

                // 根据错误类型显示不同的提示
                errorMessage = '支付失败，请重试';
                if (_context3.t1.message) {
                  errorMessage = _context3.t1.message;
                } else if (_context3.t1.errMsg) {
                  errorMessage = _context3.t1.errMsg;
                }
                uni.showToast({
                  title: errorMessage,
                  icon: 'error'
                });

                // 支付失败，返回详情页
                setTimeout(function () {
                  uni.navigateBack();
                }, 2000);

                // 清除全局数据
                _globalData.default.orderData = null;
                _globalData.default.selectedAddress = null;
              case 28:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 19]]);
      }))();
    },
    // 微信支付
    handleWechatPay: function handleWechatPay(orderInfo) {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var res, errorMessage;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                console.log('handleWechatPay - orderInfo:', orderInfo);
                console.log('handleWechatPay - orderId:', orderInfo.orderId);

                // 调用支付接口
                _context4.next = 5;
                return (0, _orders.fetchOrderPay)({
                  paymentMethod: '1',
                  // 1.微信支付
                  orderId: orderInfo
                });
              case 5:
                res = _context4.sent;
                if (res.code === 200) {
                  // 调用微信支付
                  uni.requestPayment({
                    provider: "wxpay",
                    appId: res.data.payPackage.appId,
                    timeStamp: res.data.payPackage.timeStamp,
                    nonceStr: res.data.payPackage.nonceStr,
                    package: res.data.payPackage.package,
                    signType: res.data.payPackage.signType,
                    paySign: res.data.payPackage.paySign,
                    success: function success(res) {
                      console.log('微信支付成功:', res);
                      _this6.paymentSuccess(orderInfo);
                    },
                    fail: function fail(err) {
                      console.error('微信支付失败:', err);
                      uni.showToast({
                        title: '支付失败',
                        icon: 'error'
                      });
                      // 微信支付失败，返回详情页
                      setTimeout(function () {
                        uni.navigateBack();
                      }, 2000);

                      // 清除全局数据
                      _globalData.default.orderData = null;
                      _globalData.default.selectedAddress = null;
                    }
                  });
                } else {
                  uni.showToast({
                    title: res.msg || '支付失败',
                    icon: 'error'
                  });
                  // 微信支付失败，返回详情页
                  setTimeout(function () {
                    uni.navigateBack();
                  }, 2000);

                  // 清除全局数据
                  _globalData.default.orderData = null;
                  _globalData.default.selectedAddress = null;
                }
                _context4.next = 18;
                break;
              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](0);
                console.error('微信支付失败:', _context4.t0);

                // 根据错误类型显示不同的提示
                errorMessage = '支付失败，请重试';
                if (_context4.t0.message) {
                  errorMessage = _context4.t0.message;
                } else if (_context4.t0.errMsg) {
                  errorMessage = _context4.t0.errMsg;
                }
                uni.showToast({
                  title: errorMessage,
                  icon: 'error'
                });

                // 微信支付异常，返回详情页
                setTimeout(function () {
                  uni.navigateBack();
                }, 2000);

                // 清除全局数据
                _globalData.default.orderData = null;
                _globalData.default.selectedAddress = null;
              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 9]]);
      }))();
    },
    // 对公转账
    handleBankTransfer: function handleBankTransfer(orderInfo) {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var res, errorMessage;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                console.log('handleBankTransfer - orderInfo:', orderInfo);
                console.log('handleBankTransfer - orderId:', orderInfo.orderId);

                // 调用支付接口 - 使用余额支付
                _context5.next = 5;
                return (0, _orders.fetchOrderPay)({
                  paymentMethod: '2',
                  // 2.余额支付
                  orderId: orderInfo.orderId
                });
              case 5:
                res = _context5.sent;
                if (res.code === 200) {
                  uni.showToast({
                    title: '支付成功',
                    icon: 'success'
                  });

                  // 支付成功处理
                  _this7.paymentSuccess(orderInfo);
                } else {
                  uni.showToast({
                    title: res.msg || '支付失败',
                    icon: 'error'
                  });
                  // 余额支付失败，返回详情页
                  setTimeout(function () {
                    uni.navigateBack();
                  }, 2000);

                  // 清除全局数据
                  _globalData.default.orderData = null;
                  _globalData.default.selectedAddress = null;
                }
                _context5.next = 18;
                break;
              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5["catch"](0);
                console.error('余额支付失败:', _context5.t0);

                // 根据错误类型显示不同的提示
                errorMessage = '支付失败，请重试';
                if (_context5.t0.message) {
                  errorMessage = _context5.t0.message;
                } else if (_context5.t0.errMsg) {
                  errorMessage = _context5.t0.errMsg;
                }
                uni.showToast({
                  title: errorMessage,
                  icon: 'error'
                });

                // 余额支付异常，返回详情页
                setTimeout(function () {
                  uni.navigateBack();
                }, 2000);

                // 清除全局数据
                _globalData.default.orderData = null;
                _globalData.default.selectedAddress = null;
              case 18:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 9]]);
      }))();
    },
    // 其他支付方式（园区卡支付等）
    handleOtherPayment: function handleOtherPayment(orderInfo) {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var res, errorMessage;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                console.log('handleOtherPayment - orderInfo:', orderInfo);
                console.log('handleOtherPayment - orderId:', orderInfo);

                // 调用支付接口 - 使用园区卡支付
                _context6.next = 5;
                return (0, _orders.fetchOrderPay)({
                  paymentMethod: '3',
                  // 3.园区卡支付
                  orderId: orderInfo
                });
              case 5:
                res = _context6.sent;
                if (res.code === 200) {
                  uni.showToast({
                    title: '支付成功',
                    icon: 'success'
                  });

                  // 支付成功处理
                  _this8.paymentSuccess(orderInfo);
                } else {
                  uni.showToast({
                    title: res.msg || '支付失败',
                    icon: 'error'
                  });
                  // 园区卡支付失败，返回详情页
                  setTimeout(function () {
                    uni.navigateBack();
                  }, 2000);

                  // 清除全局数据
                  _globalData.default.orderData = null;
                  _globalData.default.selectedAddress = null;
                }
                _context6.next = 18;
                break;
              case 9:
                _context6.prev = 9;
                _context6.t0 = _context6["catch"](0);
                console.error('园区卡支付失败:', _context6.t0);

                // 根据错误类型显示不同的提示
                errorMessage = '支付失败，请重试';
                if (_context6.t0.message) {
                  errorMessage = _context6.t0.message;
                } else if (_context6.t0.errMsg) {
                  errorMessage = _context6.t0.errMsg;
                }
                uni.showToast({
                  title: errorMessage,
                  icon: 'error'
                });

                // 园区卡支付异常，返回详情页
                setTimeout(function () {
                  uni.navigateBack();
                }, 2000);

                // 清除全局数据
                _globalData.default.orderData = null;
                _globalData.default.selectedAddress = null;
              case 18:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 9]]);
      }))();
    },
    // 支付成功处理
    paymentSuccess: function paymentSuccess(orderInfo) {
      console.log('orderInfo', orderInfo);
      // 设置支付金额并显示支付成功弹窗
      this.paymentAmount = orderInfo.totalAmount || this.totalPrice;
      this.showPaymentSuccess = true;
    },
    // 处理遮罩点击
    handleOverlayClick: function handleOverlayClick() {
      // 支付成功弹窗不允许点击遮罩关闭，用户必须选择一个选项
    },
    // 处理支付成功弹窗关闭（继续购物）
    handlePaymentSuccessClose: function handlePaymentSuccessClose() {
      this.showPaymentSuccess = false;
      // 清除全局数据
      _globalData.default.orderData = null;
      _globalData.default.selectedAddress = null;
      // 返回首页
      uni.reLaunch({
        url: '/pages/index/index'
      });
    },
    // 处理支付成功弹窗确认（查看订单）
    handlePaymentSuccessConfirm: function handlePaymentSuccessConfirm() {
      this.showPaymentSuccess = false;
      // 清除全局数据
      _globalData.default.orderData = null;
      _globalData.default.selectedAddress = null;
      // 跳转到订单列表页面
      uni.redirectTo({
        url: '/subpackages/order/list/list'
      });
    },
    // 获取选中的SKU ID（从全局数据中获取）
    getSelectedSkuId: function getSelectedSkuId() {
      if (this.orderData && this.orderData.goodsList && this.orderData.goodsList.length > 0) {
        return this.orderData.goodsList[0].skuId;
      }
      // 如果没有数据，返回默认值
      return 1;
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 276:
/*!*********************************************************************************************************************************************************!*\
  !*** F:/UniApp/products/shopping-projects/shopping_25_07/subpackages/order/detail/detail.vue?vue&type=style&index=0&id=08f7b1ce&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_08f7b1ce_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=style&index=0&id=08f7b1ce&lang=scss&scoped=true& */ 277);
/* harmony import */ var _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_08f7b1ce_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_08f7b1ce_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_08f7b1ce_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HbuilderDevTool_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_08f7b1ce_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HbuilderDevTool_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_08f7b1ce_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 277:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/UniApp/products/shopping-projects/shopping_25_07/subpackages/order/detail/detail.vue?vue&type=style&index=0&id=08f7b1ce&lang=scss&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[270,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subpackages/order/detail/detail.js.map