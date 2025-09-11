<template>
	<view class="logistics-container">
		<!-- 物流信息卡片 -->
		<view class="logistics-card">
			<view class="card-header">
				<view class="order-info">
					<text class="order-number">订单号：{{ orderInfo.orderNumber }}</text>
					<text class="order-time">{{ orderInfo.createTime }}</text>
				</view>
				<view class="delivery-status">
					<text class="status-text">{{ logisticsInfo.status }}</text>
				</view>
			</view>

			<view class="delivery-info">
				<view class="info-item">
					<text class="label">物流公司：</text>
					<text class="value">{{ logisticsInfo.company }}</text>
				</view>
				<view class="info-item">
					<text class="label">运单号：</text>
					<text class="value">{{ orderInfo.orderNumber  }}</text>
					<view class="copy-btn" @click="copyTrackingNumber(orderInfo.orderNumber )">
						<text>复制</text>
					</view>
				</view>
				<view class="info-item" v-if="logisticsInfo.estimatedTime">
					<text class="label">预计送达：</text>
					<text class="value estimated">{{ logisticsInfo.estimatedTime }}</text>
				</view>
			</view>
		</view>

		<!-- 物流轨迹 -->
		<view class="logistics-timeline">
			<view class="timeline-header">
				<text class="title">物流轨迹</text>
				<view class="timeline-count">
					<text>{{ logisticsInfo.traces.length }}条记录</text>
				</view>
			</view>

			<view class="timeline-content">
				<view class="timeline-list">
					<view 
						class="timeline-item" 
						v-for="(trace, index) in displayTraces" 
						:key="index"
						:class="{ active: index === 0 }"
					>
						<view class="timeline-dot">
							<view class="dot-inner"></view>
						</view>
						<view class="timeline-line" v-if="index < displayTraces.length - 1"></view>
						<view class="timeline-content">
							<view class="timeline-title">{{ trace.content }}</view>
							<view class="timeline-desc">{{ trace.time }} | {{ trace.location }}</view>
						</view>
					</view>
				</view>

				<!-- 查看更多按钮 -->
				<view class="view-more-btn" v-if="logisticsInfo.traces.length > 3 && !showAllTraces"
					@click="toggleTraces">
					<text>查看更多轨迹</text>
					<u-icon name="arrow-down" color="#89D600" size="16"></u-icon>
				</view>
				<view class="view-more-btn" v-if="logisticsInfo.traces.length > 3 && showAllTraces"
					@click="toggleTraces">
					<text>收起</text>
					<u-icon name="arrow-up" color="#89D600" size="16"></u-icon>
				</view>
			</view>
		</view>

		<!-- 收货地址 -->
		<view class="address-info">
			<view class="address-header">
				<text class="title">收货地址</text>
			</view>
			<view class="address-content">
				<view class="address-item">
					<u-icon name="map" color="#89D600" size="20"></u-icon>
					<view class="address-details">
						<view class="receiver">
							<text class="name">{{ orderInfo.receiver.name }}</text>
							<text class="phone">{{ orderInfo.receiver.phone }}</text>
						</view>
						<view class="address">
							<text>{{ orderInfo.receiver.address }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import BaseContainer from '@/components/BaseWrapper.vue'
	import { fetchOrderDetail, fetchLogisticsTrace } from '@/api/orders/index.js'

	export default {
		name: 'Logistics',
		components: {
			BaseContainer
		},
	data() {
		return {
			showAllTraces: false,
			loading: false,
			orderId: '', // 从路由参数获取
			orderInfo: {
				orderNumber: '',
				createTime: '',
				receiver: {
					name: '',
					phone: '',
					address: ''
				}
			},
			logisticsInfo: {
				status: '',
				company: '',
				trackingNumber: '',
				estimatedTime: '',
				traces: []
			},
			activeColor: '#89D600',
			inactiveColor: '#ddd',
			dotColor: '#89D600'
		}
	},
		computed: {
			displayTraces() {
				return this.showAllTraces ?
					this.logisticsInfo.traces :
					this.logisticsInfo.traces.slice(0, 3)
			}
		},
	onLoad(options) {
		// TODO 缺少物流的接口请求url
		// 获取订单ID
		if (options.orderId) {
			this.orderId = options.orderId
			this.loadOrderDetail()
		} else {
			uni.showToast({
				title: '订单ID不能为空',
				icon: 'none'
			})
			setTimeout(() => {
				uni.navigateBack()
			}, 1500)
		}
	},
		methods: {
			// 返回上一页
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},

		// 刷新物流信息
		refreshLogistics() {
			this.loadOrderDetail()
		},

			// 复制运单号
			copyTrackingNumber(order) {
				uni.setClipboardData({
					data: order,
					success: () => {
						uni.showToast({
							title: '运单号已复制',
							icon: 'success'
						})
					}
				})
			},

			// 切换显示轨迹
			toggleTraces() {
				this.showAllTraces = !this.showAllTraces
			},

		// 加载订单详情
		async loadOrderDetail() {
			if (!this.orderId) {
				uni.showToast({
					title: '订单ID不能为空',
					icon: 'none'
				})
				return
			}

			this.loading = true
			uni.showLoading({
				title: '加载中...'
			})

			try {
				// TODO fetchOrderDetail 会在这里使用
				const response = await fetchOrderDetail(this.orderId)
				
				if (response.code === 200 && response.data) {
					this.processOrderData(response.data)
					await this.loadLogisticsTrace() // 加载物流轨迹
				} else {
					throw new Error(response.msg || '获取订单详情失败')
				}
			} catch (error) {
				console.error('加载订单详情失败:', error)
				uni.showToast({
					title: error.message || '加载失败，请重试',
					icon: 'none'
				})
			} finally {
				this.loading = false
				uni.hideLoading()
			}
		},

		// 处理订单数据
		processOrderData(orderData) {
			// 处理订单基本信息
			this.orderInfo = {
				orderNumber: orderData.orderId || '',
				createTime: orderData.createTime || '',
				receiver: {
					name: orderData.consigneeName || '',
					phone: this.formatPhone(orderData.consigneeMobile || ''),
					address: this.formatAddress(orderData)
				}
			}

			// 处理物流信息
			this.logisticsInfo = {
				status: this.getDeliveryStatusText(orderData.deliverStatus, orderData.status),
				company: orderData.logisticsName || '暂无物流信息',
				trackingNumber: orderData.logisticsNo || '暂无运单号',
				estimatedTime: this.getEstimatedTime(orderData.logisticsTime),
				traces: [] // 物流轨迹需要单独接口获取
			}
		},

		// 格式化手机号
		formatPhone(phone) {
			if (!phone || phone.length < 11) return phone
			return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
		},

		// 格式化收货地址
		formatAddress(orderData) {
			const addressParts = []
			
			if (orderData.consigneeAddressPath) {
				addressParts.push(orderData.consigneeAddressPath)
			}
			
			if (orderData.consigneeDetail) {
				addressParts.push(orderData.consigneeDetail)
			}
			
			return addressParts.join(' ') || '暂无收货地址'
		},

		// 获取配送状态文本
		getDeliveryStatusText(deliverStatus, orderStatus) {
			// deliverStatus: 1.未发货 2.已发货 3.已收货
			// orderStatus: 10.待付款 11.已付款 20.待发货 30.待收货 40.已完成 50.已取消
			
			if (orderStatus === 50) return '订单已取消'
			if (orderStatus === 40) return '已完成'
			
			switch (deliverStatus) {
				case 1:
					return '待发货'
				case 2:
					return '运输中'
				case 3:
					return '已收货'
				default:
					return '状态未知'
			}
		},

		// 获取预计送达时间
		getEstimatedTime(logisticsTime) {
			if (!logisticsTime) return ''
			
			try {
				const shipDate = new Date(logisticsTime)
				const estimatedDate = new Date(shipDate.getTime() + 2 * 24 * 60 * 60 * 1000) // 发货后2天
				const month = estimatedDate.getMonth() + 1
				const day = estimatedDate.getDate()
				return `预计${month}月${day}日送达`
			} catch (error) {
				return ''
			}
		},

		// 加载物流轨迹
		async loadLogisticsTrace() {
			try {
				// TODO fetchLogisticsTrace 会在这里使用
				const traceResponse = await fetchLogisticsTrace({
					id: this.orderId,
					type: 1
				})
				
				if (traceResponse.code === 200 && traceResponse.data) {
					const logisticsData = traceResponse.data
					
					// 更新物流公司信息
					if (logisticsData.shipper) {
						this.logisticsInfo.company = logisticsData.shipper
					}
					
					// 处理物流轨迹数据
					this.logisticsInfo.traces = this.processTraceData(logisticsData.traces || [])
				} else {
					console.warn('获取物流轨迹失败:', traceResponse.msg)
					// 使用默认的空轨迹
					this.setDefaultTraces()
				}
			} catch (error) {
				console.error('获取物流轨迹失败:', error)
				// 使用默认轨迹，不显示错误提示
				this.setDefaultTraces()
			}
		},

		// 处理物流轨迹数据
		processTraceData(traces) {
			if (!traces || traces.length === 0) {
				return []
			}

			// 按时间倒序排列（最新的在前面）
			const sortedTraces = traces.sort((a, b) => b.time - a.time)

			return sortedTraces.map(trace => ({
				time: this.formatTraceTime(trace.time),
				content: trace.desc || '物流信息更新',
				location: trace.areaName || '',
				status: trace.logisticsStatus || '',
				subStatus: trace.subLogisticsStatus || ''
			}))
		},

		// 格式化轨迹时间
		formatTraceTime(timestamp) {
			if (!timestamp) return ''
			
			try {
				const date = new Date(timestamp * 1000) // 时间戳转换为毫秒
				const year = date.getFullYear()
				const month = String(date.getMonth() + 1).padStart(2, '0')
				const day = String(date.getDate()).padStart(2, '0')
				const hours = String(date.getHours()).padStart(2, '0')
				const minutes = String(date.getMinutes()).padStart(2, '0')
				
				return `${year}-${month}-${day} ${hours}:${minutes}`
			} catch (error) {
				console.error('时间格式化失败:', error)
				return ''
			}
		},

		// 设置默认轨迹（当没有物流信息时）
		setDefaultTraces() {
			this.logisticsInfo.traces = [
				{
					time: new Date().toLocaleString(),
					content: '订单已生成，等待发货',
					location: '发货地',
					status: '',
					subStatus: ''
				}
			]
		}
		}
	}
</script>

<style lang="scss" scoped>
	.logistics-container {
		min-height: 100vh;
		background: #f5f5f5;
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

	/* 物流信息卡片 */
	.logistics-card {
		background: #fff;
		margin: 20rpx;
		border-radius: 12rpx;
		overflow: hidden;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);

		.card-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 24rpx;
			border-bottom: 1rpx solid #f0f0f0;

			.order-info {
				.order-number {
					display: inline-block;
					font-size: 26rpx;
					max-width: 260rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					color: #333;
					margin-right: 16rpx;
				}

				.order-time {
					font-size: 24rpx;
					color: #999;
				}
			}

			.delivery-status {
				.status-text {
					font-size: 26rpx;
					color: #89D600;
					font-weight: bold;
				}
			}
		}

		.delivery-info {
			padding: 24rpx;

			.info-item {
				display: flex;
				align-items: center;
				margin-bottom: 16rpx;

				&:last-child {
					margin-bottom: 0;
				}

				.label {
					font-size: 26rpx;
					color: #666;
					width: 140rpx;
					flex-shrink: 0;
				}

				.value {
					flex: 1;
					font-size: 26rpx;
					color: #333;

					&.estimated {
						color: #e54d42;
						font-weight: bold;
					}
				}

				.copy-btn {
					margin-left: 16rpx;
					padding: 8rpx 16rpx;
					background: #89D600;
					border-radius: 6rpx;

					text {
						font-size: 22rpx;
						color: #fff;
					}
				}
			}
		}
	}

	/* 物流轨迹 */
	.logistics-timeline {
		background: #fff;
		margin: 20rpx;
		border-radius: 12rpx;
		overflow: hidden;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);

		.timeline-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 24rpx;
			border-bottom: 1rpx solid #f0f0f0;

			.title {
				font-size: 28rpx;
				color: #333;
				font-weight: bold;
			}

			.timeline-count {
				text {
					font-size: 24rpx;
					color: #999;
				}
			}
		}

			.timeline-content {
		padding: 24rpx;

		.timeline-list {
			.timeline-item {
				position: relative;
				display: flex;
				align-items: flex-start;
				margin-bottom: 32rpx;

				&:last-child {
					margin-bottom: 0;
				}

				&.active {
					.timeline-dot {
						background: #89D600;
						border-color: #89D600;

						.dot-inner {
							background: #fff;
						}
					}

					.timeline-title {
						color: #333;
						font-weight: bold;
					}
				}

				.timeline-dot {
					width: 24rpx;
					height: 24rpx;
					border-radius: 50%;
					background: #ddd;
					border: 4rpx solid #f0f0f0;
					margin-right: 20rpx;
					margin-top: 8rpx;
					flex-shrink: 0;
					position: relative;
					z-index: 2;

					.dot-inner {
						width: 8rpx;
						height: 8rpx;
						border-radius: 50%;
						background: #ddd;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}
				}

				.timeline-line {
					position: absolute;
					left: 12rpx;
					top: 32rpx;
					width: 2rpx;
					height: calc(100% + 16rpx);
					background: #f0f0f0;
					z-index: 1;
				}

				.timeline-content {
					flex: 1;
					padding-bottom: 16rpx;

					.timeline-title {
						font-size: 28rpx;
						color: #666;
						line-height: 1.4;
						margin-bottom: 8rpx;
					}

					.timeline-desc {
						font-size: 24rpx;
						color: #999;
						line-height: 1.3;
					}
				}
			}
		}

		.view-more-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 8rpx;
			margin-top: 24rpx;
			padding: 16rpx;
			border: 2rpx solid #f0f0f0;
			border-radius: 8rpx;

			text {
				font-size: 26rpx;
				color: #89D600;
			}
		}
	}
	}

	/* 收货地址 */
	.address-info {
		background: #fff;
		margin: 20rpx;
		border-radius: 12rpx;
		overflow: hidden;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);

		.address-header {
			padding: 24rpx;
			border-bottom: 1rpx solid #f0f0f0;

			.title {
				font-size: 28rpx;
				color: #333;
				font-weight: bold;
			}
		}

		.address-content {
			padding: 24rpx;

			.address-item {
				display: flex;
				align-items: flex-start;
				gap: 16rpx;

				.address-details {
					flex: 1;

					.receiver {
						display: flex;
						align-items: center;
						margin-bottom: 8rpx;

						.name {
							font-size: 28rpx;
							color: #333;
							font-weight: bold;
							margin-right: 16rpx;
						}

						.phone {
							font-size: 26rpx;
							color: #666;
						}
					}

					.address {
						text {
							font-size: 26rpx;
							color: #333;
							line-height: 1.4;
						}
					}
				}
			}
		}
	}

	/* 时间轴动画效果 */
.timeline-item {
	transition: all 0.3s ease;
}

.timeline-dot {
	transition: all 0.3s ease;
}

.timeline-title {
	transition: color 0.3s ease;
}
</style>