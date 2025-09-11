<template>
	<view class="page-wrapper">
		<view class="order-list-container">
			<!-- 固定头部区域 -->
			<view class="fixed-header pt-safe">
				<!-- 状态切换标签 -->
				<view class="status-tabs">
					<scroll-view class="tabs-scroll" scroll-x="true" show-scrollbar="false">
						<view class="tabs-content">
							<view class="tab-item" v-for="(tab, index) in statusTabs" :key="index"
								:class="{ active: currentStatus === tab.value }" @click="switchStatus(tab.value)">
								<text>{{ tab.label }}</text>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>

			<!-- 订单列表区域 -->
			<scroll-view class="order-list-scroll" scroll-y="true" refresher-enabled="true"
				:refresher-triggered="refreshing" @refresherrefresh="onRefresh" @scrolltolower="onLoadMore"
				:lower-threshold="100" :scroll-anchoring="true" :enhanced="true" :bounces="false">
				<view class="order-list">
					<view class="order-item" v-for="(order, index) in filteredOrders" :key="order.id"
						@click="viewOrderDetail(order)">
						<!-- 订单头部 -->
						<view class="order-header">
							<view class="order-info">
								<view class="order-number-row">
									<text class="order-number">订单号：{{ order.orderNumber }}</text>
								<u-icon name="file-text-fill" color="#999" size="14"
									@click.stop="copyOrderNumber(order.orderNumber)"></u-icon>
								</view>
								<text class="order-time">{{ order.createTime }}</text>
							</view>
							<view class="order-status">
								<text>{{ getStatusText(order.status) }}</text>
							</view>
						</view>

						<!-- 商品信息区域 -->
						<view class="product-section">
							<view class="product-item" v-for="(product, pIndex) in order.products" :key="pIndex">
								<image class="product-img" :src="product.image" mode="aspectFill"></image>
								<view class="product-info">
									<view class="product-name">{{ product.name }}</view>
									<view class="product-attr">{{ product.attributes }}</view>
									<view class="product-bottom">
										<view class="product-price">¥{{ product.price }}</view>
										<view class="product-quantity">×{{ product.quantity }}</view>
									</view>
								</view>
							</view>
						</view>

						<!-- 订单底部 -->
						<view class="order-footer">
							<view class="order-total">
								<text>共{{ getTotalQuantity(order.products) }}件商品</text>
								<text class="total-price">合计：¥{{ order.totalAmount }}</text>
							</view>
							<view class="action-buttons">
								<view class="action-btn secondary" v-for="action in order.secondaryActions"
									:key="action.type" @click.stop="handleAction(action.type, order)">
									<text>{{ action.text }}</text>
								</view>
								<view class="action-btn primary" v-for="action in order.primaryActions"
									:key="action.type" @click.stop="handleAction(action.type, order)">
									<text>{{ action.text }}</text>
								</view>
							</view>
						</view>
					</view>

					<!-- 加载更多提示 -->
					<view class="load-more" v-if="hasMore">
						<text v-if="loading">加载中...</text>
						<text v-else>上拉加载更多</text>
					</view>
					<view class="no-more" v-else>
						<text>没有更多订单了</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		fetchOrderList,
		fetchOrderComplete
	} from '@/api/orders'

	export default {
		name: 'OrderList',
		data() {
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
					},
					{
						label: '待付款',
						value: '10'
					},
					{
						label: '待发货',
						value: '20'
					},
					{
						label: '待收货',
						value: '30'
					},
					{
						label: '已完成',
						value: '40'
					}
				],
				allOrders: []
			}
		},
		computed: {
			filteredOrders() {
				if (this.currentStatus === 'all') {
					return this.allOrders
				}
				return this.allOrders.filter(order => order.status == this.currentStatus)
			}
		},
		onLoad(options) {
			console.log('订单列表页面接收到参数:', options)
			
			// 处理从mine页面传递的参数
			if (options.status) {
				this.currentStatus = options.status
				console.log('设置当前状态为:', this.currentStatus)
			}
			if (options.tab) {
				// 根据tab参数设置当前状态
				const tabStatusMap = {
					'pending': '10',
					'processing': '20',
					'shipped': '30',
					'completed': '40'
				}
				if (tabStatusMap[options.tab]) {
					this.currentStatus = tabStatusMap[options.tab]
					console.log('根据tab设置当前状态为:', this.currentStatus)
				}
			}
			
			// 重置分页参数
			this.page = 1
			this.hasMore = true
			this.allOrders = []
		},
		mounted() {
			// 延迟加载，确保状态设置完成
			this.$nextTick(() => {
				console.log('mounted时的当前状态:', this.currentStatus)
				this.loadOrders()
			})
		},
		methods: {
			// 返回上一页
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},

			// 复制订单号
			copyOrderNumber(orderNumber) {
				uni.setClipboardData({
					data: orderNumber,
					success: () => {
						uni.showToast({
							title: '订单号已复制',
							icon: 'success',
							duration: 1500
						})
					},
					fail: () => {
						uni.showToast({
							title: '复制失败',
							icon: 'none',
							duration: 1500
						})
					}
				})
			},

			// 显示更多选项
			showMoreOptions() {
				uni.showActionSheet({
					itemList: ['搜索订单', '联系客服'],
					success: (res) => {
						if (res.tapIndex === 0) {
							// 搜索订单
							uni.showToast({
								title: '搜索功能开发中',
								icon: 'none'
							})
						} else if (res.tapIndex === 1) {
							// 联系客服
							uni.showToast({
								title: '客服功能开发中',
								icon: 'none'
							})
						}
					}
				})
			},

			// 切换状态
			switchStatus(status) {
				this.currentStatus = status
				this.page = 1
				this.hasMore = true
				this.allOrders = [] // 清空当前列表
				this.loadOrders()
			},

			// 获取状态文本
			getStatusText(status) {
				const statusMap = {
					'10': '待付款',
					'20': '待发货',
					'30': '待收货',
					'40': '已完成',
					'50': '已取消'
				}
				return statusMap[status] || '未知状态'
			},

			// 获取商品总数量
			getTotalQuantity(products) {
				return products.reduce((total, product) => total + product.quantity, 0)
			},

			// 处理API返回的订单数据
			processOrderData(orderData) {
				return {
					id: orderData.orderId,
					orderNumber: orderData.orderId,
					createTime: this.formatTime(orderData.createTime),
					status: orderData.status,
					totalAmount: parseFloat(orderData.flowPrice || 0).toFixed(2),
					products: (orderData.orderItems || []).map(goods => ({
						image: goods.goodsImage || '',
						name: goods.goodsName || '商品名称',
						attributes: this.formatSpecs(goods.specs),
						price: parseFloat(goods.unitPrice || 0).toFixed(2),
						quantity: goods.goodsNum || 1
					})),
					secondaryActions: this.getSecondaryActions(orderData.status),
					primaryActions: this.getPrimaryActions(orderData.status)
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

			// 格式化规格信息
			formatSpecs(specs) {
				if (!specs) return ''
				if (typeof specs === 'string') {
					try {
						const specsArray = JSON.parse(specs)
						if (Array.isArray(specsArray)) {
							return specsArray.join(' | ')
						}
						return specs
					} catch (error) {
						return specs
					}
				}
				if (Array.isArray(specs)) {
					return specs.join(' | ')
				}
				return String(specs)
			},

			// 获取次要操作按钮
			getSecondaryActions(status) {
				const actions = []
				switch (status) {
					case '10': // 待付款
					case 10: // 待付款
						actions.push({
							type: 'cancel',
							text: '取消订单'
						})
						break
					case '20': // 待发货
					case 20: // 待发货
						actions.push({
							type: 'afterSale',
							text: '申请售后'
						})
						break
					case '30': // 待收货
					case 30: // 待收货
						actions.push({
							type: 'logistics',
							text: '查看物流'
						})
						actions.push({
							type: 'confirmReceipt',
							text: '确认收货'
						})
						break
					case '40': // 已完成
					case 40: // 已完成
						actions.push({
							type: 'reorder',
							text: '再来一单'
						})
						// 根据业务需求，已完成状态也可以申请售后（比如在收货后7天内）
						actions.push({
							type: 'afterSale',
							text: '申请售后'
						})
						break
					case 'all': // 全部状态
						actions.push({
							type: 'logistics',
							text: '查看物流'
						})
						actions.push({
							type: 'afterSale',
							text: '申请售后'
						})
						break
				}
				return actions
			},

			// 获取主要操作按钮
			getPrimaryActions(status) {
				const actions = []
				switch (status) {
					case '10': // 待付款
						actions.push({
							type: 'pay',
							text: '继续付款'
						})
						break
					case '20': // 待发货
						actions.push({
							type: 'reorder',
							text: '再来一单'
						})
						break
					case '30': // 待收货
						actions.push({
							type: 'confirm',
							text: '确认收货'
						})
						break
					case '40': // 已完成
						actions.push({
							type: 'review',
							text: '去评价'
						})
						break
				}
				return actions
			},

			// 加载订单数据
			async loadOrders() {
				if (this.loading) return

				this.loading = true

				try {
					const params = {
						pageNum: this.page,
						pageSize: this.pageSize
					}

					// 如果不是全部状态，添加状态过滤
					if (this.currentStatus !== 'all') {
						params.status = this.currentStatus
					}

					// TODO fetchOrderList 会在这里使用
					const response = await fetchOrderList(params)
					if (response.code === 200 && response.rows.length) {
						const orderList = response.rows || []
						const newOrders = orderList.map(order => this.processOrderData(order))
						if (this.page === 1) {
							this.allOrders = newOrders
						} else {
							this.allOrders = [...this.allOrders, ...newOrders]
						}

						// 判断是否还有更多数据
						if (newOrders.length < this.pageSize) {
							this.hasMore = false
						}
					}
				} catch (error) {
					console.error('Failed to fetch orders:', error)
					uni.showToast({
						title: '加载订单失败',
						icon: 'none'
					})
				} finally {
					// 3秒超时自动关闭
					this.loading = false
					this.page++
				}
			},

			// 下拉刷新
			async onRefresh() {
				this.refreshing = true
				this.page = 1
				this.hasMore = true

				try {
					const params = {
						pageNum: this.page,
						pageSize: this.pageSize
					}

					// 如果不是全部状态，添加状态过滤
					if (this.currentStatus !== 'all') {
						params.status = this.currentStatus
					}

					// TODO fetchOrderList 会在这里使用
					const response = await fetchOrderList(params)

					if (response.code === 200 && response.data) {
						const orderList = response.data.rows || response.data.list || response.data.records || []
						this.allOrders = orderList.map(order => this.processOrderData(order))
					}

				} catch (error) {
					console.error('Failed to refresh orders:', error)
					uni.showToast({
						title: '刷新订单失败',
						icon: 'none'
					})
				} finally {
					this.refreshing = false
				}
			},

			// 上拉加载更多
			onLoadMore() {
				if (this.hasMore && !this.loading) {
					this.loadOrders()
				}
			},

			// 处理按钮点击
			handleAction(actionType, order) {
				switch (actionType) {
					case 'cancel':
						this.cancelOrder(order)
						break
					case 'pay':
						this.payOrder(order)
						break
					case 'afterSale':
						this.afterSale(order)
						break
					case 'reorder':
						this.reorder(order)
						break
					case 'logistics':
						this.viewLogistics(order)
						break
					case 'confirm':
						this.confirmOrder(order)
						break
					case 'confirmReceipt':
						this.confirmReceipt(order)
						break
					case 'review':
						this.reviewOrder(order)
						break
					default:
						uni.showToast({
							title: '功能开发中',
							icon: 'none'
						})
				}
			},

			// 取消订单
			async cancelOrder(order) {
				uni.showModal({
					title: '确认取消',
					content: '确定要取消这个订单吗？',
					success: async (res) => {
						if (res.confirm) {
							try {
								// TODO 取消订单接口 会在这里使用
								// const response = await cancelOrderApi(order.id)
								// if (response.code === 200) {
								uni.showToast({
									title: '订单已取消',
									icon: 'success'
								})
								this.onRefresh() // 刷新订单列表
								// } else {
								//	uni.showToast({ title: response.msg || '取消订单失败', icon: 'none' })
								// }
							} catch (error) {
								uni.showToast({
									title: '取消订单失败',
									icon: 'none'
								})
							}
						}
					}
				})
			},

			// 继续付款
			payOrder(order) {
				// 跳转到订单详情页面进行支付
				uni.navigateTo({
					url: `/subpackages/order/detail/detail?orderId=${order.id}&orderNumber=${order.orderNumber}`
				})
			},

			// 申请售后
			afterSale(order) {
				// 构建跳转参数
				const params = {
					orderId: order.orderNumber,
					orderItemId: order.id,
					orderStatus: order.status
				}

				// 如果有商品信息，也传递过去
				if (order.products && order.products.length > 0) {
					const product = order.products[0] // 取第一个商品
					params.productName = encodeURIComponent(product.name)
					params.productImage = encodeURIComponent(product.image)
					params.productPrice = product.price
				}

				// 构建URL参数
				const urlParams = Object.keys(params)
					.map(key => `${key}=${params[key]}`)
					.join('&')

				uni.navigateTo({
					url: `/subpackages/order/afterSale/afterSale?${urlParams}`
				})
			},

			// 确认收货
			async confirmReceipt(order) {
				uni.showModal({
					title: '确认收货',
					content: '确认已收到商品吗？确认后订单将完成。',
					success: async (res) => {
						if (res.confirm) {
							try {
								uni.showLoading({
									title: '处理中...'
								})

								// TODO fetchOrderComplete 会在这里使用
								const response = await fetchOrderComplete({
									orderId: order.orderNumber || order.id
								})

								if (response.code === 200) {
									uni.showToast({
										title: '确认收货成功',
										icon: 'success'
									})
									// 刷新订单列表
									setTimeout(() => {
										this.onRefresh()
									}, 200)
								} else {
									throw new Error(response.msg || '确认收货失败')
								}
							} catch (error) {
								console.error('确认收货失败:', error)
								uni.showToast({
									title: error.message || '确认收货失败，请重试',
									icon: 'none'
								})
							} finally {
								uni.hideLoading()
							}
						}
					}
				})
			},

			// 再来一单
			reorder(order) {
				uni.showToast({
					title: '添加到购物车',
					icon: 'success'
				})
			},

			// 查看物流
			viewLogistics(order) {
				uni.navigateTo({
					url: '/subpackages/order/logistics/logistics?orderId=' + order.id
				})
			},

			// 确认收货
			async confirmOrder(order) {
				uni.showModal({
					title: '确认收货',
					content: '确认已收到商品吗？',
					success: async (res) => {
						if (res.confirm) {
							try {
								// TODO 确认收货接口 会在这里使用
								// const response = await confirmReceiptApi(order.id)
								// if (response.code === 200) {
								uni.showToast({
									title: '确认收货成功',
									icon: 'success'
								})
								this.onRefresh() // 刷新订单列表
								// } else {
								//	uni.showToast({ title: response.msg || '确认收货失败', icon: 'none' })
								// }
							} catch (error) {
								uni.showToast({
									title: '确认收货失败',
									icon: 'none'
								})
							}
						}
					}
				})
			},

			// 去评价
			reviewOrder(order) {
				uni.navigateTo({
					url: '/subpackages/order/evaluate/evaluate'
				})
			},

			// 查看订单详情
			viewOrderDetail(order) {
				uni.navigateTo({
					url: `/subpackages/order/ViewOrderInfo/ViewOrderInfo?orderId=${order.orderNumber || order.id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 页面包装器 - 替代BaseContainer */
	.page-wrapper {
		min-height: 100vh;
		background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
		position: relative;
		padding-top: env(safe-area-inset-top);
		/* 顶部安全距离 */
		padding-bottom: env(safe-area-inset-bottom);
		/* 底部安全距离 */
		box-sizing: border-box;
	}

	.order-list-container {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: transparent;
		position: relative;
		overflow: hidden;
		/* 防止容器滚动 */
	}

	/* 固定头部区域 */
	.fixed-header {
		position: fixed;
		top: constant(safe-area-inset-top);
		/* 兼容 iOS < 11.2 */
		top: env(safe-area-inset-top);
		left: 0;
		right: 0;
		z-index: 100;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20rpx);
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
	}

	/* 页面头部 */
	.page-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 24rpx;
		background: #fff;
		border-bottom: 1rpx solid #f0f0f0;

		.header-left,
		.header-right {
			width: 60rpx;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.header-title {
			flex: 1;
			text-align: center;

			text {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
			}
		}
	}

	/* 状态切换标签 */
	.status-tabs {
		background: #fff;
		border-bottom: 1rpx solid #f0f0f0;
		position: relative;

		.tabs-scroll {
			white-space: nowrap;
		}

		.tabs-content {
			display: flex;
			padding: 0 24rpx;
		}

		.tab-item {
			position: relative;
			padding: 24rpx 32rpx;
			margin-right: 40rpx;
			white-space: nowrap;

			text {
				font-size: 28rpx;
				color: #666;
				transition: color 0.3s;
			}

			&.active {
				text {
					color: #89D600;
					font-weight: bold;
				}

				&::after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					width: 40rpx;
					height: 4rpx;
					background: #89D600;
					border-radius: 2rpx;
				}
			}

			&:last-child {
				margin-right: 0;
			}
		}
	}

	/* 订单列表滚动区域 */
	.order-list-scroll {
		flex: 1;
		background: transparent;
		margin-top: 90rpx;
		/* 为固定头部和安全区域留出空间 */
		height: calc(100vh - 180rpx - env(safe-area-inset-top) - env(safe-area-inset-bottom));
		/* 减去固定头部和安全区域的高度 */
		overflow: hidden;
		/* 防止触发外部滚动 */
	}

	.order-list {
		padding: 20rpx;
	}

	/* 订单卡片 */
	.order-item {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 12rpx;
		margin-bottom: 20rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
		backdrop-filter: blur(10rpx);

		.order-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 24rpx;
			border-bottom: 1rpx solid #f0f0f0;

			.order-info {
				flex: 1;
				min-width: 0;

				.order-number-row {
					display: flex;
					align-items: center;
					gap: 8rpx;
					margin-bottom: 8rpx;
				}

				.order-number {
					font-size: 26rpx;
					color: #333;
					max-width: 400rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.order-time {
					font-size: 24rpx;
					color: #999;
				}
			}

			.order-status {
				flex-shrink: 0;
				white-space: nowrap;

				text {
					font-size: 24rpx;
					color: #999;
				}
			}
		}

		.product-section {
			padding: 24rpx;

			.product-item {
				display: flex;
				align-items: flex-start;
				margin-bottom: 20rpx;

				&:last-child {
					margin-bottom: 0;
				}

				.product-img {
					width: 120rpx;
					height: 120rpx;
					border-radius: 8rpx;
					margin-right: 16rpx;
					flex-shrink: 0;
				}

				.product-info {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					min-height: 120rpx;

					.product-name {
						font-size: 28rpx;
						color: #333;
						line-height: 1.4;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						overflow: hidden;
						margin-bottom: 8rpx;
					}

					.product-attr {
						font-size: 24rpx;
						color: #999;
						margin-bottom: 8rpx;
					}

					.product-bottom {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.product-price {
							font-size: 28rpx;
							color: #e54d42;
							font-weight: bold;
						}

						.product-quantity {
							font-size: 24rpx;
							color: #999;
						}
					}
				}
			}
		}

		.order-footer {
			padding: 24rpx;
			border-top: 1rpx solid #f0f0f0;

			.order-total {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 20rpx;

				text {
					font-size: 26rpx;
					color: #666;
				}

				.total-price {
					font-size: 28rpx;
					color: #333;
					font-weight: bold;
				}
			}

			.action-buttons {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				flex-wrap: wrap;
				/* 允许换行 */
				gap: 16rpx;

				.action-btn {
					height: 72rpx;
					padding: 0 32rpx;
					border-radius: 8rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-shrink: 0;
					/* 防止按钮被压缩 */

					text {
						font-size: 26rpx;
					}

					&.secondary {
						background: #fff;
						border: 2rpx solid #ddd;

						text {
							color: #666;
						}
					}

					&.primary {
						background: #89D600;

						text {
							color: #fff;
						}
					}
				}
			}
		}
	}

	/* 加载更多提示 */
	.load-more,
	.no-more {
		text-align: center;
		padding: 40rpx 0;

		text {
			font-size: 26rpx;
			color: #999;
		}
	}

	/* 页面全局样式 */
	page {
		background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
		height: 100vh;
		overflow: hidden;
	}
</style>