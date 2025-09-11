<template>
	<view class="address-list-container">
		<!-- 加载状态 -->
		<view class="loading-state" v-if="loading">
			<u-loading-icon mode="spinner" color="#89D600" size="20"></u-loading-icon>
			<text>加载中...</text>
		</view>

		<!-- 地址列表 -->
		<view class="address-list" v-if="!loading && addressList.length > 0">
			<u-swipe-action>
				<u-swipe-action-item v-for="(item, index) in addressList" :key="index" :options="swipeOptions"
					@click="(e)=>swipeClick(e,item)">
					<view class="address-item" @click="selectAddress(item)">
						<!-- 地址信息 -->
						<view class="address-info">
							<view class="address-header">
								<text class="name">{{ item.name }}</text>
								<text class="phone">{{ item.phone }}</text>
								<view class="default-tag" v-if="item.isDefault">
									<text class="default-text">默认</text>
								</view>
							</view>
							<view class="address-detail">
								<text
									class="address-text">{{ item.province }}{{ item.city }}{{ item.district }}{{ item.detail }}</text>
							</view>
						</view>

						<!-- 设置默认按钮 -->
						<view class="default-section" v-if="!item.isDefault">
							<view class="default-btn" @click.stop="setDefault(item, index)">
								<text class="default-btn-text">设为默认地址</text>
							</view>
						</view>
					</view>
				</u-swipe-action-item>
			</u-swipe-action>
		</view>

		<!-- 空状态 -->
		<view class="empty-state" v-if="!loading && addressList.length === 0">
			<view class="empty-icon">📍</view>
			<view class="empty-text">暂无收货地址</view>
			<view class="empty-desc">添加收货地址，享受便捷购物体验</view>
			<view class="empty-btn" @click="addAddress">
				<text class="empty-btn-text">添加地址</text>
			</view>
		</view>

		<!-- 底部新增按钮 -->
		<view class="bottom-add-btn" v-if="addressList.length > 0" @click="addAddress">
			<text class="bottom-add-text">+ 新增收货地址</text>
		</view>
	</view>
</template>

<script>
	import {
		fetchAddressList,
		setAddressDefault,
		fetchAddressDelete
	} from '@/api/adress/index.js'
	import globalData from '@/utils/globalData.js'

	export default {
		components: {},
		data() {
			return {
				isFromOrder: false, // 是否从订单页面进入
				isFromProfile: false, // 是否从个人页面进入
				addressList: [],
				loading: false,
				timeoutId: null, // 超时定时器ID
				timeoutDuration: 3000, // 超时时间3秒
				swipeOptions: [{
						text: '编辑',
						style: {
							backgroundColor: '#89D600',
							color: '#ffffff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#ff3b30',
							color: '#ffffff'
						}
					}
				]
			}
		},
		onLoad(options) {
			// 判断来源
			this.isFromOrder = options.from === 'order'
			this.isFromProfile = options.from === 'profile'
			this.loadAddressList()
		},
		onShow() {
			// 页面显示时刷新数据，确保编辑后数据是最新的
			this.loadAddressList()
		},
		onUnload() {
			// 页面销毁时清除定时器
			this.clearTimeout()
		},
		methods: {
			// 加载地址列表
			async loadAddressList() {
				if (this.loading) return

				this.loading = true
				this.clearTimeout() // 清除之前的超时定时器

				// 设置超时定时器
				this.timeoutId = setTimeout(() => {
					this.handleTimeout()
				}, this.timeoutDuration)

				try {
					const params = {
						pageNum: 1,
						pageSize: 50
					}

					// TODO fetchAddressList 会在这里使用
					const res = await fetchAddressList(params)
					console.log('地址列表数据:', res)

					// 清除超时定时器
					this.clearTimeout()

					if (res.code == 200 && res.rows) {
						// 处理地址数据，将consigneeAddressPath拆分为省市区
						this.addressList = (res.rows || []).map(item => {
							const addressPath = item.consigneeAddressPath || ''
							const addressParts = addressPath.split(',')

							return {
								id: item.id,
								name: item.name,
								phone: item.mobile,
								province: addressParts[0] || '',
								city: addressParts[1] || '',
								district: addressParts[2] || '',
								detail: item.detail,
								isDefault: item.isDefault === 1,
								consigneeAddressIdPath: item.consigneeAddressIdPath,
								consigneeAddressPath: item.consigneeAddressPath,
								lat: item.lat,
								lon: item.lon
							}
						})
					} else {
						uni.showToast({
							title: res.msg || '获取地址列表失败',
							icon: 'error'
						})
					}
				} catch (error) {
					console.error('获取地址列表失败:', error)
					this.clearTimeout() // 清除超时定时器
					uni.showToast({
						title: '网络错误，请重试',
						icon: 'error'
					})
				} finally {
					this.loading = false
				}
			},

			// 清除超时定时器
			clearTimeout() {
				if (this.timeoutId) {
					clearTimeout(this.timeoutId)
					this.timeoutId = null
				}
			},

			// 处理超时
			handleTimeout() {
				console.log('请求超时，显示空状态')
				this.loading = false
				this.addressList = [] // 清空列表，显示空状态
				uni.showToast({
					title: '网络超时，请重试',
					icon: 'error'
				})
			},

			// 返回上一页
			goBack() {
				uni.navigateBack()
			},

			// 新增地址
			addAddress() {
				uni.navigateTo({
					url: '/subpackages/address/detail/detail'
				})
			},

			// 滑动操作点击事件
			swipeClick(record, item) {
				if (record.index === 0) {
					// 编辑
					this.editAddress(item)
				} else if (record.index === 1) {
					// 删除
					this.confirmDelete(item, record.index)
				}
			},

			// 确认删除
			confirmDelete(item, index) {
				uni.showModal({
					title: '确认删除',
					content: '确定要删除这个收货地址吗？',
					success: (res) => {
						if (res.confirm) {
							this.deleteAddress(item, index)
						}
					}
				})
			},

			// 编辑地址
			editAddress(item) {
				uni.navigateTo({
					url: `/subpackages/address/detail/detail?id=${item.id}`
				})
			},

			// 删除地址
			async deleteAddress(item, index) {
				try {
					// TODO fetchAddressDelete 会在这里使用
					const res = await fetchAddressDelete(item.id)

					if (res.code == 200) {
						uni.showToast({
							title: '删除成功',
							icon: 'success'
						})
						
						// 删除成功后重新加载地址列表，确保界面与服务端同步
						setTimeout(() => {
							this.loadAddressList()
						}, 500)
					} else {
						uni.showToast({
							title: res.msg || '删除失败',
							icon: 'error'
						})
					}
				} catch (error) {
					console.error('删除地址失败:', error)
					uni.showToast({
						title: '网络错误，请重试',
						icon: 'error'
					})
				}
			},

			// 设置默认地址
			async setDefault(item, index) {
				// 先更新前端状态
				this.addressList.forEach(addr => {
					addr.isDefault = false
				})
				this.addressList[index].isDefault = true

				// 显示成功提示
				uni.showToast({
					title: '设置成功',
					icon: 'success'
				})

				// 调用接口通知后台
				try {
					// TODO setAddressDefault 会在这里使用
					const res = await setAddressDefault({
						id: item.id
					})

					if (res.code !== 200) {
						console.error('设置默认地址失败:', res.msg)
					}
				} catch (error) {
					console.error('设置默认地址接口调用失败:', error)
				}
			},

			// 选择地址
			selectAddress(item) {
				if (this.isFromOrder) {
					// 从订单页面进入，选择地址后返回
					// 使用 globalData 存储选中的地址，而不是事件监听
					globalData.selectedAddress = item
					uni.navigateBack()
				} else if (this.isFromProfile) {
					// 从个人页面进入，点击进入编辑模式
					this.editAddress(item)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.address-list-container {
		min-height: 100vh;
		background-color: #f8f9fa;
		padding-bottom: 120rpx;
	}

	// 加载状态样式
	.loading-state {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12rpx;
		padding: 60rpx;
		color: #666;
		font-size: 26rpx;
	}

	// 导航栏样式
	.navbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 88rpx;
		padding: 0 30rpx;
		background-color: #ffffff;
		border-bottom: 1rpx solid #f0f0f0;
		position: sticky;
		top: 0;
		z-index: 100;

		.navbar-left {
			width: 60rpx;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.icon-back {
				font-size: 40rpx;
				color: #333;
				font-weight: bold;
			}
		}

		.navbar-title {
			font-size: 32rpx;
			font-weight: 600;
			color: #333;
		}

		.navbar-right {
			.add-text {
				font-size: 28rpx;
				color: #89D600;
				font-weight: 500;
			}
		}
	}

	// 地址列表样式
	.address-list {
		padding: 20rpx;
	}

	.address-item {
		background-color: #ffffff;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
		padding: 30rpx;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
		position: relative;

		.address-info {
			margin-bottom: 20rpx;

			.address-header {
				display: flex;
				align-items: center;
				margin-bottom: 16rpx;

				.name {
					font-size: 32rpx;
					font-weight: 600;
					color: #333;
					margin-right: 20rpx;
				}

				.phone {
					font-size: 28rpx;
					color: #666;
					flex: 1;
				}

				.default-tag {
					background: linear-gradient(135deg, #89D600, #9EE600);
					padding: 4rpx 12rpx;
					border-radius: 20rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					.default-text {
						font-size: 20rpx;
						color: #ffffff;
						font-weight: 500;
					}
				}
			}

			.address-detail {
				.address-text {
					font-size: 28rpx;
					color: #666;
					line-height: 1.5;
				}
			}
		}

		.default-section {
			margin-top: 20rpx;
			padding-top: 20rpx;
			border-top: 1rpx solid #f0f0f0;

			.default-btn {
				width: 100%;
				height: 72rpx;
				background: linear-gradient(135deg, #4caf50, #66bb6a);
				border-radius: 36rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all 0.3s ease;

				&:active {
					transform: scale(0.98);
				}

				.default-btn-text {
					font-size: 28rpx;
					color: #ffffff;
					font-weight: 500;
				}
			}
		}
	}

	// 空状态样式
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 120rpx 60rpx;
		text-align: center;

		.empty-icon {
			font-size: 120rpx;
			margin-bottom: 30rpx;
			opacity: 0.6;
		}

		.empty-text {
			font-size: 32rpx;
			color: #333;
			font-weight: 600;
			margin-bottom: 16rpx;
		}

		.empty-desc {
			font-size: 26rpx;
			color: #999;
			margin-bottom: 40rpx;
			line-height: 1.5;
		}

		.empty-btn {
			background: linear-gradient(135deg, #89D600, #9EE600);
			padding: 24rpx 60rpx;
			border-radius: 40rpx;
			transition: all 0.3s ease;

			&:active {
				transform: scale(0.95);
			}

			.empty-btn-text {
				font-size: 28rpx;
				color: #ffffff;
				font-weight: 500;
			}
		}
	}

	// 底部新增按钮
	.bottom-add-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #ffffff;
		padding: 20rpx 30rpx;
		padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
		border-top: 1rpx solid #f0f0f0;
		box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.05);

		.bottom-add-text {
			display: block;
			width: 100%;
			height: 88rpx;
			background: linear-gradient(135deg, #89D600, #9EE600);
			border-radius: 44rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
			color: #ffffff;
			font-weight: 600;
			transition: all 0.3s ease;

			&:active {
				transform: scale(0.98);
			}
		}
	}
</style>