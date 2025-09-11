<template>
	<BaseContainer>
		<!-- 页面背景装饰 -->
		<view class="page-background">
			<view class="background-gradient"></view>
			<view class="floating-elements">
				<view class="element element-1"></view>
				<view class="element element-2"></view>
				<view class="element element-3"></view>
			</view>
		</view>
		
		<view class="rural-lifestyle-page">
			<!-- 传统中式头部区域 -->
			<view class="header-section">
				<view class="traditional-frame">
					<view class="frame-corner top-left"></view>
					<view class="frame-corner top-right"></view>
					<view class="frame-corner bottom-left"></view>
					<view class="frame-corner bottom-right"></view>

					<view class="brand-content">
						<!-- 传统印章风格 -->
						<view class="logo-section">
							<view class="traditional-seal" @tap="onLogoTap">
								<view class="seal-glow"></view>
								<text class="seal-text">雷波</text>
								<view class="seal-ripple"></view>
							</view>
						</view>

						<view class="title-section">
							<view class="main-title">乡风雅韵</view>
							<view class="title-decoration">
								<text class="decoration-line">━━━</text>
								<text class="sub-title">山乡美味·田园雅趣</text>
								<text class="decoration-line">━━━</text>
							</view>
						</view>

						<view class="header-actions">
							<view class="action-btn search-btn" @tap="handleSearch">
								<u-icon name="search" color="#8b9467" size="28"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 图片Banner展示区 -->
			<view class="banner-section">
				<swiper class="banner-swiper" :indicator-dots="false" :autoplay="false" :interval="3000" :duration="300"
					:circular="true" :previous-margin="0" :next-margin="120"
					@change="handleSwiperChange" :current="currentIndex" :skip-hidden-item-layout="true">
					<swiper-item v-for="(item, index) in bannerList" :key="index" class="swiper-item"
						@tap="handleBannerClick(item.type)">
						<view class="banner-item" :class="{ 'active': currentIndex === index }">
							<image class="banner-image" :src="item.image" mode="aspectFill"></image>
							<view class="banner-overlay">
								<text class="banner-text">{{ item.title }}</text>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>

			<!-- 臻品集市区域 -->
			<view class="market-section">
				<view class="section-header">
					<view class="header-decoration">
						<view class="decoration-line left"></view>
						<view class="decoration-symbol">◈</view>
						<view class="decoration-line center"></view>
						<view class="decoration-symbol">◈</view>
						<view class="decoration-line right"></view>
					</view>
					<view class="main-title">乡村集市</view>
					<view class="sub-title">山间臻品·传统工艺</view>
					<view class="title-desc">承载乡土记忆，品味田园之韵</view>
				</view>
			</view>

			<!-- 臻品展示区域 -->
			<view class="products-section">
				<view class="product-card" v-for="(item, index) in productList" :key="index" @tap="goToProductDetail(item)">
					<view class="card-wrapper">
						<view class="product-image-container">
							<image class="product-image" :src="item.image" mode="aspectFill"></image>
							<view class="image-overlay">
								<view class="product-tag">{{ item.tag }}</view>
								<view class="favorite-btn" @tap.stop="toggleFavorite(index)">
									<u-icon :name="item.isFavorite ? 'heart-fill' : 'heart'" 
											:color="item.isFavorite ? '#ff6b6b' : 'rgba(255,255,255,0.8)'" size="24"></u-icon>
								</view>
							</view>
						</view>
						
						<view class="product-content">
							<view class="product-header">
								<view class="product-title">
									<text class="product-name">{{ item.name }}</text>
									<text class="product-subtitle">{{ item.subtitle }}</text>
								</view>
								<view class="sales-info">
									<text class="sales-text">已售{{ item.sales }}{{ item.unit }}</text>
								</view>
							</view>
							
							<view class="product-description">{{ item.description }}</view>
							
							<view class="product-footer">
								<view class="price-section">
									<text class="current-price">¥{{ item.price }}</text>
									<text class="original-price" v-if="item.originalPrice">¥{{ item.originalPrice }}</text>
									<text class="unit-text">/{{ item.unit }}</text>
								</view>
								<view class="action-section">
									<view class="quantity-controls" v-if="item.quantity > 0">
										<view class="minus-btn" @tap.stop="decreaseQuantity(index)">
											<u-icon name="minus" color="#8b9467" size="16"></u-icon>
										</view>
										<text class="quantity">{{ item.quantity }}</text>
										<view class="plus-btn" @tap.stop="increaseQuantity(index)">
											<u-icon name="plus" color="#fff" size="16"></u-icon>
										</view>
									</view>
									<view class="add-btn" v-else @tap.stop="addToCart(index)">
										<u-icon name="shopping-cart" color="#fff" size="18"></u-icon>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</BaseContainer>
</template>

<script>
	import BaseContainer from '@/components/BaseWrapper.vue'
	import {
		fetchGoodsList,
		fetchGoodsTreeList
	} from '@/api/goods'

	export default {
		name: 'RuralLifestyle',
		components: {
			BaseContainer
		},
		data() {
			return {
				cornerRadius: 80, // 圆角弧度，可调节
				currentIndex: 0,
				bannerList: [{
						id: 1,
						title: '村头集市',
						description: '晨曦初现，村民云集，传统集市的古朴魅力',
						image: 'https://pic1.imgdb.cn/item/67526348d0e0a243d4de700f.png',
						type: 'market'
					},
					{
						id: 2,
						title: '三凉粉雅制',
						description: '传统手工技艺，清凉爽滑的夏日臻品',
						image: 'https://pic1.imgdb.cn/item/67526348d0e0a243d4de700f.png',
						type: 'products'
					},
					{
						id: 3,
						title: '农家腊肉',
						description: '山间烟熏，传统工艺腌制的醇香美味',
						image: 'https://pic1.imgdb.cn/item/67526348d0e0a243d4de700f.png',
						type: 'bacon'
					},
					{
						id: 4,
						title: '土鸡蛋',
						description: '散养土鸡，营养丰富的天然馈赠',
						image: 'https://pic1.imgdb.cn/item/67526348d0e0a243d4de700f.png',
						type: 'eggs'
					}
				],
				productList: [], // 从API获取的商品列表
				loading: false,
				categoryList: [] // 分类数据
			}
		},
		mounted() {
			this.loadProductData()
		},
		methods: {
			// 加载商品数据
			async loadProductData() {
				this.loading = true
				try {
					const params = {
						pageSize: 20,
						pageNo: 1
					}

					// TODO fetchGoodsList 会在这里使用
					const res = await fetchGoodsList(params)
					console.log('乡村集市商品数据:', res)

					if (res.code == 200 && res.rows) {
						this.productList = res.rows.map(item => ({
							id: item.goodsId,
							name: item.goodsName,
							subtitle: item.sellingPoint || '乡村臻品',
							price: (item.promotionPrice || item.price),
							originalPrice: item.price,
							image: item.goodsImage || 'https://pic1.imgdb.cn/item/67526348d0e0a243d4de700f.png',
							tag: '农家精选',
							description: item.sellingPoint || '来自乡村的纯天然好物',
							isFavorite: false,
							quantity: 0,
							sales: item.virtualSoldNum || item.soldNum || 0,
							unit: '份'
						}))
					}
				} catch (error) {
					console.error('获取乡村集市商品数据失败:', error)
					uni.showToast({
						title: '加载失败，请重试',
						icon: 'error'
					})
				} finally {
					this.loading = false
				}
			},

			// 搜索功能
			handleSearch() {
				uni.navigateTo({
					url: "/subpackages/search/index/index"
				})
			},
			
			// 进入产品详情
			goToProductDetail(item) {
				uni.navigateTo({
					url: `/subpackages/goods/detail/detail?id=${item.id}`
				})
			},
			
			// 添加到购物车
			addToCart(index) {
				this.productList[index].quantity = 1
				uni.showToast({
					title: '已加入购物车',
					icon: 'success'
				})
			},

			// 用户中心
			handleUserCenter() {
				uni.navigateTo({
					url: '/pages/mine/mine'
				})
			},

			// Swiper变化处理
			handleSwiperChange(e) {
				this.currentIndex = e.detail.current
			},

					// Banner点击
		handleBannerClick(type) {
			uni.navigateTo({
				url: '/subpackages/Rm/index/index'
			})
		},

					// 添加到购物车
		toggleFavorite(index) {
			uni.showToast({
				title: '已添加到购物车',
				icon: 'success'
			})
		},

			// 增加数量
			increaseQuantity(index) {
				this.productList[index].quantity++
				// 这里可以调用购物车API
				uni.showToast({
					title: '已加入购物车',
					icon: 'success'
				})
			},

			// 减少数量
			decreaseQuantity(index) {
				if (this.productList[index].quantity > 0) {
					this.productList[index].quantity--
					// 这里可以调用购物车API
					uni.showToast({
						title: '已从购物车移除',
						icon: 'success'
					})
				}
			},

			// 印章点触雅致效果
			onLogoTap() {
				uni.showToast({
					title: '雷波农特恭候雅临',
					icon: 'none',
					duration: 2000
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 页面背景装饰
	.page-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		z-index: -1;
		overflow: hidden;

		.background-gradient {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(180deg, #f8fff0 0%, #ffffff 50%, #f0f8e8 100%);
		}

		.floating-elements {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			pointer-events: none;

			.element {
				position: absolute;
				border-radius: 50%;
				background: radial-gradient(circle, rgba(139, 148, 103, 0.03) 0%, transparent 70%);
				animation: float 6s ease-in-out infinite;

				&.element-1 {
					top: 10%;
					left: 15%;
					width: 300rpx;
					height: 300rpx;
					animation-delay: 0s;
				}

				&.element-2 {
					top: 60%;
					right: 10%;
					width: 200rpx;
					height: 200rpx;
					animation-delay: 2s;
				}

				&.element-3 {
					bottom: 20%;
					left: 25%;
					width: 250rpx;
					height: 250rpx;
					animation-delay: 4s;
				}
			}
		}
	}
	
	// 整体容器
	.rural-lifestyle-page {
		min-height: 100vh;
		position: relative;
		z-index: 1;
		padding-bottom: 40rpx;
		
		// 页面淡入动画
		animation: pageEnter 0.8s ease-out;
	}

	// 页面进入动画
	@keyframes pageEnter {
		0% {
			opacity: 0;
			transform: translateY(40rpx);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	// 传统中式头部区域
	.header-section {
		padding: 60rpx 24rpx 40rpx;
		position: relative;
		z-index: 10;
	}

	.traditional-frame {
		position: relative;
		background: linear-gradient(145deg, #fefefe 0%, #f8faf9 100%);
		border-radius: 16rpx;
		padding: 48rpx 32rpx;
		box-shadow:
			0 8rpx 32rpx rgba(139, 148, 103, 0.1),
			inset 0 2rpx 8rpx rgba(255, 255, 255, 0.8);

		// 中国风边框装饰
		.frame-corner {
			position: absolute;
			width: 32rpx;
			height: 32rpx;
			border: 3rpx solid #8b9467;

			&.top-left {
				top: 16rpx;
				left: 16rpx;
				border-right: none;
				border-bottom: none;
			}

			&.top-right {
				top: 16rpx;
				right: 16rpx;
				border-left: none;
				border-bottom: none;
			}

			&.bottom-left {
				bottom: 16rpx;
				left: 16rpx;
				border-right: none;
				border-top: none;
			}

			&.bottom-right {
				bottom: 16rpx;
				right: 16rpx;
				border-left: none;
				border-top: none;
			}
		}
	}

	.brand-content {
		display: flex;
		align-items: center;
		gap: 24rpx;
	}

	.logo-section {
		.traditional-seal {
			width: 100rpx;
			height: 100rpx;
			background: linear-gradient(135deg, #8b9467 0%, #6d7a52 100%);
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			box-shadow:
				0 8rpx 24rpx rgba(139, 148, 103, 0.3),
				inset 0 2rpx 8rpx rgba(255, 255, 255, 0.2);
			cursor: pointer;
			overflow: hidden;
			transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

			&::before {
				content: '';
				position: absolute;
				width: 80rpx;
				height: 80rpx;
				border: 2rpx solid rgba(255, 255, 255, 0.3);
				border-radius: 50%;
			}

			&:active {
				transform: scale(0.95);
			}

			.seal-glow {
				position: absolute;
				top: -10rpx;
				left: -10rpx;
				right: -10rpx;
				bottom: -10rpx;
				background: radial-gradient(circle, rgba(139, 148, 103, 0.3) 0%, transparent 70%);
				border-radius: 50%;
				opacity: 0;
			}

			.seal-text {
				font-size: 32rpx;
				font-weight: 800;
				color: #ffffff;
				text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
				letter-spacing: 4rpx;
				position: relative;
				z-index: 2;
			}

			.seal-ripple {
				position: absolute;
				top: 50%;
				left: 50%;
				width: 0;
				height: 0;
				border-radius: 50%;
				background: rgba(255, 255, 255, 0.4);
				transform: translate(-50%, -50%);
			}
		}
	}

	.title-section {
		flex: 1;
		text-align: center;

		.main-title {
			font-size: 48rpx;
			font-weight: 800;
			color: #2d3820;
			margin-bottom: 16rpx;
			letter-spacing: 6rpx;
		}

		.title-decoration {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 16rpx;

			.decoration-line {
				color: #8b9467;
				font-size: 20rpx;
			}

			.sub-title {
				font-size: 24rpx;
				color: #6d7a52;
				letter-spacing: 2rpx;
				font-weight: 500;
			}
		}
	}

	.header-actions {
		display: flex;
		gap: 16rpx;

		.action-btn {
			width: 72rpx;
			height: 72rpx;
			background: linear-gradient(145deg, #ffffff 0%, #f8faf9 100%);
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow: 0 4rpx 12rpx rgba(139, 148, 103, 0.2);
			border: 2rpx solid rgba(139, 148, 103, 0.15);
			transition: all 0.3s ease;

			&:active {
				transform: scale(0.95);
				box-shadow: 0 2rpx 8rpx rgba(139, 148, 103, 0.3);
			}
		}
	}

	// 图片Banner展示区
	.banner-section {
		padding: 30rpx 0;
		overflow: hidden;
		position: relative;

		.banner-swiper {
			height: 658rpx;
			overflow: hidden;
			// 限制swiper的滑动范围
			width: 100%;
			position: relative;

			.swiper-item {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 30rpx 0 60rpx;
				overflow: hidden;
				// 确保位置稳定
				width: 100%;
				box-sizing: border-box;

				.banner-item {
					width: 100%;
					height: 558rpx;
					border-radius: 20rpx;
					overflow: hidden;
					position: relative;
					box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
					transition: all 0.3s ease;

					&.active {
						height: 658rpx;
						transform: scale(1.05);
						box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.15);
						border-radius: 40rpx;
					}

					&:active {
						transform: scale(0.98);
					}

					.banner-image {
						width: 100%;
						height: 100%;
					}

					.banner-overlay {
						position: absolute;
						bottom: 0;
						left: 0;
						right: 0;
						background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
						padding: 20rpx;

						.banner-text {
							color: #fff;
							font-size: 28rpx;
							font-weight: bold;
						}
					}
				}
			}
		}
	}

	// 臻品集市区域
	.market-section {
		margin: 80rpx 24rpx 40rpx;
		
		.section-header {
			text-align: center;
			padding: 64rpx 40rpx;
			background: linear-gradient(145deg, #ffffff 0%, #f8fff0 100%);
			border-radius: 32rpx;
			box-shadow: 
				0 16rpx 48rpx rgba(139, 148, 103, 0.08),
				0 4rpx 16rpx rgba(0, 0, 0, 0.04);
			border: 2rpx solid rgba(139, 148, 103, 0.1);
			position: relative;
			overflow: hidden;

			// 背景装饰
			&::before {
				content: '';
				position: absolute;
				top: -50%;
				left: -50%;
				width: 200%;
				height: 200%;
				background: 
					radial-gradient(circle at 20% 20%, rgba(139, 148, 103, 0.03) 0%, transparent 50%),
					radial-gradient(circle at 80% 80%, rgba(139, 148, 103, 0.03) 0%, transparent 50%);
				z-index: 0;
			}

			.header-decoration {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 32rpx;
				position: relative;
				z-index: 1;

				.decoration-line {
					height: 2rpx;
					background: linear-gradient(90deg, transparent 0%, #8b9467 50%, transparent 100%);
					
					&.left, &.right {
						width: 120rpx;
					}
					
					&.center {
						width: 80rpx;
					}
				}

				.decoration-symbol {
					color: #8b9467;
					font-size: 24rpx;
					margin: 0 16rpx;
					font-weight: bold;
				}
			}

			.main-title {
				font-size: 56rpx;
				font-weight: 800;
				color: #2c3e20;
				margin-bottom: 16rpx;
				letter-spacing: 6rpx;
				text-shadow: 0 2rpx 8rpx rgba(139, 148, 103, 0.1);
				position: relative;
				z-index: 1;
			}

			.sub-title {
				font-size: 32rpx;
				color: #8b9467;
				font-weight: 600;
				margin-bottom: 24rpx;
				letter-spacing: 3rpx;
				position: relative;
				z-index: 1;
			}

			.title-desc {
				font-size: 28rpx;
				color: #666;
				line-height: 1.6;
				font-weight: 400;
				letter-spacing: 2rpx;
				opacity: 0.9;
				position: relative;
				z-index: 1;
			}
		}
	}

	// 臻品展示区域
	.products-section {
		padding: 0 24rpx 40rpx;
		background: transparent;

		.product-card {
			margin-bottom: 32rpx;
			border-radius: 24rpx;
			overflow: hidden;
			background: linear-gradient(145deg, #ffffff 0%, #f8fff0 100%);
			box-shadow: 
				0 16rpx 48rpx rgba(139, 148, 103, 0.08),
				0 4rpx 16rpx rgba(0, 0, 0, 0.04);
			border: 2rpx solid rgba(139, 148, 103, 0.1);
			transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

			&:active {
				transform: scale(0.98);
			}

			.card-wrapper {
				position: relative;
				overflow: hidden;
			}

			.product-image-container {
				position: relative;
				height: 400rpx;
				overflow: hidden;

				.product-image {
					width: 100%;
					height: 100%;
					object-fit: cover;
					transition: transform 0.3s ease;
				}

				.image-overlay {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background: linear-gradient(transparent 40%, rgba(0, 0, 0, 0.1) 100%);
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					padding: 24rpx;

					.product-tag {
						background: linear-gradient(135deg, #8b9467 0%, #6d7a52 100%);
						color: #fff;
						padding: 12rpx 20rpx;
						border-radius: 20rpx;
						font-size: 24rpx;
						font-weight: 600;
						letter-spacing: 1rpx;
						box-shadow: 0 4rpx 12rpx rgba(139, 148, 103, 0.3);
					}

					.favorite-btn {
						width: 56rpx;
						height: 56rpx;
						border-radius: 50%;
						background: rgba(255, 255, 255, 0.9);
						backdrop-filter: blur(10rpx);
						display: flex;
						align-items: center;
						justify-content: center;
						transition: all 0.3s ease;

						&:active {
							transform: scale(0.9);
						}
					}
				}
			}

			.product-content {
				padding: 32rpx 24rpx;

				.product-header {
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					margin-bottom: 16rpx;

					.product-title {
						flex: 1;

						.product-name {
							display: block;
							font-size: 32rpx;
							font-weight: bold;
							color: #2c3e20;
							margin-bottom: 8rpx;
							letter-spacing: 1rpx;
						}

						.product-subtitle {
							display: block;
							font-size: 24rpx;
							color: #8b9467;
							font-weight: 500;
							letter-spacing: 1rpx;
						}
					}

					.sales-info {
						.sales-text {
							font-size: 22rpx;
							color: #999;
							background: rgba(139, 148, 103, 0.1);
							padding: 6rpx 12rpx;
							border-radius: 12rpx;
						}
					}
				}

				.product-description {
					color: #666;
					font-size: 26rpx;
					line-height: 1.5;
					margin-bottom: 24rpx;
					opacity: 0.9;
				}

				.product-footer {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.price-section {
						display: flex;
						align-items: baseline;
						gap: 8rpx;

						.current-price {
							font-size: 36rpx;
							font-weight: bold;
							color: #ff6b6b;
						}

						.original-price {
							font-size: 24rpx;
							color: #999;
							text-decoration: line-through;
						}

						.unit-text {
							font-size: 24rpx;
							color: #666;
						}
					}

					.action-section {
						.quantity-controls {
							display: flex;
							align-items: center;
							background: rgba(139, 148, 103, 0.1);
							border-radius: 24rpx;
							padding: 4rpx;

							.minus-btn, .plus-btn {
								width: 48rpx;
								height: 48rpx;
								border-radius: 50%;
								display: flex;
								align-items: center;
								justify-content: center;
								transition: all 0.3s ease;
							}

							.minus-btn {
								background: rgba(139, 148, 103, 0.2);
							}

							.plus-btn {
								background: #8b9467;
							}

							.quantity {
								min-width: 60rpx;
								text-align: center;
								font-size: 28rpx;
								font-weight: bold;
								color: #333;
							}
						}

						.add-btn {
							width: 64rpx;
							height: 64rpx;
							border-radius: 50%;
							background: linear-gradient(135deg, #8b9467 0%, #6d7a52 100%);
							display: flex;
							align-items: center;
							justify-content: center;
							box-shadow: 0 8rpx 20rpx rgba(139, 148, 103, 0.3);
							transition: all 0.3s ease;

							&:active {
								transform: scale(0.9);
							}
						}
					}
				}
			}
		}
	}

	// 动画关键帧
	@keyframes float {
		0%, 100% {
			transform: translateY(0px) scale(1);
			opacity: 0.3;
		}
		50% {
			transform: translateY(-20rpx) scale(1.05);
			opacity: 0.5;
		}
	}

	// 响应式设计
	@media screen and (max-width: 750rpx) {
		.page-background {
			.floating-elements {
				.element {
					&.element-1 {
						width: 200rpx;
						height: 200rpx;
					}

					&.element-2 {
						width: 150rpx;
						height: 150rpx;
					}

					&.element-3 {
						width: 180rpx;
						height: 180rpx;
					}
				}
			}
		}

		.header-section {
			padding: 40rpx 20rpx 32rpx;
			
			.traditional-frame {
				padding: 48rpx 32rpx;
			}
			
			.main-title {
				font-size: 48rpx;
				letter-spacing: 4rpx;
			}
			
			.sub-title {
				font-size: 26rpx;
			}
		}

		.banner-section {
			padding: 30rpx;

			.banner-swiper {
				height: 560rpx;

				.swiper-item {
					.banner-item {
						height: 460rpx;

						&.active {
							height: 560rpx;
							border-radius: 40rpx;
						}
					}
				}
			}
		}

		.market-section {
			margin: 64rpx 20rpx 32rpx;
			
			.section-header {
				padding: 48rpx 32rpx;
				
				.main-title {
					font-size: 48rpx;
					letter-spacing: 4rpx;
				}
				
				.sub-title {
					font-size: 28rpx;
				}
				
				.title-desc {
					font-size: 24rpx;
				}
			}
		}

		.products-section {
			padding: 0 20rpx 32rpx;

			.product-card {
				.product-image-container {
					height: 320rpx;
				}
				
				.product-content {
					padding: 24rpx 20rpx;
					
					.product-header {
						.product-title {
							.product-name {
								font-size: 28rpx;
							}
							
							.product-subtitle {
								font-size: 22rpx;
							}
						}
						
						.sales-info {
							.sales-text {
								font-size: 20rpx;
							}
						}
					}
					
					.product-description {
						font-size: 24rpx;
						margin-bottom: 20rpx;
					}
					
					.product-footer {
						.price-section {
							.current-price {
								font-size: 32rpx;
							}
						}
					}
				}
			}
		}
	}
</style>