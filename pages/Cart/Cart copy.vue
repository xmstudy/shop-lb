<template>
	<BaseContainer
		:Bglinear="{ background: 'linear-gradient(to bottom, #a6e22e 0%, #a6e22e 50%, #fff 85%,#fff 100%)' }">
		<!-- 顶部Header -->
		<view class="cart-header">
			<view class="cart-header-title">购物车</view>
			<view class="cart-header-right" @click="toggleManageMode">
				<text class="manage-text">{{ isManageMode ? '完成' : '管理' }}</text>
			</view>
		</view>

		<!-- 商品列表区 -->
		<scroll-view class="cart-list" scroll-y>
			<!-- 空状态 -->
			<view v-if="cartItems.length === 0 && !loading" class="empty-cart">
				<text class="empty-text">暂无商品~</text>
				<view class="empty-btn" @click="goToHome">去逛逛</view>
			</view>

			<!-- 商品列表 -->
			<view v-else>
				<view class="cart-item" v-for="item in cartItems" :key="item.skuId"
					@click="goToProductDetail(item.goodsId)" :class="{ 'invalid-item': !item.isValid }">
					<view class="cart-item-checkbox" :class="{ selected: selectedItems.includes(item.skuId) }"
						@click.stop="toggleSelect(item.skuId)"></view>
					<image class="cart-item-img" :src="item.goodsImage" mode="aspectFill"></image>
					<view class="cart-item-info">
						<view class="cart-item-row">
							<view class="cart-item-title">{{ item.goodsName }}</view>
							<view class="cart-item-desc">{{ formatSpecs(item.specs) }}</view>
						</view>
						<view class="cart-item-bottom">
							<view class="cart-item-price">¥<text
									class="cart-item-price-num">{{ item.goodsPrice }}</text></view>
							<view class="cart-item-qty">
								<view class="qty-btn" @click.stop="decreaseQty(item)"
									:class="{ disabled: item.goodsNum <= 1 || !item.isValid }">-</view>
								<view class="qty-num">{{ item.goodsNum }}</view>
								<view class="qty-btn" @click.stop="increaseQty(item)" :class="{ disabled: !item.isValid }">+</view>
							</view>
						</view>
						<!-- 无效商品提示 -->
						<view v-if="!item.isValid" class="invalid-item-tip">
							<text class="invalid-text">{{ item.errorMsg || '商品已下架或库存不足' }}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- 底部操作栏 -->
		<view class="cart-bottom-bar">
			<view class="cart-bottom-left">
							<view class="cart-bottom-checkbox"
				:class="{ selected: selectedItems.length === cartItems.length && cartItems.length > 0 }"
				@click="toggleSelectAll"></view>
				<text class="cart-bottom-label">全选</text>
			</view>
			<view class="cart-bottom-right">
				<!-- 正常模式：显示合计和结算 -->
				<template v-if="!isManageMode">
					<view class="cart-bottom-total">合计: <text class="cart-bottom-price">¥<text
								class="cart-bottom-price-num">{{ totalPrice }}</text></text></view>
					<view class="cart-bottom-btn cart-bottom-btn-checkout" @click="checkout">
						结算 <text class="cart-bottom-badge">({{ selectedValidItemsCount }})</text>
					</view>
				</template>
				<!-- 管理模式：显示删除按钮 -->
				<template v-else>
					<view class="cart-bottom-delete" @click="deleteSelected">
						删除
					</view>
				</template>
			</view>
		</view>
	</BaseContainer>
</template>

<script>
	import BaseContainer from '@/components/BaseWrapper.vue'
	import {
		fetchCartList,
		changeCartNum,
		deleteCart
	} from '@/api/cart/index.js'
	import {
		fetchOrderPreview
	} from '@/api/orders/index.js'
	import globalData from '@/utils/globalData.js'

	export default {
		name: 'Cart',
		components: {
			BaseContainer
		},
		data() {
			return {
				selectedItems: [],
				isManageMode: false,
				cartItems: [], // 购物车商品列表
				loading: false
			}
		},
		computed: {
			// 计算选中商品的总价格
			totalPrice() {
				return this.selectedItems.reduce((total, skuId) => {
					const item = this.cartItems.find(cartItem => cartItem.skuId === skuId)
					// 只计算有效商品的价格
					return total + (item && item.isValid ? item.goodsPrice * item.goodsNum : 0)
				}, 0)
			},
			// 获取有效商品列表
			validItems() {
				return this.cartItems.filter(item => item.isValid)
			},
			// 获取选中的有效商品数量
			selectedValidItemsCount() {
				return this.cartItems.filter(item => 
					this.selectedItems.includes(item.skuId) && item.isValid
				).length
			}
		},
		onShow() {
			// 每次页面显示时获取购物车数据
			console.log('Cart页面 onShow 被调用')
			this.getCartList()
		},
		mounted() {
			console.log('Cart页面 mounted 被调用')
			this.getCartList()
		},
		// 监听组件显示状态
		watch: {
			// 监听父组件传递的显示状态
			'$parent.currentTab': {
				handler(newVal) {
					console.log('Tab切换:', newVal)
					if (newVal === 2) {
						console.log('购物车Tab被激活')
						this.getCartList()
					}
				},
				immediate: true
			}
		},
		methods: {
			// 获取商品列表
			async getCartList() {
				console.log('getCartList 方法开始执行')
				try {
					this.loading = true

					// TODO fetchCartList 会在这里使用
					const res = await fetchCartList()
					console.log('购物车数据:', res)

					if (res.code === 200 && res.data) {
						// 根据新的数据结构，使用 cartSkus 字段
						this.cartItems = res.data.cartSkus || []
						console.log('商品数据已设置:', this.cartItems)
					} else {
						this.cartItems = []
						console.log('购物车为空或获取失败')
					}
				} catch (error) {
					console.error('获取商品列表失败:', error)
					uni.showToast({
						title: '获取商品失败',
						icon: 'error'
					})
					this.cartItems = []
				} finally {
					this.loading = false
				}
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

			// 跳转到商品详情页
			goToProductDetail(goodsId) {
				uni.navigateTo({
					url: `/subpackages/goods/detail/detail?id=${goodsId}`
				})
			},

			// 切换商品选中状态
			toggleSelect(skuId) {
				const index = this.selectedItems.indexOf(skuId)
				if (index > -1) {
					this.selectedItems.splice(index, 1)
				} else {
					this.selectedItems.push(skuId)
				}
			},

			// 减少商品数量
			async decreaseQty(item) {
				// 检查商品是否有效
				if (!item.isValid) {
					uni.showToast({
						title: '商品已失效，无法修改数量',
						icon: 'none'
					})
					return
				}
				
				if (item.goodsNum > 1) {
					try {
						// TODO changeCartNum 会在这里使用
						await changeCartNum({
							skuId: item.skuId,
							goodsNum: item.goodsNum - 1
						})

						// 更新本地数据
						item.goodsNum--
					} catch (error) {
						console.error('更新数量失败:', error)
						uni.showToast({
							title: '更新失败',
							icon: 'error'
						})
					}
				}
			},

			// 增加商品数量
			async increaseQty(item) {
				// 检查商品是否有效
				if (!item.isValid) {
					uni.showToast({
						title: '商品已失效，无法修改数量',
						icon: 'none'
					})
					return
				}
				
				try {
					// TODO changeCartNum 会在这里使用
					await changeCartNum({
						skuId: item.skuId,
						goodsNum: item.goodsNum + 1
					})

					// 更新本地数据
					item.goodsNum++
				} catch (error) {
					console.error('更新数量失败:', error)
					uni.showToast({
						title: '更新失败',
						icon: 'error'
					})
				}
			},

			// 切换管理模式
			toggleManageMode() {
				this.isManageMode = !this.isManageMode
				if (!this.isManageMode) {
					// 退出管理模式时清空选中项
					this.selectedItems = []
				}
			},

			// 全选/取消全选
			toggleSelectAll() {
				const allSkuIds = this.cartItems.map(item => item.skuId)
				const selectedItems = this.selectedItems

				if (selectedItems.length === allSkuIds.length && allSkuIds.length > 0) {
					// 如果全部商品都选中，则取消全选
					this.selectedItems = []
				} else {
					// 否则全选所有商品（包括失效商品）
					this.selectedItems = allSkuIds
				}
			},

			// 删除选中商品
			async deleteSelected() {
				if (this.selectedItems.length === 0) {
					uni.showToast({
						title: '请选择要移除的商品',
						icon: 'none'
					})
					return
				}

				uni.showModal({
					title: '确认移除',
					content: `确定要移除选中的${this.selectedItems.length}件商品吗？`,
					success: async (res) => {
						if (res.confirm) {
							try {
								// TODO deleteCart 会在这里使用
								const skuIds = this.selectedItems.join(',')
								await deleteCart(skuIds)

								// 重新获取购物车数据
								await this.getCartList()
								
								this.selectedItems = []
								this.isManageMode = false

								uni.showToast({
									title: '移除成功',
									icon: 'success'
								})
							} catch (error) {
								console.error('移除失败:', error)
								uni.showToast({
									title: '移除失败',
									icon: 'error'
								})
							}
						}
					}
				})
			},

			// 跳转到首页
			goToHome() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},

			// 预览订单
			// previewOrder() {
			// 	uni.navigateTo({
			// 		url: '/pages/order/preview/preview'
			// 	})
			// }

			// 结算
			async checkout() {
				if (this.selectedItems.length === 0) {
					uni.showToast({
						title: '请选择要结算的商品',
						icon: 'none'
					})
					return
				}

				try {
					// 获取选中的有效商品信息
					const selectedGoods = this.cartItems.filter(item => 
						this.selectedItems.includes(item.skuId) && item.isValid
					)

					// 检查是否有无效商品被选中
					const invalidSelectedGoods = this.cartItems.filter(item => 
						this.selectedItems.includes(item.skuId) && !item.isValid
					)

					if (invalidSelectedGoods.length > 0) {
						uni.showModal({
							title: '提示',
							content: '选中的商品中包含无效商品，将自动移除无效商品后结算',
							showCancel: false,
							success: () => {
								// 重新过滤有效商品
								const validSelectedGoods = this.cartItems.filter(item => 
									this.selectedItems.includes(item.skuId) && item.isValid
								)
								
								if (validSelectedGoods.length === 0) {
									uni.showToast({
										title: '没有可结算的有效商品',
										icon: 'none'
									})
									return
								}

								this.processCheckout(validSelectedGoods)
							}
						})
						return
					}

					this.processCheckout(selectedGoods)
				} catch (error) {
					console.error('跳转订单页面失败:', error)
					uni.showToast({
						title: '跳转失败',
						icon: 'error'
					})
				}
			},

			// 处理结算逻辑
			processCheckout(selectedGoods) {
				// 构建订单数据（符合接口要求的格式）
				const orderData = {
					goodsList: selectedGoods.map(item => ({
						skuId: item.skuId,
						goodsNum: item.goodsNum
					})),
					orderType: 1, // 普通订单
					promotionId: null // 无促销活动
				}

				// 存入全局
				globalData.orderData = orderData

				// 跳转到订单确认页面
				uni.navigateTo({
					url: '/subpackages/order/detail/detail'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cart-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: linear-gradient(90deg, #a6e22e 0%, #7ed957 100%);
		padding: 0 20rpx;
		height: 100rpx;
		border-radius: 0 0 24rpx 24rpx;
		margin-bottom: 18rpx;
		box-shadow: 0 2rpx 8rpx rgba(166, 226, 46, 0.08);
	}

	.cart-header-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #fff;
		letter-spacing: 2rpx;
	}

	.cart-header-left,
	.cart-header-right {
		font-size: 26rpx;
		color: #fff;
	}

	.cart-list {
		/* 移除背景色和圆角 */
		padding: 24rpx 0 24rpx 0;
		min-height: 400rpx;
		max-height: 60vh;
		overflow-y: auto;
	}

	/* 空状态样式 */
	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 120rpx 40rpx;
		text-align: center;
	}

	.empty-icon {
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 40rpx;
		opacity: 0.6;
	}

	.empty-text {
		font-size: 32rpx;
		color: #999;
		margin-bottom: 60rpx;
	}

	.empty-btn {
		background: linear-gradient(90deg, #a6e22e 0%, #7ed957 100%);
		color: #fff;
		font-size: 28rpx;
		font-weight: bold;
		padding: 20rpx 60rpx;
		border-radius: 40rpx;
		box-shadow: 0 4rpx 12rpx rgba(166, 226, 46, 0.3);
		transition: all 0.3s ease;
	}

	.empty-btn:active {
		transform: scale(0.95);
		box-shadow: 0 2rpx 8rpx rgba(166, 226, 46, 0.4);
	}

	.cart-item {
		display: flex;
		align-items: flex-start;
		background: #fff;
		border-radius: 18rpx;
		box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.06);
		margin: 0 24rpx 24rpx 24rpx;
		padding: 20rpx 16rpx;
		position: relative;
		cursor: pointer;
		transition: all 0.2s ease;

		&:active {
			transform: scale(0.98);
			box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
		}

		&.invalid-item {
			background: #f8f8f8;
			
			.cart-item-title {
				color: #999;
			}
			
			.cart-item-price-num {
				color: #999;
			}
			
			.cart-item-checkbox {
				opacity: 1; /* 确保复选框不受影响 */
			}
		}
	}

	.cart-item-checkbox {
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		border: 2rpx solid #a6e22e;
		margin-right: 18rpx;
		margin-top: 18rpx;
		background: #fff;
		position: relative;
		transition: all 0.2s ease;

		&.selected {
			background: #a6e22e;
			border-color: #a6e22e;

			&::after {
				content: '';
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 16rpx;
				height: 16rpx;
				background: #fff;
				border-radius: 50%;
			}
		}
	}

	.cart-item-img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 12rpx;
		object-fit: cover;
		background: #f5f5f5;
		margin-right: 18rpx;
	}

	.cart-item-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-width: 0;
	}

	.cart-item-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 6rpx;
	}

	.cart-item-title {
		font-size: 30rpx;
		font-weight: bold;
		color: #222;
	}

	.cart-item-desc {
		font-size: 22rpx;
		color: #888;
		margin-left: 16rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.cart-item-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.cart-item-price {
		font-size: 28rpx;
		font-weight: normal;
		color: #222;
	}

	.cart-item-price-num {
		font-size: 28rpx;
		color: #2e7d32;
		font-weight: bold;
	}

	.cart-item-qty {
		display: flex;
		align-items: center;
		background: #f0f8e0;
		border-radius: 999px;
		padding: 4rpx 12rpx;
		gap: 8rpx;

		&.disabled {
			background: #f5f5f5;
			opacity: 0.6;
		}
	}

	.qty-btn {
		width: 36rpx;
		height: 36rpx;
		background: #d0f5a3;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #2e7d32;
		font-weight: bold;
		transition: all 0.2s ease;

		&.disabled {
			background: #f0f0f0;
			color: #ccc;
		}
	}

	.qty-num {
		font-size: 26rpx;
		color: #333;
		min-width: 32rpx;
		text-align: center;
	}

	/* 无效商品提示 */
	.invalid-item-tip {
		margin: 8rpx 0;
		padding: 8rpx 12rpx;
		background: #fff2f0;
		border-radius: 8rpx;
		border-left: 4rpx solid #ff4d4f;
	}

	.invalid-text {
		font-size: 22rpx;
		color: #ff4d4f;
	}

	.cart-bottom-bar {
		background: #f6ffe8;
		border-top: 1rpx solid #eafad7;
		box-shadow: 0 -2rpx 8rpx rgba(166, 226, 46, 0.08);
		padding: 18rpx 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 180rpx;
		z-index: 10;
	}

	.cart-bottom-left {
		display: flex;
		align-items: center;
		gap: 10rpx;
	}

	.cart-bottom-checkbox {
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		border: 2rpx solid #a6e22e;
		background: #fff;
		position: relative;
		transition: all 0.2s ease;

		&.selected {
			background: #a6e22e;
			border-color: #a6e22e;

			&::after {
				content: '';
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 16rpx;
				height: 16rpx;
				background: #fff;
				border-radius: 50%;
			}
		}
	}

	.cart-bottom-label {
		font-size: 26rpx;
		color: #2e7d32;
	}

	.cart-bottom-right {
		display: flex;
		align-items: center;
		gap: 18rpx;
	}

	.cart-bottom-total {
		font-size: 28rpx;
		color: #333;
		font-weight: bold;
	}

	.cart-bottom-price {
		color: #333;
		font-weight: normal;
		font-size: 24rpx;
	}

	.cart-bottom-price-num {
		font-size: 22rpx;
		color: #e54d42;
		font-weight: bold;
	}

	.cart-bottom-actions {
		display: flex;
		gap: 18rpx;
	}

	.cart-bottom-btn {
		background: linear-gradient(90deg, #a6e22e 0%, #7ed957 100%);
		color: #fff;
		font-size: 28rpx;
		font-weight: bold;
		border-radius: 18rpx;
		padding: 12rpx 36rpx;
		position: relative;
		display: flex;
		align-items: center;
		transition: all 0.2s ease;

		&:active {
			transform: scale(0.95);
		}
	}

	.cart-bottom-btn-coupon {
		// 已废弃，无需样式
	}

	.cart-bottom-btn-checkout {
		background: linear-gradient(90deg, #e54d42 0%, #ff6b6b 100%);
		color: #fff;
		font-size: 28rpx;
		font-weight: bold;
		border-radius: 18rpx;
		padding: 12rpx 36rpx;
		position: relative;
		display: flex;
		align-items: center;
		transition: all 0.2s ease;

		&:active {
			transform: scale(0.95);
		}
	}

	.cart-bottom-badge {
		background: #fff;
		color: #2e7d32;
		border-radius: 999px;
		font-size: 22rpx;
		margin-left: 8rpx;
		padding: 2rpx 10rpx;
	}

	.cart-bottom-delete {
		background: linear-gradient(90deg, #e54d42 0%, #ff6b6b 100%);
		color: #fff;
		font-size: 28rpx;
		font-weight: bold;
		border-radius: 18rpx;
		padding: 12rpx 36rpx;
		position: relative;
		display: flex;
		align-items: center;
		transition: all 0.2s ease;

		&:active {
			transform: scale(0.95);
		}

		.cart-bottom-badge {
			background: #fff;
			color: #e54d42;
		}
	}

	.manage-text {
		font-size: 26rpx;
		color: #fff;
		font-weight: 500;
	}
</style>