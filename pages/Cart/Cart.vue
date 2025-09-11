<template>
	<view class="cart-page">
		<!-- 固定顶部标题栏 -->
		<view class="cart-header" :style="headerStyle">
			<view class="header-content">
				<text class="header-title">购物车</text>
				<view class="header-right">
					<u-icon name="more-dot-fill" size="20" color="#333"></u-icon>
					<u-icon name="scan" size="20" color="#333" style="margin-left: 20rpx;"></u-icon>
				</view>
			</view>
		</view>

		<!-- 页面主体内容 -->
		<scroll-view scroll-y class="cart-body" :style="{ paddingTop: contentTopPx + 'px' }">
			<!-- 加载状态 -->
			<view class="loading-container" v-if="cartLoading">
				<view class="loading-text">加载中...</view>
			</view>

			<!-- 空购物车状态 -->
			<view class="empty-cart" v-else-if="cartList.length === 0">
				<view class="empty-icon">🛒</view>
				<view class="empty-text">购物车还是空的</view>
				<view class="empty-desc">快去选购喜欢的商品吧</view>
			</view>

			<!-- 分类列表 -->
			<view class="category-list" v-for="category in cartList" :key="category.id" v-else>
				<!-- 分类区域 -->
				<view class="category-section">
					<view class="category-item">
						<!-- 分类选择框 -->
						<view class="category-checkbox" :class="{ selected: isCategorySelected(category.id) }"
							@click="toggleCategorySelect(category.id)">
							<u-icon v-if="isCategorySelected(category.id)" name="checkmark" size="12"
								color="#fff"></u-icon>
						</view>
						<text class="category-text">{{ category.name }}</text>
						<text class="delete-text" @click="deleteCategoryItems(category.id)">删除</text>
					</view>
				</view>

				<!-- 该分类下的商品列表 -->
				<view class="cart-list">
					<view class="cart-item" v-for="item in category.children" :key="item.id"
						:class="{ 'item-invalid': !item.isValid }">

						<!-- 失效商品蒙层 -->
						<view class="invalid-overlay" v-if="!item.isValid">
							<view class="invalid-delete" @click="deleteInvalidItem(item.id)">
								<u-icon name="close" size="16" color="#ff4757"></u-icon>
							</view>
						</view>

						<!-- 选择框 -->
						<view class="item-checkbox"
							:class="{ selected: selectedItems.includes(item.id), disabled: !item.isValid }"
							@click="item.isValid ? toggleSelect(item.id) : null">
							<u-icon v-if="selectedItems.includes(item.id) && item.isValid" name="checkmark" size="12"
								color="#fff"></u-icon>
						</view>

						<!-- 商品图片 -->
						<image class="item-image" :src="item.image" mode="aspectFill"></image>

						<!-- 商品信息 -->
						<view class="item-info">
							<view class="item-title" :class="{ 'title-invalid': !item.isValid }">
								{{ item.title }}
								<text v-if="!item.isValid" class="invalid-tag">已失效</text>
							</view>
							<view class="item-bottom">
								<text class="item-price"
									:class="{ 'price-invalid': !item.isValid }">¥{{ item.price }}</text>
								<view class="item-controls" v-if="item.isValid">
									<image class="control-icon"
										:src="item.quantity <= 1 ? '/static/images/minus-disabled.png' : '/static/images/minus.png'"
										@click="decreaseQuantity(item)"></image>
									<text class="quantity">{{ item.quantity }}</text>
									<image class="control-icon" src="/static/images/plus.png"
										@click="increaseQuantity(item)"></image>
								</view>
								<view class="invalid-controls" v-else>
									<text class="invalid-text">商品已下架</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 热销推荐 -->
			<view class="hot-recommend">
				<view class="recommend-header">
					<view class="recommend-title">
						<view class="icon-stack">
							<image class="icon-outer ml50" src="/static/images/yellow-yz.png" mode="aspectFit"></image>
							<image class="icon-inner" src="/static/images/green-yz.png" mode="aspectFit"></image>
						</view>
						<text class="title-text">热销推荐</text>
						<view class="icon-stack">
							<image class="icon-outer mr50 xxz" src="/static/images/yellow-yz.png" mode="aspectFit">
							</image>
							<image class="icon-inner xxz" src="/static/images/green-yz.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>

				<view class="recommend-grid">
					<view class="recommend-item" v-for="item in recommendItems" :key="item.id">
						<view class="recommend-badge">HOT</view>
						<image class="recommend-image" :src="item.image" mode="aspectFill"></image>
						<view class="recommend-info">
							<text class="recommend-name">{{ item.name }}</text>
							<text class="recommend-price">¥{{ item.price }}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- 底部结算栏 -->
		<view class="cart-footer">
			<view class="select-all" @click="toggleSelectAll">
				<view class="select-checkbox" :class="{ selected: isAllSelected }">
					<u-icon v-if="isAllSelected" name="checkmark" size="12" color="#fff"></u-icon>
				</view>
				<text class="select-text">全选</text>
			</view>
			<text class="selected-count">已选{{ selectedCount }}件</text>
			<text class="total-text">合计：¥<text class="total-price">{{ totalPrice }}</text></text>
			<view class="footer-right">
				<view class="checkout-btn" @click="checkout">
					去结算({{ selectedCount }})
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		fetchGoodsList
	} from '@/api/goods'
	import {
		fetchCartList,
		changeCartNum,
		deleteCart
	} from '@/api/cart'

	export default {
		data() {
			return {
				// 顶部安全区域
				statusBarHeight: 0,
				capsuleHeight: 44,
				capsuleTop: 0,

				// 选中的商品ID
				selectedItems: [], // 初始为空，数据加载后再设置

				// 购物车数据 - 从接口获取
				cartList: [],
				cartLoading: true,

				// 热销推荐数据
				recommendItems: []
			}
		},
		onShow() {
			console.log('show cart');
		},
		computed: {
			// 顶部标题栏样式
			headerStyle() {
				return `padding-top:${this.capsuleTop}px;background:#fff;`
			},

			// 内容区顶部偏移
			contentTopPx() {
				return this.capsuleTop + this.capsuleHeight
			},

			// 获取所有商品
			allItems() {
				return this.cartList.reduce((items, category) => {
					return items.concat(category.children)
				}, [])
			},

			// 获取所有有效商品
			validItems() {
				return this.allItems.filter(item => item.isValid)
			},

			// 分类是否选中（当该分类下所有有效商品都选中时）
			isCategorySelected() {
				return (categoryId) => {
					const category = this.cartList.find(cat => cat.id === categoryId)
					if (!category || category.children.length === 0) return false
					const validChildren = category.children.filter(item => item.isValid)
					if (validChildren.length === 0) return false
					return validChildren.every(item => this.selectedItems.includes(item.id))
				}
			},

			// 是否全选（只考虑有效商品）
			isAllSelected() {
				return this.validItems.length > 0 && this.validItems.every(item => this.selectedItems.includes(item.id))
			},

			// 选中商品数量
			selectedCount() {
				return this.selectedItems.length
			},

			// 总价格
			totalPrice() {
				return this.selectedItems.reduce((total, id) => {
					const item = this.allItems.find(item => item.id === id)
					return total + (item ? item.price * item.quantity : 0)
				}, 0).toFixed(2)
			}
		},
		mounted() {
			console.log('mounted cart');
			this.initPageLayout()
			// 获取购物车数据
			this.getCartList()
			// 获取推荐商品
			this.getRecommendItems()
		},
		methods: {
			// 初始化页面布局
			initPageLayout() {
				const sys = uni.getSystemInfoSync()
				this.statusBarHeight = sys.statusBarHeight || 0

				// #ifdef MP-WEIXIN
				try {
					const rect = wx.getMenuButtonBoundingClientRect()
					if (rect && rect.height) {
						this.capsuleHeight = rect.height
						this.capsuleTop = rect.top + 5
					}
				} catch (e) {}
				// #endif

				// 其他端给个合理默认
				// #ifndef MP-WEIXIN
				this.capsuleHeight = 44
				this.capsuleTop = this.statusBarHeight
				// #endif
			},

			// 获取购物车列表
			async getCartList() {
				try {
					this.cartLoading = true
					// TODO fetchCartList 会在这里使用
					const res = await fetchCartList()
					if (res.code === 200 && res.data && res.data.cartSkus) {
						// 处理购物车数据，按商家分组
						const groupedCart = this.groupCartByMerchant(res.data.cartSkus)
						this.cartList = groupedCart
						// 初始化选中状态（可根据需求设置默认选中）
						// this.selectedItems = []
					} else {
						// 如果接口没有数据，显示空购物车
						console.log('购物车接口无数据')
						this.cartList = []
					}
				} catch (error) {
					console.error('获取购物车失败:', error)
					// 异常时显示空购物车
					this.cartList = []
				} finally {
					this.cartLoading = false
				}
			},

			// 按商家分组购物车数据
			groupCartByMerchant(cartSkus) {
				const groups = {}

				cartSkus.forEach(item => {
					const merchantId = item.merchantId || 'default'
					const merchantName = item.merchantName || '雷波农特'

					if (!groups[merchantId]) {
						groups[merchantId] = {
							id: merchantId,
							name: merchantName,
							children: []
						}
					}

					groups[merchantId].children.push({
						id: item.skuId,
						skuId: item.skuId,
						title: item.goodsName || item.skuName,
						stock: item.stock || 0,
						price: item.goodsPrice || item.skuPrice,
						quantity: item.goodsNum || item.quantity,
						image: item.goodsImage || item.skuImage,
						isValid: item.isValid !== false // 默认为true，只有明确为false时才是失效
					})
				})

				return Object.values(groups)
			},

			// 获取推荐商品
			async getRecommendItems() {
				try {
					// TODO fetchGoodsList 会在这里使用
					const params = {
						pageSize: 10,
						pageNo: 1,
						isRecommend: 1 // 获取推荐商品
					}
					const res = await fetchGoodsList(params)
					if (res.code == 200 && res.rows && res.rows.length > 0) {
						this.recommendItems = res.rows.slice(0, 2).map(item => ({
							id: item.goodsId,
							name: item.goodsName,
							price: item.promotionPrice || item.price,
							image: item.goodsImage || item.img
						}))
					} else {
						// 如果接口没有数据，显示空推荐
						console.log('推荐商品接口无数据')
						this.recommendItems = []
					}
				} catch (error) {
					console.error('获取推荐商品失败:', error)
					// 异常时显示空推荐
					this.recommendItems = []
				}
			},

			// 切换分类选中状态（只对有效商品生效）
			toggleCategorySelect(categoryId) {
				const category = this.cartList.find(cat => cat.id === categoryId)
				if (!category) return

				const validCategoryItems = category.children.filter(item => item.isValid)
				const validCategoryItemIds = validCategoryItems.map(item => item.id)
				const isAllSelected = validCategoryItemIds.every(id => this.selectedItems.includes(id))

				if (isAllSelected) {
					// 取消选中该分类下的所有有效商品
					this.selectedItems = this.selectedItems.filter(id => !validCategoryItemIds.includes(id))
				} else {
					// 选中该分类下的所有有效商品
					const newSelectedItems = [...this.selectedItems]
					validCategoryItemIds.forEach(id => {
						if (!newSelectedItems.includes(id)) {
							newSelectedItems.push(id)
						}
					})
					this.selectedItems = newSelectedItems
				}
			},

			// 切换商品选中状态
			toggleSelect(id) {
				const index = this.selectedItems.indexOf(id)
				if (index > -1) {
					this.selectedItems.splice(index, 1)
				} else {
					this.selectedItems.push(id)
				}
			},

			// 全选/取消全选（只对有效商品生效）
			toggleSelectAll() {
				if (this.isAllSelected) {
					this.selectedItems = []
				} else {
					this.selectedItems = this.validItems.map(item => item.id)
				}
			},

			// 减少商品数量
			decreaseQuantity(item) {
				if (item.quantity > 1) {
					item.quantity--
					// 调用接口更新数量
					this.updateCartQuantity(item.skuId, item.quantity)
				}
			},

			// 增加商品数量
			increaseQuantity(item) {
				item.quantity++
				// 调用接口更新数量
				this.updateCartQuantity(item.skuId, item.quantity)
			},

			// 更新购物车数量
			async updateCartQuantity(skuId, quantity) {
				try {
					// TODO changeCartNum 会在这里使用
					await changeCartNum({
						skuId,
						goodsNum: quantity
					})
				} catch (error) {
					console.error('更新数量失败:', error)
					uni.showToast({
						title: '更新失败，请重试',
						icon: 'none'
					})
					// 恢复之前的数量
					this.getCartList()
				}
			},


			// 删除分类下的商品
			deleteCategoryItems(categoryId) {
				const category = this.cartList.find(cat => cat.id === categoryId)
				if (!category || category.children.length === 0) return

				const categoryItemIds = category.children.map(item => item.id)
				const selectedCategoryItems = categoryItemIds.filter(id => this.selectedItems.includes(id))

				if (selectedCategoryItems.length === 0) {
					uni.showToast({
						title: '请先选择要删除的商品',
						icon: 'none'
					})
					return
				}

				uni.showModal({
					title: '删除确认',
					content: `确定要删除选中的${selectedCategoryItems.length}件商品吗？`,
					success: (res) => {
						if (res.confirm) {
							this.deleteSelectedItems(selectedCategoryItems)
						}
					}
				})
			},

			// 删除选中的商品
			async deleteSelectedItems(itemIds) {
				try {
					// 获取对应的skuIds
					const skuIds = []
					this.cartList.forEach(category => {
						category.children.forEach(item => {
							if (itemIds.includes(item.id)) {
								skuIds.push(item.skuId)
							}
						})
					})

					if (skuIds.length === 0) return

					// TODO deleteCart 会在这里使用
					await deleteCart(skuIds.join(','))

					// API调用成功，更新本地数据
					this.cartList.forEach(category => {
						category.children = category.children.filter(item => !itemIds.includes(item.id))
					})

					// 移除空分类
					this.cartList = this.cartList.filter(category => category.children.length > 0)

					// 清除已删除商品的选中状态
					this.selectedItems = this.selectedItems.filter(id => !itemIds.includes(id))

					uni.showToast({
						title: '删除成功',
						icon: 'success'
					})
				} catch (error) {
					console.error('删除商品失败:', error)
					uni.showToast({
						title: '删除失败，请稍后重试',
						icon: 'none'
					})
				}
			},

			// 删除失效商品
			deleteInvalidItem(itemId) {
				uni.showModal({
					title: '删除失效商品',
					content: '确定要删除这个失效商品吗？',
					success: (res) => {
						if (res.confirm) {
							this.deleteSelectedItems([itemId])
						}
					}
				})
			},

			// 结算
			checkout() {
				if (this.selectedItems.length === 0) {
					uni.showToast({
						title: '请选择要结算的商品',
						icon: 'none'
					})
					return
				}

				try {
					// 获取选中的商品信息
					const selectedGoods = []
					this.selectedItems.forEach(itemId => {
						const item = this.allItems.find(goods => goods.id === itemId)
						if (item && item.isValid) { // 只添加有效商品
							selectedGoods.push({
								skuId: item.skuId,
								goodsNum: item.quantity
							})
						}
					})

					if (selectedGoods.length === 0) {
						uni.showToast({
							title: '没有有效商品可结算',
							icon: 'none'
						})
						return
					}

					// 构建订单数据（符合接口要求的格式）
					const orderData = {
						goodsList: selectedGoods,
						orderType: 1, // 普通订单
						promotionId: null, // 无促销活动
						isCart: true // 标记为购物车下单
					}

					// 将订单数据存储到全局数据中
					const globalData = require('@/utils/globalData.js').default
					globalData.orderData = orderData

					if (getApp().globalData) {
						getApp().globalData.orderData = orderData
					}

					console.log('购物车结算数据:', orderData)

					// 跳转到订单确认页面
					uni.navigateTo({
						url: '/subpackages/order/detail/detail',
						fail: (err) => {
							console.error('页面跳转失败:', err)
							uni.showToast({
								title: '页面跳转失败，请重试',
								icon: 'none'
							})
						}
					})
				} catch (error) {
					console.error('购物车结算失败:', error)
					uni.showToast({
						title: '结算失败，请重试',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cart-page {
		height: 100vh;
		background: #f5f5f5;
		display: flex;
		flex-direction: column;
	}

	/* 固定顶部标题栏 */
	.cart-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
	}

	.header-content {
		height: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding: 0 30rpx 16rpx 30rpx;
		position: relative;
		margin-bottom: 30rpx;
		/* 增加下边距 */
	}

	.header-title {
		font-size: 32rpx;
		font-weight: 600;
		color: #111;
	}

	.header-right {
		position: absolute;
		right: 30rpx;
		bottom: 16rpx;
		display: flex;
		align-items: center;
	}

	/* 页面主体 */
	.cart-body {
		flex: 1;
		height: 0;
		/* 配合flex:1使用 */
		padding-bottom: 300rpx;
		/* 为底部结算栏留出足够空间：结算栏高度(~80rpx) + bottom距离(180rpx) + 安全间距(40rpx) */
	}

	/* 分类列表 */
	.category-list {
		margin-bottom: 20rpx;
	}

	/* 分类区域 */
	.category-section {
		background: #fff;
		margin: 20rpx 24rpx 0 24rpx;
		border-radius: 12rpx 12rpx 0 0;
		padding: 0 30rpx;
	}

	.category-item {
		display: flex;
		align-items: center;
		height: 88rpx;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.category-checkbox {
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		border: 2rpx solid #009966;
		margin-right: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;

		&.selected {
			background: #009966;
		}
	}

	.category-text {
		flex: 1;
		font-size: 28rpx;
		color: #333;
		font-weight: 500;
	}

	.delete-text {
		font-size: 26rpx;
		color: #ff4757;
		cursor: pointer;
		transition: color 0.2s ease;

		&:active {
			color: #ff3742;
		}
	}

	/* 购物车商品列表 */
	.cart-list {
		background: #fff;
		margin: 0 24rpx;
		border-radius: 0 0 12rpx 12rpx;
	}

	.cart-item {
		display: flex;
		align-items: flex-start;
		padding: 30rpx;
		border-bottom: 1rpx solid #f0f0f0;
		position: relative;

		&:last-child {
			border-bottom: none;
		}

		&.item-invalid {
			opacity: 0.6;
		}
	}

	.item-checkbox {
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		border: 2rpx solid #009966;
		margin-right: 20rpx;
		margin-top: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		transition: all 0.2s ease;

		&.selected {
			background: #009966;
		}

		&.disabled {
			border-color: #ddd;
			background: #f5f5f5;
			cursor: not-allowed;
		}
	}

	.item-image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 12rpx;
		margin-right: 20rpx;
	}

	.item-info {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.item-title {
		font-size: 28rpx;
		color: #333;
		line-height: 1.4;
		margin-bottom: 8rpx;
	}

	.item-spec {
		font-size: 24rpx;
		color: #999;
		margin-bottom: 20rpx;
	}

	.item-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.item-price {
		font-size: 32rpx;
		color: #e54d42;
		font-weight: 600;

		&.price-invalid {
			color: #999;
			text-decoration: line-through;
		}
	}

	.item-controls {
		display: flex;
		align-items: center;
		gap: 20rpx;
	}

	.control-icon {
		width: 40rpx;
		height: 40rpx;
	}

	.quantity {
		font-size: 28rpx;
		color: #333;
		min-width: 40rpx;
		text-align: center;
	}

	/* 失效商品样式 */
	.invalid-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(255, 255, 255, 0.7);
		z-index: 2;
		pointer-events: none;
	}

	.invalid-delete {
		position: absolute;
		top: 20rpx;
		right: 20rpx;
		width: 48rpx;
		height: 48rpx;
		background: #fff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
		pointer-events: auto;
		z-index: 3;
		transition: all 0.2s ease;

		&:active {
			transform: scale(0.9);
		}
	}

	.title-invalid {
		color: #999 !important;
		position: relative;
	}

	.invalid-tag {
		display: inline-block;
		background: #ff4757;
		color: #fff;
		font-size: 20rpx;
		padding: 2rpx 8rpx;
		border-radius: 6rpx;
		margin-left: 12rpx;
		vertical-align: middle;
	}

	.invalid-controls {
		display: flex;
		align-items: center;
	}

	.invalid-text {
		font-size: 24rpx;
		color: #999;
	}

	/* 热销推荐 */
	.hot-recommend {
		background: #fff;
		margin: 20rpx 24rpx 0 24rpx;
		border-radius: 12rpx;
		padding: 30rpx;
	}

	.recommend-header {
		margin-bottom: 30rpx;
	}

	.recommend-title {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12rpx;
	}

	.icon-stack {
		position: relative;
		width: 32rpx;
		height: 32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.icon-inner {
		position: absolute;
		width: 32rpx;
		height: 32rpx;
		z-index: 1;
	}

	.icon-outer {
		position: absolute;
		width: 20rpx;
		height: 20rpx;
		z-index: 2;
	}

	.ml50 {
		margin-left: -100rpx;
	}

	.mr50 {
		margin-right: -100rpx;
	}

	.xxz {
		transform: scaleX(-1)
	}

	.title-text {
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
	}

	.recommend-grid {
		display: flex;
		gap: 20rpx;
	}

	.recommend-item {
		flex: 1;
		position: relative;
	}

	.recommend-badge {
		position: absolute;
		top: 8rpx;
		left: 8rpx;
		background: #FF6B35;
		color: #fff;
		font-size: 20rpx;
		padding: 4rpx 8rpx;
		border-radius: 8rpx;
		z-index: 2;
	}

	.recommend-image {
		width: 100%;
		height: 200rpx;
		border-radius: 12rpx;
		margin-bottom: 12rpx;
	}

	.recommend-info {
		display: flex;
		flex-direction: column;
		gap: 8rpx;
	}

	.recommend-name {
		font-size: 24rpx;
		color: #333;
		line-height: 1.3;
	}

	.recommend-price {
		font-size: 28rpx;
		color: #e54d42;
		font-weight: 600;
	}

	/* 底部结算栏 */
	.cart-footer {
		position: fixed;
		bottom: 150rpx;
		left: 0;
		right: 0;
		background: #fff;
		padding: 24rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-shadow: 0 -2rpx 8rpx rgba(0, 0, 0, 0.1);
		z-index: 100;
		border-radius: 24rpx 24rpx 0 0;
	}

	.select-all {
		margin-top: 6rpx;
		display: flex;
		align-items: center;
		gap: 8rpx;
	}

	.select-checkbox {
		width: 32rpx;
		height: 32rpx;
		border-radius: 50%;
		border: 2rpx solid #009966;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;

		&.selected {
			background: #009966;
		}
	}

	.select-text {
		font-size: 24rpx;
		color: #333;
		line-height: 1;
	}

	.selected-count {
		margin-top: 6rpx;
		font-size: 22rpx;
		color: #999;
		line-height: 1;
	}

	.total-text {
		font-size: 24rpx;
		color: #333;
		line-height: 1;
	}

	.total-price {
		font-size: 32rpx;
		color: #e54d42;
		font-weight: 600;
	}

	.footer-right {
		display: flex;
		align-items: center;
	}

	.checkout-btn {
		background: linear-gradient(135deg, #009966, #00b377);
		color: #fff;
		font-size: 28rpx;
		font-weight: 600;
		padding: 0 40rpx;
		border-radius: 48rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 200rpx;
		transition: all 0.2s ease;
		box-shadow: 0 4rpx 12rpx rgba(0, 153, 102, 0.3);

		&:active {
			background: linear-gradient(135deg, #007A52, #009966);
			transform: scale(0.98);
			box-shadow: 0 2rpx 8rpx rgba(0, 153, 102, 0.3);
		}
	}

	/* 加载状态 */
	.loading-container {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 120rpx 0;
	}

	.loading-text {
		font-size: 28rpx;
		color: #999;
	}

	/* 空购物车状态 */
	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 200rpx 0;
	}

	.empty-icon {
		font-size: 120rpx;
		margin-bottom: 30rpx;
	}

	.empty-text {
		font-size: 32rpx;
		color: #333;
		margin-bottom: 16rpx;
		font-weight: 500;
	}

	.empty-desc {
		font-size: 26rpx;
		color: #999;
	}
</style>