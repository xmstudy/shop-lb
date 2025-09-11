<template>
	<BaseContainer :Bglinear="{
		background: 'linear-gradient(to bottom, #a6e22e 0%, #a6e22e 20%, #fff 40%,#fff 100%)',
	}">
		<view class="fav-goods-container">
			<!-- Header -->
			<view class="header">
				<view class="header-nav">
					<view class="back-btn" @click="goBack">
						<u-icon name="arrow-left" color="#fff" size="24"></u-icon>
					</view>
					<view class="nav-center">
						<view class="header-title">我的收藏</view>
						<view class="header-desc">共收藏 {{ totalCount }} 件商品</view>
					</view>
					<view class="header-placeholder"></view>
				</view>
			</view>

			<!-- Product List -->
			<scroll-view 
				class="product-list" 
				scroll-y 
				@scrolltolower="loadMore"
				refresher-enabled="true"
				:refresher-triggered="refreshing"
				@refresherrefresh="onRefresh"
				refresher-background="#a6e22e"
			>
				<view class="product-card" v-for="(product, index) in productList" :key="index"
					@tap="goToProductDetail(product.goodsId)">
					<image class="product-img" :src="product.goodsImage" mode="aspectFill"></image>
					<view class="product-info">
						<view class="product-header">
							<view class="product-name">{{ product.goodsName }}</view>
							<view class="product-price-section">
								<text class="product-price">¥{{ product.promotionPrice || product.price }}</text>
								<text class="product-original-price" v-if="product.price && product.promotionPrice && product.price > product.promotionPrice">¥{{ product.price }}</text>
							</view>
						</view>
						<view class="product-desc">{{ product.sellingPoint || '优质商品，值得信赖' }}</view>
						<view class="product-stats">
							<text class="stat-item">销量: {{ product.virtualSoldNum || product.soldNum || 0 }}</text>
							<text class="stat-item">评分: 4.5</text>
						</view>
					</view>
				</view>

				<!-- Loading More -->
				<view class="loading-more" v-if="loading">
					<u-loading-icon mode="spinner" color="#a6e22e" size="20"></u-loading-icon>
					<text>加载中...</text>
				</view>

				<!-- No More Data -->
				<view class="no-more" v-if="!hasMore && productList.length > 0">
					<text>没有更多数据了</text>
				</view>

				<!-- Empty State -->
				<view class="empty-state" v-if="!loading && productList.length === 0">
					<text class="empty-title">暂无收藏商品</text>
					<text class="empty-desc">快去收藏一些喜欢的商品吧</text>
				</view>
			</scroll-view>
		</view>
	</BaseContainer>
</template>

<script>
	import BaseContainer from '@/components/BaseWrapper.vue'
	import { GoodsFavorList } from '@/api/goods'

	export default {
		name: 'FavGoodsList',
		components: {
			BaseContainer
		},
		data() {
			return {
				productList: [],
				pageNum: 1,
				pageSize: 10,
				totalCount: 0,
				loading: false,
				refreshing: false,
				hasMore: true
			}
		},
		mounted() {
			this.loadProductData()
		},
		methods: {
			// 返回上一页
			goBack() {
				// 获取当前页面栈
				const pages = getCurrentPages()
				
				// 如果页面栈只有1页或者没有上一页，跳转到首页
				if (pages.length <= 1) {
					// 设置全局下标为0
					if (getApp().globalData) {
						getApp().globalData.activeTabbarKey = 0
					}
					// 跳转到首页
					uni.reLaunch({
						url: '/pages/index/index'
					})
				} else {
					// 有上一页，正常返回
					uni.navigateBack({
						delta: 1
					})
				}
			},
			
			// 加载商品数据
			async loadProductData(isRefresh = false) {
				if (this.loading) return
				
				this.loading = true
				
				try {
					const params = {
						pageNum: this.pageNum,
						pageSize: this.pageSize
					}
					
					const res = await GoodsFavorList(params)
					console.log('收藏商品数据:', res)
					
					if (res.code == 200 && res.rows) {
						const newList = res.rows.list || res.rows
						
						if (isRefresh) {
							this.productList = newList
						} else {
							this.productList = [...this.productList, ...newList]
						}
						
						this.totalCount = res.total || newList.length
						this.hasMore = newList.length >= this.pageSize
					} 
				} catch (error) {
					console.error('获取收藏商品失败:', error)
					uni.showToast({
						title: '网络错误，请重试',
						icon: 'error'
					})
				} finally {
					this.loading = false
					this.refreshing = false
				}
			},
			
			// 下拉刷新
			async onRefresh() {
				this.refreshing = true
				this.pageNum = 1
				this.hasMore = true
				await this.loadProductData(true)
			},
			
			// 上拉加载更多
			async loadMore() {
				if (!this.hasMore || this.loading) return
				
				this.pageNum++
				await this.loadProductData()
			},
			
			// 跳转到商品详情
			goToProductDetail(goodsId) {
				uni.navigateTo({
					url: `/subpackages/goods/detail/detail?goodsId=${goodsId}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fav-goods-container {
		min-height: 100vh;
		padding-bottom: 120rpx;
	}

	/* Header */
	.header {
		padding: 32rpx 24rpx 24rpx;

		.header-nav {
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
		}

		.back-btn {
			width: 44rpx;
			height: 44rpx;
			border-radius: 22rpx;
			background: rgba(255, 255, 255, 0.15);
			backdrop-filter: blur(10rpx);
			display: flex;
			align-items: center;
			justify-content: center;
			transition: all 0.3s ease;
			border: 1rpx solid rgba(255, 255, 255, 0.2);

			&:active {
				transform: scale(0.95);
				background: rgba(255, 255, 255, 0.25);
			}
		}

		.nav-center {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			text-align: center;

			.header-title {
				font-size: 48rpx;
				font-weight: bold;
				color: #fff;
				margin-bottom: 8rpx;
				text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
			}

			.header-desc {
				font-size: 26rpx;
				color: rgba(255, 255, 255, 0.8);
			}
		}

		.header-placeholder {
			width: 44rpx;
			height: 44rpx;
		}
	}

	/* Product List */
	.product-list {
		padding: 0 24rpx;
		height: calc(100vh - 200rpx);
		box-sizing: border-box;
		margin-top: 24rpx;
	}

	.product-card {
		background: linear-gradient(135deg, #fff 0%, #f8fff0 100%);
		border-radius: 24rpx;
		overflow: hidden;
		box-shadow: 0 6rpx 20rpx rgba(166, 226, 46, 0.1);
		display: flex;
		flex-direction: row;
		padding: 24rpx;
		gap: 20rpx;
		border: 1rpx solid rgba(166, 226, 46, 0.1);
		transition: all 0.3s ease;
		margin-bottom: 24rpx;

		&:active {
			transform: translateY(-2rpx);
			box-shadow: 0 8rpx 24rpx rgba(166, 226, 46, 0.15);
		}

		.product-img {
			width: 140rpx;
			height: 140rpx;
			border-radius: 20rpx;
			object-fit: cover;
			background: linear-gradient(135deg, #f0f8e0 0%, #e8f5d0 100%);
			flex-shrink: 0;
			box-shadow: 0 4rpx 12rpx rgba(166, 226, 46, 0.1);
		}

		.product-info {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 8rpx;
			min-width: 0;
		}

		.product-header {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			margin-bottom: 8rpx;
		}

		.product-name {
			font-size: 30rpx;
			font-weight: bold;
			color: #2e7d32;
			line-height: 1.2;
			flex: 1;
			margin-right: 16rpx;
		}

		.product-price-section {
			display: flex;
			align-items: center;
			gap: 8rpx;
			flex-shrink: 0;
		}

		.product-price {
			font-size: 26rpx;
			color: #e54d42;
			font-weight: bold;
		}

		.product-original-price {
			font-size: 22rpx;
			color: #999;
			text-decoration: line-through;
		}

		.product-desc {
			font-size: 22rpx;
			color: #666;
			line-height: 1.3;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			margin-bottom: 8rpx;
		}

		.product-stats {
			display: flex;
			gap: 12rpx;
			font-size: 22rpx;
			color: #666;
			margin-top: 8rpx;

			.stat-item {
				background: linear-gradient(135deg, #f0f8e0 0%, #e8f5d0 100%);
				padding: 6rpx 12rpx;
				border-radius: 12rpx;
				border: 1rpx solid rgba(166, 226, 46, 0.2);
				font-weight: 500;
			}
		}
	}

	/* Loading States */
	.loading-more {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12rpx;
		padding: 32rpx;
		color: #666;
		font-size: 26rpx;
	}

	.no-more {
		text-align: center;
		padding: 32rpx;
		color: #999;
		font-size: 26rpx;
	}

	/* Empty State */
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 120rpx 24rpx;
		text-align: center;

		.empty-title {
			font-size: 32rpx;
			color: #666;
			margin: 24rpx 0 12rpx;
			font-weight: bold;
		}

		.empty-desc {
			font-size: 26rpx;
			color: #999;
			line-height: 1.4;
		}
	}
</style>
