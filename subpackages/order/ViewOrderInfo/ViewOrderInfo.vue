<template>
	<view class="page-wrapper">
		<view class="order-detail-container">
			<!-- 订单状态区域 -->
			<view class="status-section">
				<view class="status-info">
					<text class="status-text">{{ getStatusText(orderDetail.status) }}</text>
					<text class="status-desc" v-if="getStatusDesc(orderDetail.status)">{{ getStatusDesc(orderDetail.status) }}</text>
				</view>
			</view>

			<!-- 收货地址信息 -->
			<view class="address-section" v-if="orderDetail.consigneeName">
				<view class="section-header">
					<text class="section-title">收货信息</text>
				</view>
				<view class="address-info">
					<view class="address-row">
						<text class="consignee-name">{{ orderDetail.consigneeName }}</text>
						<text class="consignee-mobile">{{ orderDetail.consigneeMobile }}</text>
					</view>
					<text class="address-detail">{{ getFullAddress() }}</text>
				</view>
			</view>

			<!-- 自提信息 -->
			<view class="pickup-section" v-if="orderDetail.deliveryType === 2 && orderDetail.shopAddressName">
				<view class="section-header">
					<u-icon name="home" color="#89D600" size="18"></u-icon>
					<text class="section-title">自提信息</text>
				</view>
				<view class="pickup-info">
					<view class="shop-row">
						<text class="shop-name">{{ orderDetail.shopAddressName }}</text>
						<text class="shop-phone" v-if="orderDetail.shopPhone">{{ orderDetail.shopPhone }}</text>
					</view>
					<text class="shop-address" v-if="orderDetail.shopAddress">{{ orderDetail.shopAddress }}</text>
					<view class="take-code" v-if="orderDetail.takeCode">
						<text class="code-label">提货码：</text>
						<text class="code-text">{{ orderDetail.takeCode }}</text>
						<view class="copy-btn" @click="copyTakeCode">
							<u-icon name="copy" color="#89D600" size="14"></u-icon>
						</view>
					</view>
				</view>
			</view>

			<!-- 商品信息区域 -->
			<view class="goods-section">
				<view class="section-header">
					<text class="section-title">商品信息</text>
				</view>
				<view class="goods-list">
					<view class="goods-item" v-for="(item, index) in orderDetail.orderItems" :key="index">
						<image class="goods-image" :src="item.goodsImage" mode="aspectFill"></image>
						<view class="goods-info">
							<text class="goods-name">{{ item.goodsName }}</text>
							<text class="goods-specs" v-if="item.specs">{{ formatSpecs(item.specs) }}</text>
							<view class="goods-bottom">
								<text class="goods-price">¥{{ item.goodsPrice }}</text>
								<text class="goods-quantity">×{{ item.goodsNum }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 订单信息区域 -->
			<view class="order-info-section">
				<view class="section-header">
					<u-icon name="file-text" color="#89D600" size="18"></u-icon>
					<text class="section-title">订单信息</text>
				</view>
				<view class="order-info-list">
					<view class="info-row">
						<text class="info-label">订单编号</text>
						<view class="info-value-row">
							<text class="info-value">{{ orderDetail.orderId }}</text>
							<view class="copy-btn" @click="copyOrderNumber">
								<u-icon name="order" color="#89D600" size="14"></u-icon>
							</view>
						</view>
					</view>
					<view class="info-row">
						<text class="info-label">下单时间</text>
						<text class="info-value">{{ formatTime(orderDetail.createTime) }}</text>
					</view>
					<view class="info-row" v-if="orderDetail.payTime">
						<text class="info-label">支付时间</text>
						<text class="info-value">{{ formatTime(orderDetail.payTime) }}</text>
					</view>
					<view class="info-row" v-if="orderDetail.logisticsTime">
						<text class="info-label">发货时间</text>
						<text class="info-value">{{ formatTime(orderDetail.logisticsTime) }}</text>
					</view>
					<view class="info-row" v-if="orderDetail.completeTime">
						<text class="info-label">完成时间</text>
						<text class="info-value">{{ formatTime(orderDetail.completeTime) }}</text>
					</view>
					<view class="info-row" v-if="orderDetail.paymentMethod">
						<text class="info-label">支付方式</text>
						<text class="info-value">{{ getPaymentMethodText(orderDetail.paymentMethod) }}</text>
					</view>
					<view class="info-row" v-if="orderDetail.logisticsName && orderDetail.logisticsNo">
						<text class="info-label">物流信息</text>
						<text class="info-value">{{ orderDetail.logisticsName }} {{ orderDetail.logisticsNo }}</text>
					</view>
					<view class="info-row" v-if="orderDetail.memberRemark">
						<text class="info-label">买家备注</text>
						<text class="info-value">{{ orderDetail.memberRemark }}</text>
					</view>
					<view class="info-row" v-if="orderDetail.sellerRemark">
						<text class="info-label">商家备注</text>
						<text class="info-value">{{ orderDetail.sellerRemark }}</text>
					</view>
				</view>
			</view>

			<!-- 价格明细区域 -->
			<view class="price-section">
				<view class="section-header">
					<text class="section-title">价格明细</text>
				</view>
				<view class="price-list">
					<view class="price-row">
						<text class="price-label">商品总价</text>
						<text class="price-value">¥{{ orderDetail.goodsAmount }}</text>
					</view>
					<view class="price-row" v-if="orderDetail.freightPrice > 0">
						<text class="price-label">运费</text>
						<text class="price-value">¥{{ orderDetail.freightPrice }}</text>
					</view>
					<view class="price-row" v-if="orderDetail.couponPrice > 0">
						<text class="price-label">优惠券</text>
						<text class="price-value discount">-¥{{ orderDetail.couponPrice }}</text>
					</view>
					<view class="price-row" v-if="orderDetail.discountPrice > 0">
						<text class="price-label">商家优惠</text>
						<text class="price-value discount">-¥{{ orderDetail.discountPrice }}</text>
					</view>
					<view class="price-row total">
						<text class="price-label">实付金额</text>
						<text class="price-value total-price">¥{{ orderDetail.flowPrice }}</text>
					</view>
				</view>
			</view>

			<!-- 底部操作按钮 -->
			<view class="action-bar" v-if="actionButtons.length > 0">
				<view class="action-buttons">
					<view class="action-btn" 
						v-for="(action, index) in actionButtons" 
						:key="index"
						:class="{ primary: action.primary, secondary: !action.primary }"
						@click="handleAction(action.type)">
						<text>{{ action.text }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { fetchOrderDetail, fetchOrderComplete, fetchOrderCancel } from '@/api/orders'

	export default {
		name: 'ViewOrderInfo',
		data() {
			return {
				orderId: '',
				orderDetail: {},
				loading: false
			}
		},
		computed: {
			// 根据订单状态生成操作按钮
			actionButtons() {
				const buttons = []
				const status = this.orderDetail.status
				
				switch (status) {
					case 10: // 待付款
						buttons.push({ type: 'cancel', text: '取消订单', primary: false })
						buttons.push({ type: 'pay', text: '继续付款', primary: true })
						break
					case 20: // 待发货
						buttons.push({ type: 'afterSale', text: '申请售后', primary: false })
						break
					case 30: // 待收货
						buttons.push({ type: 'logistics', text: '查看物流', primary: false })
						buttons.push({ type: 'confirmReceipt', text: '确认收货', primary: true })
						break
					case 40: // 已完成
						buttons.push({ type: 'afterSale', text: '申请售后', primary: false })
						// 只有在已收货且可评价状态下才显示评价按钮
						if (this.canReview()) {
							buttons.push({ type: 'review', text: '去评价', primary: true })
						}
						buttons.push({ type: 'reorder', text: '再来一单', primary: false })
						break
					case 50: // 已取消
						buttons.push({ type: 'reorder', text: '再来一单', primary: false })
						break
				}
				
				return buttons
			}
		},
		onLoad(options) {
			if (options.orderId) {
				this.orderId = options.orderId
				this.loadOrderDetail()
			} else {
				uni.showToast({
					title: '订单号不能为空',
					icon: 'error'
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 1500)
			}
		},
		methods: {
			// 加载订单详情
			async loadOrderDetail() {
				if (this.loading) return
				
				this.loading = true
				uni.showLoading({ title: '加载中...' })
				
				try {
					const response = await fetchOrderDetail(this.orderId)
					if (response.code === 200 && response.data) {
						this.orderDetail = response.data
					} else {
						throw new Error(response.msg || '获取订单详情失败')
					}
				} catch (error) {
					console.error('获取订单详情失败:', error)
					uni.showToast({
						title: error.message || '获取订单详情失败',
						icon: 'error'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				} finally {
					this.loading = false
					uni.hideLoading()
				}
			},

			// 获取状态图标
			getStatusIcon(status) {
				const iconMap = {
					10: 'clock',
					11: 'checkmark-circle',
					20: 'cube',
					30: 'car',
					40: 'checkmark-circle-2',
					50: 'close-circle'
				}
				return iconMap[status] || 'help-circle'
			},

			// 获取状态颜色
			getStatusColor(status) {
				const colorMap = {
					10: '#ff9500',
					11: '#89D600',
					20: '#007aff',
					30: '#ff6600',
					40: '#89D600',
					50: '#8e8e93'
				}
				return colorMap[status] || '#8e8e93'
			},

			// 获取状态文本
			getStatusText(status) {
				const statusMap = {
					10: '待付款',
					11: '已付款',
					20: '待发货',
					30: '待收货',
					40: '已完成',
					50: '已取消'
				}
				return statusMap[status] || '未知状态'
			},

			// 获取状态描述
			getStatusDesc(status) {
				const descMap = {
					10: '请尽快完成支付',
					11: '商家正在备货中',
					20: '商家正在发货',
					30: '商品正在配送中',
					40: '订单已完成',
					50: '订单已取消'
				}
				return descMap[status] || ''
			},

			// 获取完整地址
			getFullAddress() {
				const paths = []
				if (this.orderDetail.consigneeAddressPath) {
					paths.push(this.orderDetail.consigneeAddressPath)
				}
				if (this.orderDetail.consigneeDetail) {
					paths.push(this.orderDetail.consigneeDetail)
				}
				return paths.join(' ')
			},

			// 格式化规格
			formatSpecs(specs) {
				if (!specs) return ''
				try {
					const specsArray = JSON.parse(specs)
					if (Array.isArray(specsArray)) {
						return specsArray.join(' | ')
					}
					return specs
				} catch (error) {
					return specs
				}
			},

			// 格式化时间
			formatTime(timeStr) {
				if (!timeStr) return ''
				try {
					const date = new Date(timeStr)
					const year = date.getFullYear()
					const month = String(date.getMonth() + 1).padStart(2, '0')
					const day = String(date.getDate()).padStart(2, '0')
					const hours = String(date.getHours()).padStart(2, '0')
					const minutes = String(date.getMinutes()).padStart(2, '0')
					return `${year}-${month}-${day} ${hours}:${minutes}`
				} catch (error) {
					return timeStr
				}
			},

			// 获取支付方式文本
			getPaymentMethodText(method) {
				const methodMap = {
					1: '微信支付',
					2: '余额支付',
					3: '园区卡支付'
				}
				return methodMap[method] || '未知支付方式'
			},

			// 判断是否可以评价
			canReview() {
				// 只有已完成的订单才能评价
				if (this.orderDetail.status !== 40) return false
				
				// 检查商品的评价状态，只有commentStatus等于1时才可以评价
				if (this.orderDetail.orderItems && this.orderDetail.orderItems.length > 0) {
					return this.orderDetail.orderItems.some(item => 
						item.commentStatus === 1
					)
				}
				return false
			},

			// 复制订单号
			copyOrderNumber() {
				uni.setClipboardData({
					data: this.orderDetail.orderId,
					success: () => {
						uni.showToast({
							title: '订单号已复制',
							icon: 'success'
						})
					}
				})
			},

			// 复制提货码
			copyTakeCode() {
				uni.setClipboardData({
					data: this.orderDetail.takeCode,
					success: () => {
						uni.showToast({
							title: '提货码已复制',
							icon: 'success'
						})
					}
				})
			},

			// 处理按钮点击
			handleAction(actionType) {
				switch (actionType) {
					case 'cancel':
						this.cancelOrder()
						break
					case 'pay':
						this.payOrder()
						break
					case 'afterSale':
						this.afterSale()
						break
					case 'logistics':
						this.viewLogistics()
						break
					case 'confirmReceipt':
						this.confirmReceipt()
						break
					case 'review':
						this.reviewOrder()
						break
					case 'reorder':
						this.reorder()
						break
					default:
						uni.showToast({
							title: '功能开发中',
							icon: 'none'
						})
				}
			},

			// 取消订单
			async cancelOrder() {
				uni.showModal({
					title: '确认取消',
					content: '确定要取消这个订单吗？',
					success: async (res) => {
						if (res.confirm) {
							try {
								uni.showLoading({ title: '处理中...' })
								const response = await fetchOrderCancel(this.orderDetail.orderId)
								if (response.code === 200) {
									uni.showToast({
										title: '订单已取消',
										icon: 'success'
									})
									// 刷新订单详情
									setTimeout(() => {
										this.loadOrderDetail()
									}, 1000)
								} else {
									throw new Error(response.msg || '取消订单失败')
								}
							} catch (error) {
								uni.showToast({
									title: error.message || '取消订单失败',
									icon: 'error'
								})
							} finally {
								uni.hideLoading()
							}
						}
					}
				})
			},

			// 继续付款
			payOrder() {
				// 跳转到支付页面或调用支付接口
				uni.showToast({
					title: '跳转支付页面',
					icon: 'none'
				})
			},

			// 申请售后
			afterSale() {
				const params = {
					orderId: this.orderDetail.orderId,
					orderStatus: this.orderDetail.status
				}
				
				if (this.orderDetail.orderItems && this.orderDetail.orderItems.length > 0) {
					const item = this.orderDetail.orderItems[0]
					params.orderItemId = item.orderItemId
					params.productName = encodeURIComponent(item.goodsName)
					params.productImage = encodeURIComponent(item.goodsImage)
					params.productPrice = item.goodsPrice
				}
				
				const urlParams = Object.keys(params)
					.map(key => `${key}=${params[key]}`)
					.join('&')
				
				uni.navigateTo({
					url: `/subpackages/order/afterSale/afterSale?${urlParams}`
				})
			},

			// 查看物流
			viewLogistics() {
				uni.navigateTo({
					url: `/subpackages/order/logistics/logistics?orderId=${this.orderDetail.orderId}`
				})
			},

			// 确认收货
			async confirmReceipt() {
				uni.showModal({
					title: '确认收货',
					content: '确认已收到商品吗？确认后订单将完成。',
					success: async (res) => {
						if (res.confirm) {
							try {
								uni.showLoading({ title: '处理中...' })
								const response = await fetchOrderComplete({
									orderId: this.orderDetail.orderId
								})
								if (response.code === 200) {
									uni.showToast({
										title: '确认收货成功',
										icon: 'success'
									})
									// 刷新订单详情
									setTimeout(() => {
										this.loadOrderDetail()
									}, 1000)
								} else {
									throw new Error(response.msg || '确认收货失败')
								}
							} catch (error) {
								uni.showToast({
									title: error.message || '确认收货失败',
									icon: 'error'
								})
							} finally {
								uni.hideLoading()
							}
						}
					}
				})
			},

			// 去评价
			reviewOrder() {
				// 找到可评价的商品
				const reviewableItem = this.orderDetail.orderItems?.find(item => item.commentStatus === 1)
				
				if (!reviewableItem) {
					uni.showToast({
						title: '没有可评价的商品',
						icon: 'none'
					})
					return
				}

				// 构建商品信息参数
				const productInfo = {
					goodsId: reviewableItem.goodsId,
					goodsName: reviewableItem.goodsName,
					goodsImage: reviewableItem.goodsImage,
					currentPrice: reviewableItem.goodsPrice
				}

				// 构建跳转参数
				const params = {
					orderId: this.orderDetail.orderId,
					orderItemId: reviewableItem.orderItemId,
					commentType: 0, // 主评
					productInfo: encodeURIComponent(JSON.stringify(productInfo))
				}

				// 构建URL参数
				const urlParams = Object.keys(params)
					.map(key => `${key}=${params[key]}`)
					.join('&')

				uni.navigateTo({
					url: `/subpackages/goods/commentsVIew/commentsVIew?${urlParams}`
				})
			},

			// 再来一单
			reorder() {
				uni.showToast({
					title: '添加到购物车',
					icon: 'success'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 页面包装器 */
	.page-wrapper {
		min-height: 100vh;
		background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
		padding-top: env(safe-area-inset-top);
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: border-box;
	}

	.order-detail-container {
		padding-bottom: 120rpx; /* 为底部操作栏留空间 */
	}

	/* 通用区块样式 */
	.status-section,
	.address-section,
	.pickup-section,
	.goods-section,
	.order-info-section,
	.price-section {
		background: rgba(255, 255, 255, 0.95);
		margin: 20rpx;
		border-radius: 12rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
		backdrop-filter: blur(10rpx);
	}

	/* 订单状态区域 */
	.status-section {
		display: flex;
		align-items: center;
		padding: 40rpx 24rpx;
		background: linear-gradient(135deg, #89D600 0%, #7BC700 100%);
		color: white;
		margin-top: 0;

		.status-icon {
			margin-right: 24rpx;
		}

		.status-info {
			flex: 1;

			.status-text {
				font-size: 32rpx;
				font-weight: bold;
				display: block;
				margin-bottom: 8rpx;
			}

			.status-desc {
				font-size: 26rpx;
				opacity: 0.9;
				display: block;
			}
		}
	}

	/* 区块头部样式 */
	.section-header {
		display: flex;
		align-items: center;
		padding: 24rpx;
		border-bottom: 1rpx solid #f0f0f0;

		.section-title {
			font-size: 28rpx;
			font-weight: bold;
			color: #333;
			margin-left: 12rpx;
		}
	}

	/* 收货地址信息 */
	.address-section,
	.pickup-section {
		.address-info,
		.pickup-info {
			padding: 24rpx;

			.address-row,
			.shop-row {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 12rpx;

				.consignee-name,
				.shop-name {
					font-size: 28rpx;
					font-weight: bold;
					color: #333;
				}

				.consignee-mobile,
				.shop-phone {
					font-size: 26rpx;
					color: #666;
				}
			}

			.address-detail,
			.shop-address {
				font-size: 26rpx;
				color: #666;
				line-height: 1.5;
				display: block;
			}

			.take-code {
				display: flex;
				align-items: center;
				margin-top: 16rpx;
				padding: 16rpx;
				background: #f8f9fa;
				border-radius: 8rpx;

				.code-label {
					font-size: 26rpx;
					color: #666;
				}

				.code-text {
					font-size: 28rpx;
					font-weight: bold;
					color: #89D600;
					margin-right: 12rpx;
				}

				.copy-btn {
					padding: 8rpx;
					border-radius: 4rpx;
					background: rgba(137, 214, 0, 0.1);
				}
			}
		}
	}

	/* 商品信息 */
	.goods-section {
		.goods-list {
			padding: 0 24rpx 24rpx;

			.goods-item {
				display: flex;
				align-items: flex-start;
				padding: 24rpx 0;
				border-bottom: 1rpx solid #f0f0f0;

				&:last-child {
					border-bottom: none;
				}

				.goods-image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 8rpx;
					margin-right: 16rpx;
					flex-shrink: 0;
				}

				.goods-info {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					min-height: 120rpx;

					.goods-name {
						font-size: 28rpx;
						color: #333;
						line-height: 1.4;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						overflow: hidden;
						margin-bottom: 8rpx;
					}

					.goods-specs {
						font-size: 24rpx;
						color: #999;
						margin-bottom: 8rpx;
					}

					.goods-bottom {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.goods-price {
							font-size: 28rpx;
							color: #e54d42;
							font-weight: bold;
						}

						.goods-quantity {
							font-size: 24rpx;
							color: #999;
						}
					}
				}
			}
		}
	}

	/* 订单信息 */
	.order-info-section {
		.order-info-list {
			padding: 0 24rpx 24rpx;

			.info-row {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #f5f5f5;

				&:last-child {
					border-bottom: none;
				}

				.info-label {
					font-size: 26rpx;
					color: #666;
					width: 140rpx;
					flex-shrink: 0;
				}

				.info-value {
					font-size: 26rpx;
					color: #333;
					flex: 1;
					text-align: right;
				}

				.info-value-row {
					display: flex;
					align-items: center;
					flex: 1;
					justify-content: flex-end;

					.info-value {
						margin-right: 12rpx;
						text-align: right;
					}

					.copy-btn {
						padding: 8rpx;
						border-radius: 4rpx;
						background: rgba(137, 214, 0, 0.1);
					}
				}
			}
		}
	}

	/* 价格明细 */
	.price-section {
		.price-list {
			padding: 0 24rpx 24rpx;

			.price-row {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #f5f5f5;

				&:last-child {
					border-bottom: none;
				}

				&.total {
					border-top: 2rpx solid #f0f0f0;
					margin-top: 16rpx;
					padding-top: 24rpx;

					.price-label,
					.total-price {
						font-weight: bold;
						font-size: 28rpx;
					}
				}

				.price-label {
					font-size: 26rpx;
					color: #666;
				}

				.price-value {
					font-size: 26rpx;
					color: #333;

					&.discount {
						color: #e54d42;
					}

					&.total-price {
						color: #e54d42;
						font-size: 32rpx;
						font-weight: bold;
					}
				}
			}
		}
	}

	/* 底部操作栏 */
	.action-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20rpx);
		border-top: 1rpx solid #f0f0f0;
		padding: 24rpx;
		padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
		z-index: 100;

		.action-buttons {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			gap: 16rpx;

			.action-btn {
				height: 72rpx;
				padding: 0 32rpx;
				border-radius: 36rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-shrink: 0;
				min-width: 120rpx;

				text {
					font-size: 26rpx;
				}

				&.secondary {
					background: #fff;
					border: 2rpx solid #ddd;

					text {
						color: #666;
					}

					&:active {
						background: #f5f5f5;
					}
				}

				&.primary {
					background: linear-gradient(135deg, #89D600 0%, #7BC700 100%);
					box-shadow: 0 4rpx 12rpx rgba(137, 214, 0, 0.3);

					text {
						color: #fff;
						font-weight: bold;
					}

					&:active {
						background: linear-gradient(135deg, #7BC700 0%, #6BB600 100%);
					}
				}
			}
		}
	}

	/* 复制按钮通用样式 */
	.copy-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;

		&:active {
			opacity: 0.6;
		}
	}

	/* 全局页面样式 */
	page {
		background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
		min-height: 100vh;
	}

	/* 响应式适配 */
	@media screen and (max-width: 750rpx) {
		.action-buttons {
			flex-wrap: wrap;

			.action-btn {
				flex: 1;
				min-width: 140rpx;
			}
		}
	}
</style>
