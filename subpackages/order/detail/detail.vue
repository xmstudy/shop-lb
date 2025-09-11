<template>
	<view>
		<view class="order-detail-container" :class="{ 'popup-open': showCoupon || showPayment }">
			<!-- Loading Skeleton -->
			<view v-if="loading" class="skeleton-container">
				<!-- Address Skeleton -->
				<view class="skeleton-address">
					<view class="skeleton-address-content">
						<view class="skeleton-address-info">
							<view class="skeleton-address-user">
								<view class="skeleton-name"></view>
								<view class="skeleton-phone"></view>
							</view>
							<view class="skeleton-address-detail"></view>
						</view>
						<view class="skeleton-arrow"></view>
					</view>
				</view>

				<!-- Product Skeleton -->
				<view class="skeleton-product">
					<view class="skeleton-product-card" v-for="i in 2" :key="i">
						<view class="skeleton-product-img"></view>
						<view class="skeleton-product-info">
							<view class="skeleton-product-name"></view>
							<view class="skeleton-product-desc"></view>
							<view class="skeleton-product-bottom">
								<view class="skeleton-product-price"></view>
								<view class="skeleton-product-quantity"></view>
							</view>
						</view>
					</view>
				</view>

				<!-- Price Skeleton -->
				<view class="skeleton-price">
					<view class="skeleton-price-item" v-for="i in 4" :key="i">
						<view class="skeleton-price-label"></view>
						<view class="skeleton-price-value"></view>
					</view>
				</view>

				<!-- Payment Skeleton -->
				<view class="skeleton-payment">
					<view class="skeleton-payment-title"></view>
					<view class="skeleton-payment-method">
						<view class="skeleton-payment-icon"></view>
						<view class="skeleton-payment-name"></view>
						<view class="skeleton-payment-arrow"></view>
					</view>
				</view>
			</view>

			<!-- Content -->
			<view v-else>
				<!-- Address Section -->
				<view class="address-section" @click="selectAddress" v-if="selectedAddress">
					<view class="address-content">
						<view class="address-info">
							<view class="address-user">
								<text class="user-name">{{ selectedAddress.name }}</text>
								<text class="user-phone">{{ selectedAddress.phone }}</text>
							</view>
							<view class="address-detail">
								{{ selectedAddress.province }}{{ selectedAddress.city }}{{ selectedAddress.district }}{{ selectedAddress.detail }}
							</view>
						</view>
						<view class="address-arrow">
							<u-icon name="arrow-right" color="#999" size="24"></u-icon>
						</view>
					</view>
				</view>

				<!-- No Address Section -->
				<view class="no-address-section" @click="addAddress" v-else>
					<view class="no-address-content">
						<view class="no-address-icon">
							<u-icon name="map" color="#999" size="40"></u-icon>
						</view>
						<view class="no-address-info">
							<view class="no-address-title">请添加收货地址</view>
							<view class="no-address-desc">选择您的收货地址以便配送</view>
						</view>
						<view class="no-address-arrow">
							<u-icon name="plus" color="#89D600" size="24"></u-icon>
						</view>
					</view>
				</view>

				<!-- Product Info Section -->
				<view class="product-section" v-if="productList && productList.length > 0">
					<view class="product-card" v-for="(product, index) in productList" :key="index">
						<image class="product-img" :src="product.image" mode="aspectFill"></image>
						<view class="product-info">
							<view class="product-name">{{ product.name }}</view>
							<view class="product-desc">{{ product.description }}</view>
							<view class="product-bottom">
								<view class="product-price">¥{{ product.price }}</view>
								<view class="product-quantity">×{{ product.quantity }}</view>
							</view>
						</view>
					</view>
				</view>

				<!-- Price Breakdown -->
				<view class="price-section">
					<view class="price-item">
						<text class="price-label">运费</text>
						<text class="price-value">¥{{ shippingFee }}</text>
					</view>
					<view class="price-item">
						<text class="price-label">商品小计</text>
						<text class="price-value">¥{{ goodsTotalPrice.toFixed(2) }}</text>
					</view>
					<view class="price-item coupon-item" @click="showCouponModal">
						<text class="price-label">优惠券</text>
						<view class="coupon-info">
							<text class="coupon-text" :class="couponTextClass">{{ couponText }}</text>
							<u-icon name="arrow-right" color="#999" size="20"></u-icon>
						</view>
					</view>
					<view class="price-item total-item">
						<text class="price-label">合计</text>
						<text class="price-value total-price">¥{{ totalPrice }}</text>
					</view>
				</view>

				<!-- Payment Method -->
				<view class="payment-section" @click="showPaymentModal">
					<view class="section-title">支付方式</view>
					<view class="payment-method">
						<view class="payment-info">
							<u-icon class="payment-icon" :name="selectedPayment.icon" color="#07C160"
								size="24"></u-icon>
							<text class="payment-name">{{ selectedPayment.name }}</text>
						</view>
						<view class="payment-arrow">
							<u-icon name="arrow-right" color="#999" size="20"></u-icon>
						</view>
					</view>
				</view>

				<!-- Bottom Bar -->
				<view class="bottom-bar">
					<view class="total-info">
						<text class="total-label">合计：</text>
						<text class="total-amount">¥{{ totalPrice }}</text>
					</view>
					<view class="buy-button" @click="confirmOrder">
						立即购买
					</view>
				</view>
			</view>

			<!-- Coupon Selection Modal -->

			<u-popup :show="showCoupon" mode="bottom" :round="20" height="70%" @close="closeCouponModal"
				:mask-close-able="true" :safe-area-inset-bottom="true">
				<view class="coupon-modal">
					<view class="modal-header">
						<view class="modal-title">优惠券</view>
						<view class="modal-subtitle">
							优惠券可叠加使用，一共{{ availableCoupons.length }}张优惠券，可抵扣<span
								class="discount-amount">¥{{ selectedDiscount }}</span></view>
						<view class="modal-close" @click="closeCouponModal">
							<u-icon name="close" color="#999" size="32"></u-icon>
						</view>
					</view>

					<view class="coupon-list">
						<view class="coupon-item" v-for="(coupon, index) in availableCoupons" :key="index">
							<view class="coupon-content" @click="toggleCoupon(index)">
								<view class="coupon-left">
									<view class="coupon-amount">
										¥{{ coupon.originalData ? coupon.originalData.price : coupon.amount }}</view>
								</view>
								<view class="coupon-center">
									<view class="coupon-label">{{ coupon.label }}</view>
									<view class="coupon-date">{{ coupon.dateRange }}</view>
									<view class="coupon-note">{{ coupon.note }}</view>
								</view>
								<view class="coupon-right">
									<u-icon :name="coupon.selected ? 'checkmark-circle-fill' : 'checkmark-circle'"
										:color="coupon.selected ? '#89D600' : '#ddd'" size="32"></u-icon>
								</view>
							</view>
						</view>
					</view>

					<view class="modal-footer">
						<view class="confirm-button" @click="confirmCouponSelection">
							确定
						</view>
					</view>
				</view>
			</u-popup>
		</view>

		<!-- Payment Method Modal -->
		<u-popup :show="showPayment" mode="bottom" :round="20" height="50%" @close="closePaymentModal"
			:mask-close-able="true" :safe-area-inset-bottom="true">
			<view class="payment-modal">
				<view class="modal-header">
					<view class="modal-title">支付方式</view>
					<view class="modal-close" @click="closePaymentModal">
						<u-icon name="close" color="#999" size="32"></u-icon>
					</view>
				</view>

				<view class="payment-list">
					<view class="payment-item" v-for="(payment, index) in paymentMethods" :key="index"
						@click="selectPayment(index)">
						<view class="payment-content">
							<view class="payment-left">
								<u-icon class="payment-icon" :name="payment.icon"
									:color="payment.name === '微信支付' ? '#07C160' : '#1E88E5'" size="24"></u-icon>
								<view class="payment-info">
									<view class="payment-name">{{ payment.name }}</view>
									<view class="payment-desc">{{ payment.desc }}</view>
								</view>
							</view>
							<view class="payment-right">
								<u-icon :name="payment.selected ? 'checkmark' : 'checkmark'"
									:color="payment.selected ? '#89D600' : '#ddd'" size="32"></u-icon>
							</view>
						</view>
					</view>
				</view>

				<view class="modal-footer">
					<view class="confirm-button" @click="confirmPaymentSelection">
						确定
					</view>
				</view>
			</view>
		</u-popup>
		
		<!-- 支付成功弹窗 -->
		<view class="payment-success-modal-overlay" :class="{ 'show': showPaymentSuccess }" @click="handleOverlayClick" v-if="showPaymentSuccess">
			<view class="payment-success-modal" @click.stop>
				<!-- 成功图标 -->
				<view class="success-icon">
					<view class="success-circle">
						<view class="success-check">
							<view class="check-line check-line1"></view>
							<view class="check-line check-line2"></view>
						</view>
					</view>
				</view>
				
				<!-- 标题 -->
				<view class="modal-title">支付成功</view>
				
				<!-- 金额信息 -->
				<view class="amount-info">
					<text class="amount-label">支付金额</text>
					<text class="amount-value">¥{{ paymentAmount }}</text>
				</view>
				
				<!-- 感谢信息 -->
				<view class="thank-message">
					<text class="thank-text">感谢您的购买！</text>
					<text class="delivery-text">我们将尽快为您发货</text>
				</view>
				
				<!-- 按钮组 -->
				<view class="button-group">
					<view class="button secondary-button" @click="handlePaymentSuccessClose">
						继续购物
					</view>
					<view class="button primary-button" @click="handlePaymentSuccessConfirm">
						查看订单
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import BaseContainer from '@/components/BaseWrapper.vue'
	import globalData from '@/utils/globalData.js'
	import {
		fetchOrderCreate,
		fetchOrderPay,
		fetchOrderPreview
	} from '@/api/orders'

	export default {
		name: 'OrderDetail',
		components: {
			BaseContainer
		},
		data() {
			return {
				showCoupon: false,
				showPayment: false,
				showPaymentSuccess: false, // 支付成功弹窗显示状态
				paymentAmount: '0.00', // 支付金额
				orderData: null, // 存储订单数据
				loading: true, // 加载状态
				selectedAddress: null, // 选中的地址
				shippingFee: 0, // 运费
				discountAmount: 0, // 折扣金额
				totalAmount: 0, // 总金额
				productInfo: null, // 单个商品信息（兼容旧版本）
				productList: [], // 多商品列表
				availableCoupons: [], // 可用优惠券
				selectedCoupons: [],
				paymentMethods: [{
						name: '微信支付',
						desc: '推荐使用微信支付',
						icon: 'weixin-fill',
						selected: true
					},
					{
						name: '对公转账',
						desc: '企业用户推荐',
						icon: 'plus-people-fill',
						selected: false
					}
				],
				selectedPayment: {
					name: '微信支付',
					desc: '推荐使用微信支付',
					icon: 'weixin-fill'
				}
			}
		},
		computed: {
			// 计算商品价格合计
			goodsTotalPrice() {
				if (this.orderData && this.orderData.goodsList && this.orderData.goodsList.length > 0) {
					return this.orderData.goodsList.reduce((sum, goods) => {
						const price = parseFloat(goods.goodsPrice || 0)
						const quantity = parseInt(goods.goodsNum || 1)
						return sum + (price * quantity)
					}, 0)
				}
				// 如果没有订单数据，使用产品列表计算
				if (this.productList && this.productList.length > 0) {
					return this.productList.reduce((sum, product) => {
						const unitPrice = parseFloat(product.unitPrice || 0)
						const quantity = parseInt(product.quantity || 1)
						return sum + (unitPrice * quantity)
					}, 0)
				}
				// 兼容旧版本 - 使用单个商品信息
				if (this.productInfo) {
					return parseFloat(this.productInfo.price || 0)
				}
				return 0
			},
			// 计算优惠券折扣总额
			couponDiscount() {
				return this.selectedCoupons.reduce((sum, coupon) => {
					// 兼容新旧数据格式
					const amount = coupon.originalData ? coupon.originalData.price : parseFloat(coupon.amount)
					return sum + amount
				}, 0)
			},
			totalPrice() {
				// 商品价格合计 + 运费 - 优惠券折扣
				const goodsTotal = this.goodsTotalPrice
				const shippingFee = parseFloat(this.shippingFee || 0)
				const couponDiscount = this.couponDiscount

				return (goodsTotal + shippingFee - couponDiscount).toFixed(2)
			},
			couponText() {
				if (this.selectedCoupons.length === 0) {
					return `${this.availableCoupons.length}张可用`
				} else {
					return `- ¥${this.couponDiscount.toFixed(1)}`
				}
			},
			couponTextClass() {
				return this.selectedCoupons.length > 0 ? 'discount-highlight' : ''
			},
			totalDiscount() {
				return this.availableCoupons.reduce((sum, coupon) => {
					// 兼容新旧数据格式
					const amount = coupon.originalData ? coupon.originalData.price : parseFloat(coupon.amount)
					return sum + amount
				}, 0).toFixed(1)
			},
			selectedDiscount() {
				return this.couponDiscount.toFixed(1)
			}
		},
		onLoad(options) {
			// 处理从外部传递过来的订单数据
			if (options.orderData) {
				try {
					const orderData = JSON.parse(decodeURIComponent(options.orderData))
					this.orderData = orderData // 存储订单数据
				} catch (error) {
					console.error('解析订单数据失败:', error)
				}
			}
		},
		onShow() {
			console.log('onShow - globalData:', globalData);
			console.log('onShow - this.orderData:', this.orderData);

			// 检查是否有全局地址数据
			if (globalData.selectedAddress) {
				this.selectedAddress = globalData.selectedAddress
				globalData.selectedAddress = null // 用完即清空
			}

			// 检查是否有全局订单数据需要处理
			if (globalData.orderData && (!this.orderData || !this.orderData.goodsList)) {
				this.orderData = globalData.orderData
				globalData.orderData = null // 用完即清空

				// 有全局订单数据时，需要获取订单预览来补充完整信息
				setTimeout(() => {
					this.getOrderPreview()
				}, 100)
			} else if (!this.orderData || !this.orderData.goodsList) {
				// 没有任何订单数据时，获取订单预览
				setTimeout(() => {
					this.getOrderPreview()
				}, 100)
			} else {
				// 如果已经有完整的订单数据，直接结束loading状态
				console.log('已有完整订单数据，直接结束loading')
				this.loading = false
			}
		},
		onUnload() {
			// 页面卸载时清理全局数据
			globalData.selectedAddress = null
		},
		methods: {
			// 获取订单预览数据
			async getOrderPreview() {
				try {
					// 构建请求参数
					let requestData = {
						goodsList: [],
						orderType: 1, // 默认普通订单
						promotionId: null // 默认无促销活动
					}

					// 如果有全局订单数据，使用它
					console.log('getOrderPreview - globalData.orderData:', globalData.orderData);
					console.log('getOrderPreview - this.orderData:', this.orderData);
					if (globalData.orderData) {
						requestData = {
							goodsList: globalData.orderData.goodsList || [],
							orderType: globalData.orderData.orderType || 1,
							promotionId: globalData.orderData.promotionId || null
						}
						globalData.orderData = null // 用完即清空
					} else if (this.orderData && this.orderData.goodsList) {
						// 如果有本地订单数据，使用它
						requestData = {
							goodsList: this.orderData.goodsList || [],
							orderType: this.orderData.orderType || 1,
							promotionId: this.orderData.promotionId || null
						}
					} else {
						// 没有订单数据，结束loading并提示跳转
						this.loading = false
						uni.showToast({
							title: '订单数据已失效',
							icon: 'none'
						})
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/index/index'
							})
						}, 1000)
						return
					}

					// TODO fetchOrderPreview 会在这里使用
					const res = await fetchOrderPreview(requestData)

					if (res.code === 200) {
						// 更新页面数据
						this.updateOrderPreview(res.data)
					} else {
						// 接口失败时也要结束loading
						this.loading = false
						uni.showToast({
							title: res.msg || '获取订单预览失败',
							icon: 'error'
						})
					}
				} catch (error) {
					console.error('获取订单预览失败:', error)
					// 网络错误时也要结束loading
					this.loading = false
					uni.showToast({
						title: '网络错误，请重试',
						icon: 'error'
					})
				}
			},

			// 更新订单预览信息
			updateOrderPreview(data) {
				// 更新商品信息 - 处理多个商品
				if (data.goodsList && data.goodsList.length > 0) {
					// 构建商品列表
					this.productList = data.goodsList.map(goods => ({
						image: goods.goodsImage || '/static/images/home.png',
						name: goods.goodsName || '商品名称',
						description: `${this.formatSpecs(goods.specs) || '默认规格'} | 单价 ¥${goods.goodsPrice || '0'}`,
						price: (goods.goodsPrice * goods.goodsNum).toFixed(2),
						quantity: goods.goodsNum || 1,
						unitPrice: goods.goodsPrice || 0
					}))

					// 兼容旧版本 - 保留第一个商品的信息
					const firstGoods = data.goodsList[0]
					this.productInfo = {
						image: firstGoods.goodsImage || '/static/images/home.png',
						name: firstGoods.goodsName || '雷波青茶',
						description: `${this.formatSpecs(firstGoods.specs) || '10斤装'} | ${firstGoods.goodsPrice || '199.9'}元`,
						price: (firstGoods.goodsPrice * firstGoods.goodsNum).toString(),
						quantity: firstGoods.goodsNum || 1
					}
				}

				// 存储完整的商品列表（用于后续创建订单）
				this.orderData = {
					goodsList: data.goodsList,
					totalPrice: data.totalAmount,
					orderType: data.orderType || 1,
					promotionId: data.promotionId || null
				}

				// 只有在没有地址数据时才更新地址，避免覆盖用户已选择的地址
				if (data.memberAddress && (!this.selectedAddress || !this.selectedAddress.id)) {

					this.selectedAddress = {
						id: data.memberAddress.id,
						name: data.memberAddress.name || data.memberAddress.consigneeName,
						phone: data.memberAddress.mobile || data.memberAddress.phone || data.memberAddress
							.consigneePhone,
						province: data.memberAddress.province || '',
						city: data.memberAddress.city || '',
						district: data.memberAddress.district || '',
						detail: data.memberAddress.detail || data.memberAddress.consigneeAddress || '',
						isDefault: data.memberAddress.isDefault || false
					}

					// 如果有地址路径，解析省市区
					if (data.memberAddress.consigneeAddressPath) {
						const addressParts = data.memberAddress.consigneeAddressPath.split(',')
						if (addressParts.length >= 3) {
							this.selectedAddress.province = addressParts[0]
							this.selectedAddress.city = addressParts[1]
							this.selectedAddress.district = addressParts[2]
						}
					}
				}

				// 更新优惠券列表 - 处理真实的优惠券数据格式
				if (data.coupons && Array.isArray(data.coupons)) {
					this.availableCoupons = data.coupons.map(coupon => ({
						id: coupon.id,
						amount: coupon.price.toString(), // 面额
						label: coupon.couponName, // 优惠券名称
						dateRange: this.formatCouponDateRange(coupon.endTime), // 过期时间
						note: `满${coupon.useAmount}可用`, // 使用条件
						selected: false,
						// 保存原始数据用于后续处理
						originalData: coupon
					}))
				} else if (data.availableCoupons) {
					// 兼容旧格式
					this.availableCoupons = data.availableCoupons
				}

				// 更新运费
				this.shippingFee = data.shippingFee || 0

				// 更新折扣金额
				this.discountAmount = data.discountAmount || 0

				// 更新总金额
				this.totalAmount = data.totalAmount || 0

				// 更新已选优惠券
				if (data.selectedCoupons) {
					this.selectedCoupons = data.selectedCoupons
					this.updateSelectedCoupons()
				}

				// 数据加载完成，隐藏骨架屏
				this.loading = false
			},


			// 格式化规格显示
			formatSpecs(specs) {
				try {
					const specsArray = JSON.parse(specs)
					return specsArray.join(' / ')
				} catch (error) {
					return specs
				}
			},

			// 格式化优惠券日期范围
			formatCouponDateRange(endTime) {
				try {
					if (!endTime) return '有效期未知'

					const endDate = new Date(endTime)
					const now = new Date()

					// 格式化结束时间
					const endDateStr = endDate.toLocaleDateString('zh-CN', {
						year: 'numeric',
						month: '2-digit',
						day: '2-digit'
					}).replace(/\//g, '.')

					// 如果已过期，显示过期
					if (endDate < now) {
						return `已过期 (${endDateStr})`
					}

					// 计算剩余天数
					const diffTime = endDate - now
					const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

					if (diffDays <= 7) {
						return `即将过期 (${endDateStr})`
					} else {
						return `有效期至 ${endDateStr}`
					}
				} catch (error) {
					console.error('格式化优惠券日期失败:', error)
					return '有效期未知'
				}
			},

			selectAddress() {
				// 跳转到地址列表页面，标记为从订单页面进入
				uni.navigateTo({
					url: '/subpackages/address/list/list?from=order'
				})
			},

			addAddress() {
				// 跳转到地址列表页面，用于添加新地址
				uni.navigateTo({
					url: '/subpackages/address/list/list?from=order'
				})
			},

			// 更新地址信息
			updateAddress(address) {
				console.log('地址更新:', address);
				// 确保使用 mobile 字段作为电话
				const updatedAddress = {
					...address,
					phone: address.mobile || address.phone
				}
				this.selectedAddress = updatedAddress
				// 将地址数据存储到全局，确保页面切换时数据不丢失
				globalData.selectedAddress = updatedAddress
				// 地址更新后不自动调用预览接口，保持用户修改的地址
			},
			showCouponModal() {
				this.showCoupon = true
			},
			closeCouponModal() {
				this.showCoupon = false
			},
			toggleCoupon(index) {
				this.availableCoupons[index].selected = !this.availableCoupons[index].selected
				this.updateSelectedCoupons()
			},
			updateSelectedCoupons() {
				this.selectedCoupons = this.availableCoupons.filter(coupon => coupon.selected)
			},
			confirmCouponSelection() {
				this.updateSelectedCoupons()
				this.closeCouponModal()
				// 优惠券选择后不自动调用预览接口，保持用户选择
			},
			showPaymentModal() {
				this.showPayment = true
			},
			closePaymentModal() {
				this.showPayment = false
			},
			selectPayment(index) {
				// 重置所有支付方式的选择状态
				this.paymentMethods.forEach((payment, i) => {
					payment.selected = i === index
				})
			},
			confirmPaymentSelection() {
				// 更新选中的支付方式
				const selectedPayment = this.paymentMethods.find(payment => payment.selected)
				if (selectedPayment) {
					this.selectedPayment = selectedPayment
				}
				this.closePaymentModal()
			},
			confirmOrder() {
				// 验证地址
				if (!this.selectedAddress || !this.selectedAddress.name) {
					uni.showToast({
						title: '请选择收货地址',
						icon: 'error'
					})
					return
				}

				// 验证支付方式
				if (!this.selectedPayment) {
					uni.showToast({
						title: '请选择支付方式',
						icon: 'error'
					})
					return
				}

				// 验证订单数据
				if (!this.orderData || !this.orderData.goodsList || this.orderData.goodsList.length === 0) {
					uni.showToast({
						title: '订单数据无效',
						icon: 'error'
					})
					return
				}

				// 验证商品数据
				for (let goods of this.orderData.goodsList) {
					if (!goods.skuId || !goods.goodsNum || goods.goodsNum <= 0) {
						uni.showToast({
							title: '商品数据无效',
							icon: 'error'
						})
						return
					}
				}

				// 验证总价
				if (parseFloat(this.totalPrice) <= 0) {
					uni.showToast({
						title: '订单金额无效',
						icon: 'error'
					})
					return
				}

				// 验证地址ID
				if (!this.selectedAddress.id) {
					uni.showToast({
						title: '收货地址无效',
						icon: 'error'
					})
					return
				}

				// 验证支付方式
				if (!this.selectedPayment || !this.selectedPayment.name) {
					uni.showToast({
						title: '请选择支付方式',
						icon: 'error'
					})
					return
				}

				uni.showLoading({
					title: '正在提交订单...'
				})

				// 创建订单
				this.createOrder()
			},

			// 创建订单
			async createOrder() {
				try {
					// 构建订单数据
					const orderData = {
						goodsList: this.orderData.goodsList,
						deliveryType: '1', // 1.快递 2.自提
						memberAddressId: this.selectedAddress.id, // 收货地址ID
						isCart: false, // 不是购物车下单
						flowPrice: parseFloat(this.totalPrice), // 订单总计金额
						orderType: this.orderData.orderType || 1, // 1.普通订单
						memberRemark: '', // 买家备注
						memberCouponId: this.selectedCoupons.length > 0 ? this.selectedCoupons[0].id :
						null, // 优惠券ID
						promotionId: this.orderData.promotionId || null // 促销活动ID
					}

					// 调用创建订单接口
					const res = await fetchOrderCreate(orderData)

					console.log('createOrder - API response:', res);
					console.log('createOrder - res.data:', res.data);

					if (res.code === 200) {
						uni.hideLoading()
						// 创建订单成功，开始支付
						// 确保orderId存在
						if (!res.data) {
							uni.showToast({
								title: '订单创建成功但订单ID为空',
								icon: 'error'
							})
							return
						}

						this.processPayment(res.data)
					} else {
						uni.hideLoading()
						uni.showToast({
							title: res.msg || '订单创建失败',
							icon: 'error'
						})
						// 订单创建失败，返回详情页
						setTimeout(() => {
							uni.navigateBack()
						}, 2000)

						// 清除全局数据
						globalData.orderData = null
						globalData.selectedAddress = null
					}
				} catch (error) {
					console.error('创建订单失败:', error)
					uni.hideLoading()

					// 根据错误类型显示不同的提示
					let errorMessage = '网络错误，请重试'
					if (error.message) {
						errorMessage = error.message
					} else if (error.errMsg) {
						errorMessage = error.errMsg
					}

					uni.showToast({
						title: errorMessage,
						icon: 'error'
					})

					// 网络错误，返回详情页
					setTimeout(() => {
						uni.navigateBack()
					}, 2000)

					// 清除全局数据
					globalData.orderData = null
					globalData.selectedAddress = null
				}
			},

			// 处理支付
			async processPayment(orderInfo) {
				try {
					// 验证订单信息
					if (!orderInfo) {
						uni.showToast({
							title: '订单信息无效',
							icon: 'error'
						})
						return
					}

					console.log('processPayment - orderInfo:', orderInfo);

					// 根据支付方式处理
					switch (this.selectedPayment.name) {
						case '微信支付':
							await this.handleWechatPay(orderInfo)
							break
						case '对公转账':
							await this.handleBankTransfer(orderInfo)
							break
						default:
							// 其他支付方式
							await this.handleOtherPayment(orderInfo)
							break
					}
				} catch (error) {
					console.error('支付处理失败:', error)

					// 根据错误类型显示不同的提示
					let errorMessage = '支付失败，请重试'
					if (error.message) {
						errorMessage = error.message
					} else if (error.errMsg) {
						errorMessage = error.errMsg
					}

					uni.showToast({
						title: errorMessage,
						icon: 'error'
					})

					// 支付失败，返回详情页
					setTimeout(() => {
						uni.navigateBack()
					}, 2000)

					// 清除全局数据
					globalData.orderData = null
					globalData.selectedAddress = null
				}
			},

			// 微信支付
			async handleWechatPay(orderInfo) {
				try {
					console.log('handleWechatPay - orderInfo:', orderInfo);
					console.log('handleWechatPay - orderId:', orderInfo.orderId);

					// 调用支付接口
					const res = await fetchOrderPay({
						paymentMethod: '1', // 1.微信支付
						orderId: orderInfo
					})
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
							success: (res) => {
								console.log('微信支付成功:', res)
								this.paymentSuccess(orderInfo)
							},
							fail: (err) => {
								console.error('微信支付失败:', err)
								uni.showToast({
									title: '支付失败',
									icon: 'error'
								})
								// 微信支付失败，返回详情页
								setTimeout(() => {
									uni.navigateBack()
								}, 2000)

								// 清除全局数据
								globalData.orderData = null
								globalData.selectedAddress = null
							}
						})
					} else {
						uni.showToast({
							title: res.msg || '支付失败',
							icon: 'error'
						})
						// 微信支付失败，返回详情页
						setTimeout(() => {
							uni.navigateBack()
						}, 2000)

						// 清除全局数据
						globalData.orderData = null
						globalData.selectedAddress = null
					}
				} catch (error) {
					console.error('微信支付失败:', error)

					// 根据错误类型显示不同的提示
					let errorMessage = '支付失败，请重试'
					if (error.message) {
						errorMessage = error.message
					} else if (error.errMsg) {
						errorMessage = error.errMsg
					}

					uni.showToast({
						title: errorMessage,
						icon: 'error'
					})

					// 微信支付异常，返回详情页
					setTimeout(() => {
						uni.navigateBack()
					}, 2000)

					// 清除全局数据
					globalData.orderData = null
					globalData.selectedAddress = null
				}
			},

			// 对公转账
			async handleBankTransfer(orderInfo) {
				try {
					console.log('handleBankTransfer - orderInfo:', orderInfo);
					console.log('handleBankTransfer - orderId:', orderInfo.orderId);

					// 调用支付接口 - 使用余额支付
					const res = await fetchOrderPay({
						paymentMethod: '2', // 2.余额支付
						orderId: orderInfo.orderId
					})

					if (res.code === 200) {
						uni.showToast({
							title: '支付成功',
							icon: 'success'
						})

						// 支付成功处理
						this.paymentSuccess(orderInfo)
					} else {
						uni.showToast({
							title: res.msg || '支付失败',
							icon: 'error'
						})
						// 余额支付失败，返回详情页
						setTimeout(() => {
							uni.navigateBack()
						}, 2000)

						// 清除全局数据
						globalData.orderData = null
						globalData.selectedAddress = null
					}
				} catch (error) {
					console.error('余额支付失败:', error)

					// 根据错误类型显示不同的提示
					let errorMessage = '支付失败，请重试'
					if (error.message) {
						errorMessage = error.message
					} else if (error.errMsg) {
						errorMessage = error.errMsg
					}

					uni.showToast({
						title: errorMessage,
						icon: 'error'
					})

					// 余额支付异常，返回详情页
					setTimeout(() => {
						uni.navigateBack()
					}, 2000)

					// 清除全局数据
					globalData.orderData = null
					globalData.selectedAddress = null
				}
			},

			// 其他支付方式（园区卡支付等）
			async handleOtherPayment(orderInfo) {
				try {
					console.log('handleOtherPayment - orderInfo:', orderInfo);
					console.log('handleOtherPayment - orderId:', orderInfo);

					// 调用支付接口 - 使用园区卡支付
					const res = await fetchOrderPay({
						paymentMethod: '3', // 3.园区卡支付
						orderId: orderInfo
					})

					if (res.code === 200) {
						uni.showToast({
							title: '支付成功',
							icon: 'success'
						})

						// 支付成功处理
						this.paymentSuccess(orderInfo)
					} else {
						uni.showToast({
							title: res.msg || '支付失败',
							icon: 'error'
						})
						// 园区卡支付失败，返回详情页
						setTimeout(() => {
							uni.navigateBack()
						}, 2000)

						// 清除全局数据
						globalData.orderData = null
						globalData.selectedAddress = null
					}
				} catch (error) {
					console.error('园区卡支付失败:', error)

					// 根据错误类型显示不同的提示
					let errorMessage = '支付失败，请重试'
					if (error.message) {
						errorMessage = error.message
					} else if (error.errMsg) {
						errorMessage = error.errMsg
					}

					uni.showToast({
						title: errorMessage,
						icon: 'error'
					})

					// 园区卡支付异常，返回详情页
					setTimeout(() => {
						uni.navigateBack()
					}, 2000)

					// 清除全局数据
					globalData.orderData = null
					globalData.selectedAddress = null
				}
			},

			// 支付成功处理
			paymentSuccess(orderInfo) {
				console.log('orderInfo', orderInfo);
				// 设置支付金额并显示支付成功弹窗
				this.paymentAmount = orderInfo.totalAmount || this.totalPrice
				this.showPaymentSuccess = true
			},
			
			// 处理遮罩点击
			handleOverlayClick() {
				// 支付成功弹窗不允许点击遮罩关闭，用户必须选择一个选项
			},
			
			// 处理支付成功弹窗关闭（继续购物）
			handlePaymentSuccessClose() {
				this.showPaymentSuccess = false
				// 清除全局数据
				globalData.orderData = null
				globalData.selectedAddress = null
				// 返回首页
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},
			
			// 处理支付成功弹窗确认（查看订单）
			handlePaymentSuccessConfirm() {
				this.showPaymentSuccess = false
				// 清除全局数据
				globalData.orderData = null
				globalData.selectedAddress = null
				// 跳转到订单列表页面
				uni.redirectTo({
					url: '/subpackages/order/list/list'
				})
			},

			// 获取选中的SKU ID（从全局数据中获取）
			getSelectedSkuId() {
				if (this.orderData && this.orderData.goodsList && this.orderData.goodsList.length > 0) {
					return this.orderData.goodsList[0].skuId
				}
				// 如果没有数据，返回默认值
				return 1
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-detail-container {
		background: #f5f5f5;
		min-height: 100vh;
		padding-bottom: 120rpx;
		position: relative;
	}

	/* Skeleton Styles */
	.skeleton-container {
		padding: 20rpx;
	}

	.skeleton-address {
		background: #fff;
		margin: 20rpx 24rpx;
		border-radius: 16rpx;
		padding: 24rpx;

		.skeleton-address-content {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.skeleton-address-info {
				flex: 1;

				.skeleton-address-user {
					margin-bottom: 8rpx;
					display: flex;
					gap: 16rpx;

					.skeleton-name {
						width: 120rpx;
						height: 32rpx;
						background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
						background-size: 200% 100%;
						animation: skeleton-loading 1.5s infinite;
						border-radius: 4rpx;
					}

					.skeleton-phone {
						width: 160rpx;
						height: 28rpx;
						background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
						background-size: 200% 100%;
						animation: skeleton-loading 1.5s infinite;
						border-radius: 4rpx;
					}
				}

				.skeleton-address-detail {
					width: 100%;
					height: 28rpx;
					background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
					background-size: 200% 100%;
					animation: skeleton-loading 1.5s infinite;
					border-radius: 4rpx;
				}
			}

			.skeleton-arrow {
				width: 24rpx;
				height: 24rpx;
				background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
				background-size: 200% 100%;
				animation: skeleton-loading 1.5s infinite;
				border-radius: 4rpx;
			}
		}
	}

	.skeleton-product {
		background: #fff;
		margin: 20rpx 24rpx;
		border-radius: 16rpx;
		padding: 24rpx;

		.skeleton-product-card {
			display: flex;
			gap: 20rpx;
			margin-bottom: 20rpx;

			&:last-child {
				margin-bottom: 0;
			}

			.skeleton-product-img {
				width: 120rpx;
				height: 120rpx;
				background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
				background-size: 200% 100%;
				animation: skeleton-loading 1.5s infinite;
				border-radius: 12rpx;
			}

			.skeleton-product-info {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.skeleton-product-name {
					width: 80%;
					height: 32rpx;
					background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
					background-size: 200% 100%;
					animation: skeleton-loading 1.5s infinite;
					border-radius: 4rpx;
					margin-bottom: 8rpx;
				}

				.skeleton-product-desc {
					width: 60%;
					height: 26rpx;
					background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
					background-size: 200% 100%;
					animation: skeleton-loading 1.5s infinite;
					border-radius: 4rpx;
					margin-bottom: 16rpx;
				}

				.skeleton-product-bottom {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.skeleton-product-price {
						width: 120rpx;
						height: 36rpx;
						background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
						background-size: 200% 100%;
						animation: skeleton-loading 1.5s infinite;
						border-radius: 4rpx;
					}

					.skeleton-product-quantity {
						width: 80rpx;
						height: 28rpx;
						background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
						background-size: 200% 100%;
						animation: skeleton-loading 1.5s infinite;
						border-radius: 4rpx;
					}
				}
			}
		}
	}

	.skeleton-price {
		background: #fff;
		margin: 20rpx 24rpx;
		border-radius: 16rpx;
		padding: 24rpx;

		.skeleton-price-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 16rpx 0;
			border-bottom: 1rpx solid #f0f0f0;

			&:last-child {
				border-bottom: none;
			}

			.skeleton-price-label {
				width: 120rpx;
				height: 28rpx;
				background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
				background-size: 200% 100%;
				animation: skeleton-loading 1.5s infinite;
				border-radius: 4rpx;
			}

			.skeleton-price-value {
				width: 100rpx;
				height: 28rpx;
				background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
				background-size: 200% 100%;
				animation: skeleton-loading 1.5s infinite;
				border-radius: 4rpx;
			}
		}
	}

	.skeleton-payment {
		background: #fff;
		margin: 20rpx 24rpx;
		border-radius: 16rpx;
		padding: 24rpx;

		.skeleton-payment-title {
			width: 120rpx;
			height: 32rpx;
			background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
			background-size: 200% 100%;
			animation: skeleton-loading 1.5s infinite;
			border-radius: 4rpx;
			margin-bottom: 20rpx;
		}

		.skeleton-payment-method {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.skeleton-payment-icon {
				width: 48rpx;
				height: 48rpx;
				background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
				background-size: 200% 100%;
				animation: skeleton-loading 1.5s infinite;
				border-radius: 8rpx;
			}

			.skeleton-payment-name {
				flex: 1;
				margin-left: 16rpx;
				width: 120rpx;
				height: 28rpx;
				background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
				background-size: 200% 100%;
				animation: skeleton-loading 1.5s infinite;
				border-radius: 4rpx;
			}

			.skeleton-payment-arrow {
				width: 20rpx;
				height: 20rpx;
				background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
				background-size: 200% 100%;
				animation: skeleton-loading 1.5s infinite;
				border-radius: 4rpx;
			}
		}
	}

	@keyframes skeleton-loading {
		0% {
			background-position: 200% 0;
		}

		100% {
			background-position: -200% 0;
		}
	}

	/* 防止弹窗出现时背景滚动 */
	.order-detail-container.popup-open {
		overflow: hidden;
		position: fixed;
		width: 100%;
		height: 100%;
	}

	/* Header */
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #fff;
		padding: 20rpx 24rpx;
		border-bottom: 1rpx solid #f0f0f0;

		.header-left,
		.header-right {
			width: 60rpx;
			display: flex;
			align-items: center;
		}

		.header-title {
			font-size: 36rpx;
			font-weight: bold;
			color: #333;
		}
	}

	/* Address Section */
	.address-section {
		background: #fff;
		margin: 20rpx 24rpx;
		border-radius: 16rpx;
		padding: 24rpx;

		.address-content {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.address-info {
			flex: 1;

			.address-user {
				margin-bottom: 8rpx;

				.user-name {
					font-size: 32rpx;
					font-weight: bold;
					color: #333;
					margin-right: 16rpx;
				}

				.user-phone {
					font-size: 28rpx;
					color: #666;
				}
			}

			.address-detail {
				font-size: 28rpx;
				color: #666;
				line-height: 1.4;
			}
		}

		.address-arrow {
			margin-left: 16rpx;
		}
	}

	/* No Address Section */
	.no-address-section {
		background: #fff;
		margin: 20rpx 24rpx;
		border-radius: 16rpx;
		padding: 24rpx;
		border: 2rpx dashed #e0e0e0;
		transition: all 0.3s ease;

		&:active {
			border-color: #89D600;
			background: rgba(137, 214, 0, 0.05);
		}

		.no-address-content {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.no-address-icon {
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			background: #f5f5f5;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.no-address-info {
			flex: 1;
			margin-left: 20rpx;

			.no-address-title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
				margin-bottom: 8rpx;
			}

			.no-address-desc {
				font-size: 26rpx;
				color: #999;
				line-height: 1.4;
			}
		}

		.no-address-arrow {
			margin-left: 16rpx;
		}
	}

	/* Product Section */
	.product-section {
		background: #fff;
		margin: 20rpx 24rpx;
		border-radius: 16rpx;
		padding: 24rpx;

		.product-card {
			display: flex;
			gap: 20rpx;
			margin-bottom: 20rpx;

			&:last-child {
				margin-bottom: 0;
			}

			.product-img {
				width: 120rpx;
				height: 120rpx;
				border-radius: 12rpx;
				object-fit: cover;
				background: #f5f5f5;
			}

			.product-info {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.product-name {
					font-size: 32rpx;
					font-weight: bold;
					color: #333;
					margin-bottom: 8rpx;
				}

				.product-desc {
					font-size: 26rpx;
					color: #666;
					margin-bottom: 16rpx;
				}

				.product-bottom {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.product-price {
						font-size: 36rpx;
						font-weight: bold;
						color: #e54d42;
					}

					.product-quantity {
						font-size: 28rpx;
						color: #999;
					}
				}
			}
		}
	}

	/* Price Section */
	.price-section {
		background: #fff;
		margin: 20rpx 24rpx;
		border-radius: 16rpx;
		padding: 24rpx;

		.price-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 16rpx 0;
			border-bottom: 1rpx solid #f0f0f0;

			&:last-child {
				border-bottom: none;
			}

			.price-label {
				font-size: 28rpx;
				color: #333;
			}

			.price-value {
				font-size: 28rpx;
				color: #333;
			}

			&.coupon-item {
				.coupon-info {
					display: flex;
					align-items: center;
					gap: 8rpx;

					.coupon-text {
						font-size: 28rpx;
						color: #4CAF50;

						&.discount-highlight {
							color: #e54d42;
							font-weight: bold;
						}
					}
				}
			}

			&.total-item {
				.total-price {
					font-size: 36rpx;
					font-weight: bold;
					color: #e54d42;
				}
			}
		}
	}

	/* Payment Section */
	.payment-section {
		background: #fff;
		margin: 20rpx 24rpx;
		border-radius: 16rpx;
		padding: 24rpx;

		.section-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 20rpx;
		}

		.payment-method {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.payment-info {
				display: flex;
				align-items: center;
				gap: 16rpx;

				.payment-icon {
					width: 48rpx;
					height: 48rpx;
					border-radius: 8rpx;
				}

				.payment-name {
					font-size: 28rpx;
					color: #333;
				}
			}

			.payment-arrow {
				margin-left: 16rpx;
			}
		}
	}

	/* Bottom Bar */
	.bottom-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		padding: 20rpx 24rpx;
		border-top: 1rpx solid #f0f0f0;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.total-info {
			display: flex;
			align-items: center;
			gap: 8rpx;

			.total-label {
				font-size: 28rpx;
				color: #333;
			}

			.total-amount {
				font-size: 36rpx;
				font-weight: bold;
				color: #e54d42;
			}
		}

		.buy-button {
			background: #89D600;
			color: #fff;
			padding: 20rpx 40rpx;
			border-radius: 32rpx;
			font-size: 32rpx;
			font-weight: bold;
		}
	}

	/* Coupon Modal */
	.coupon-modal {
		height: 100%;
		display: flex;
		flex-direction: column;
		background: #fff;

		.modal-header {
			padding: 32rpx 24rpx 24rpx;
			border-bottom: 1rpx solid #f0f0f0;
			position: relative;

			.modal-title {
				font-size: 36rpx;
				font-weight: bold;
				color: #333;
				margin-bottom: 8rpx;
			}

			.modal-subtitle {
				font-size: 26rpx;
				color: #666;

				.discount-amount {
					color: #e54d42;
					font-weight: bold;
				}
			}

			.modal-close {
				position: absolute;
				top: 32rpx;
				right: 24rpx;
			}
		}

		.coupon-list {
			flex: 1;
			padding: 24rpx;
			overflow-y: auto;

			.coupon-item {
				margin-bottom: 20rpx;

				.coupon-content {
					background: #fff;
					border-radius: 16rpx;
					padding: 0;
					display: flex;
					align-items: stretch;
					justify-content: space-between;
					cursor: pointer;
					transition: all 0.3s ease;
					overflow: hidden;
					border: 1rpx solid #f0f0f0;

					.coupon-left {
						width: 120rpx;
						text-align: center;
						background: linear-gradient(135deg, #89D600 0%, #9BE600 100%);
						display: flex;
						align-items: center;
						justify-content: center;
						padding: 24rpx 0;

						.coupon-amount {
							font-size: 48rpx;
							font-weight: bold;
							color: #fff;
							line-height: 1;
						}
					}

					.coupon-center {
						flex: 1;
						padding: 24rpx;
						background: #fff;

						.coupon-label {
							font-size: 28rpx;
							color: #333;
							font-weight: bold;
							margin-bottom: 8rpx;
						}

						.coupon-date {
							font-size: 24rpx;
							color: #666;
							margin-bottom: 4rpx;
						}

						.coupon-note {
							font-size: 22rpx;
							color: #999;
						}
					}

					.coupon-right {
						width: 60rpx;
						text-align: center;
						background: #fff;
						display: flex;
						align-items: center;
						justify-content: center;
						padding: 24rpx 0;
					}
				}
			}
		}

		.modal-footer {
			padding: 24rpx;
			border-top: 1rpx solid #f0f0f0;

			.confirm-button {
				background: #89D600;
				color: #fff;
				text-align: center;
				padding: 24rpx;
				border-radius: 16rpx;
				font-size: 32rpx;
				font-weight: bold;
			}
		}
	}

	/* Payment Modal */
	.payment-modal {
		height: 100%;
		display: flex;
		flex-direction: column;
		background: #fff;

		.modal-header {
			padding: 32rpx 24rpx 24rpx;
			border-bottom: 1rpx solid #f0f0f0;
			position: relative;

			.modal-title {
				font-size: 36rpx;
				font-weight: bold;
				color: #333;
			}

			.modal-close {
				position: absolute;
				top: 32rpx;
				right: 24rpx;
			}
		}

		.payment-list {
			flex: 1;
			padding: 24rpx;

			.payment-item {
				margin-bottom: 20rpx;

				.payment-content {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 24rpx;
					border-radius: 16rpx;
					border: 1rpx solid #f0f0f0;
					transition: all 0.3s ease;

					&:hover {
						border-color: #89D600;
						background: rgba(137, 214, 0, 0.05);
					}

					.payment-left {
						display: flex;
						align-items: center;
						gap: 16rpx;
						flex: 1;

						.payment-icon {
							width: 48rpx;
							height: 48rpx;
							border-radius: 8rpx;
						}

						.payment-info {
							.payment-name {
								font-size: 32rpx;
								font-weight: bold;
								color: #333;
								margin-bottom: 4rpx;
							}

							.payment-desc {
								font-size: 24rpx;
								color: #666;
							}
						}
					}

					.payment-right {
						margin-left: 16rpx;
					}
				}
			}
		}

		.modal-footer {
			padding: 24rpx;
			border-top: 1rpx solid #f0f0f0;

			.confirm-button {
				background: #89D600;
				color: #fff;
				text-align: center;
				padding: 24rpx;
				border-radius: 16rpx;
				font-size: 32rpx;
				font-weight: bold;
			}
		}
	}

	/* 支付成功弹窗样式 */
	.payment-success-modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		opacity: 0;
		visibility: hidden;
		transition: all 0.3s ease;
		
		&.show {
			opacity: 1;
			visibility: visible;
			
			.payment-success-modal {
				transform: scale(1) translateY(0);
			}
		}
	}

	.payment-success-modal {
		background: #fff;
		border-radius: 24rpx;
		padding: 60rpx 48rpx 48rpx;
		margin: 0 48rpx;
		max-width: 600rpx;
		width: 100%;
		text-align: center;
		transform: scale(0.8) translateY(-40rpx);
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		box-shadow: 0 24rpx 80rpx rgba(0, 0, 0, 0.12);
	}

	/* 成功图标 */
	.success-icon {
		margin-bottom: 32rpx;
		
		.success-circle {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			background: linear-gradient(135deg, #89D600 0%, #9BE600 100%);
			margin: 0 auto;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			animation: success-bounce 0.6s ease;
			
			.success-check {
				position: relative;
				width: 40rpx;
				height: 40rpx;
				
				.check-line {
					position: absolute;
					background: #fff;
					border-radius: 4rpx;
					
					&.check-line1 {
						width: 4rpx;
						height: 20rpx;
						left: 14rpx;
						top: 20rpx;
						transform: rotate(45deg);
						animation: check-line1 0.4s ease 0.2s both;
					}
					
					&.check-line2 {
						width: 4rpx;
						height: 32rpx;
						left: 22rpx;
						top: 8rpx;
						transform: rotate(-45deg);
						animation: check-line2 0.4s ease 0.4s both;
					}
				}
			}
		}
	}

	/* 标题 */
	.modal-title {
		font-size: 48rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 24rpx;
		animation: fade-in-up 0.5s ease 0.3s both;
	}

	/* 金额信息 */
	.amount-info {
		margin-bottom: 32rpx;
		animation: fade-in-up 0.5s ease 0.4s both;
		
		.amount-label {
			display: block;
			font-size: 28rpx;
			color: #666;
			margin-bottom: 8rpx;
		}
		
		.amount-value {
			display: block;
			font-size: 56rpx;
			font-weight: bold;
			color: #89D600;
		}
	}

	/* 感谢信息 */
	.thank-message {
		margin-bottom: 48rpx;
		animation: fade-in-up 0.5s ease 0.5s both;
		
		.thank-text {
			display: block;
			font-size: 32rpx;
			color: #333;
			margin-bottom: 8rpx;
		}
		
		.delivery-text {
			display: block;
			font-size: 26rpx;
			color: #999;
		}
	}

	/* 按钮组 */
	.button-group {
		display: flex;
		gap: 24rpx;
		animation: fade-in-up 0.5s ease 0.6s both;
		
		.button {
			flex: 1;
			height: 88rpx;
			border-radius: 44rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
			font-weight: 500;
			transition: all 0.3s ease;
			cursor: pointer;
			
			&:active {
				transform: scale(0.95);
			}
			
			&.secondary-button {
				background: #f5f5f5;
				color: #666;
				border: 2rpx solid #e0e0e0;
				
				&:hover {
					background: #ebebeb;
					border-color: #d0d0d0;
				}
			}
			
			&.primary-button {
				background: linear-gradient(135deg, #89D600 0%, #9BE600 100%);
				color: #fff;
				box-shadow: 0 8rpx 24rpx rgba(137, 214, 0, 0.3);
				
				&:hover {
					box-shadow: 0 12rpx 32rpx rgba(137, 214, 0, 0.4);
					transform: translateY(-2rpx);
				}
				
				&:active {
					transform: scale(0.95) translateY(0);
				}
			}
		}
	}

	/* 动画定义 */
	@keyframes success-bounce {
		0% {
			transform: scale(0);
			opacity: 0;
		}
		50% {
			transform: scale(1.1);
			opacity: 1;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	@keyframes check-line1 {
		0% {
			height: 0;
		}
		100% {
			height: 20rpx;
		}
	}

	@keyframes check-line2 {
		0% {
			height: 0;
		}
		100% {
			height: 32rpx;
		}
	}

	@keyframes fade-in-up {
		0% {
			opacity: 0;
			transform: translateY(40rpx);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>