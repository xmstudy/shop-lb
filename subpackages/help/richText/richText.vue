<template>
	<BaseContainer>
		<view class="richtext-container">
			<!-- 顶部导航栏 -->
			<!-- <view class="header-nav">
				<view class="nav-left" @click="goBack">
					<u-icon name="arrow-left" color="#333" size="20"></u-icon>
				</view>
				<view class="nav-title">
					<text>雷波</text>
				</view>
				<view class="nav-right">
					<u-icon name="more-dot-fill" color="#333" size="20"></u-icon>
				</view>
			</view> -->

			<!-- 富文本内容区域 -->
			<view class="content-area">
				<view class="rich-text-container" v-if="!loading">
					<rich-text class="rich-text-content" :nodes="content"></rich-text>
				</view>
				<view class="loading-container" v-else>
					<view class="loading-text">加载中...</view>
				</view>

				<!-- 商品列表区域 -->
				<view class="goods-section" v-if="goodsList.length > 0">
					<view class="goods-header">
						<view class="header-title">相关商品</view>
						<view class="header-desc">精选推荐</view>
					</view>
					
					<view class="goods-grid">
						<view class="goods-card" 
							v-for="(item, index) in goodsList" 
							:key="item.goodsId" 
							@click="goToGoodsDetail(item.goodsId)">
							
							<view class="goods-image-container">
								<image 
									class="goods-image" 
									:src="item.goodsImage" 
									mode="aspectFill" 
									:lazy-load="true"
									@load="onGoodsImageLoad(index)" 
									@error="onGoodsImageError(index)">
								</image>
								
								<view class="image-skeleton" v-if="!item.imageLoaded">
									<view class="skeleton-shimmer"></view>
								</view>
								
								<!-- 热销或推荐标签 -->
								<view class="goods-badge" v-if="item.isHot">
									<image class="badge-icon" src="/static/images/hot-icon.png" mode="aspectFit"></image>
								</view>
								<view class="goods-badge" v-else-if="item.isRecommend">
									<text class="badge-text">推荐</text>
								</view>
								
								<!-- 促销标签 -->
								<view class="promotion-badge" v-if="item.promotionPrice && item.promotionPrice < item.price">
									<image class="badge-icon" src="/static/images/saleicon.png" mode="aspectFit"></image>
								</view>
							</view>
							
							<view class="goods-content">
								<view class="goods-name">{{ item.goodsName }}</view>
								<view class="goods-selling-point" v-if="item.sellingPoint">{{ item.sellingPoint }}</view>
								
								<view class="goods-price-section">
									<view class="current-price">¥{{ item.promotionPrice || item.price }}</view>
									<view class="original-price" v-if="item.promotionPrice && item.promotionPrice < item.price">
										¥{{ item.price }}
									</view>
								</view>
								
								<view class="goods-stats">
									<text class="stat-item">销量: {{ item.virtualSoldNum || item.soldNum || 0 }}</text>
									<text class="stat-item">库存: {{ item.quantity || 0 }}</text>
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
		fetchArticleDetail
	} from '@/api/article'

	export default {
		name: 'RichText',
		components: {
			BaseContainer
		},
		data() {
			return {
				articleId: null,
				content: '',
				loading: true,
				goodsList: [] // 新增商品列表数据
			}
		},

		onLoad(options) {
			if (options.id) {
				this.articleId = options.id
				this.getArticleDetail()
			}
		},
		methods: {
			// 获取文章详情
			async getArticleDetail() {
				try {
					this.loading = true
					// TODO fetchArticleDetail 会在这里使用
					const res = await fetchArticleDetail(this.articleId)
					if (res.code == 200 && res.data) {

						this.content = res.data.content || res.data.description ||
							'<div style="padding: 20rpx;"><p style="color: #666;">暂无内容</p></div>'
						this.content = this.content.replace(
							/<img/gi,
							'<img style="max-width:100%;height:auto;display:block;"'
						);
						
						// 处理商品列表数据
						if (res.data.goodsList && res.data.goodsList.length > 0) {
							this.goodsList = res.data.goodsList.map(item => ({
								goodsId: item.goodsId,
								goodsCode: item.goodsCode,
								goodsName: item.goodsName,
								price: item.price,
								promotionPrice: item.promotionPrice,
								quantity: item.quantity,
								goodsImage: item.goodsImage,
								goodsImages: item.goodsImages,
								sellingPoint: item.sellingPoint,
								details: item.details,
								soldNum: item.soldNum,
								virtualSoldNum: item.virtualSoldNum,
								isHot: item.isHot,
								isRecommend: item.isRecommend,
								imageLoaded: false
							}));
						}
					} else {
						// 如果接口没有数据，使用默认内容
						console.log('文章详情接口无数据，使用默认内容')
						this.content =
							'<div style="padding: 20rpx;"><h3 style="color: #333; margin-bottom: 20rpx;">文章详情</h3><p style="color: #666; line-height: 1.6; margin-bottom: 16rpx;">这是一个示例富文本内容，您可以在这里展示文章的详细信息。</p><p style="color: #666; line-height: 1.6; margin-bottom: 16rpx;">富文本支持HTML标签，可以设置字体、颜色、大小、间距等样式。</p></div>'
					}
				} catch (error) {
					console.error('获取文章详情失败:', error)
					// 异常时使用默认内容
					this.content =
						'<div style="padding: 20rpx;"><h3 style="color: #333; margin-bottom: 20rpx;">加载失败</h3><p style="color: #666; line-height: 1.6;">内容加载失败，请稍后重试。</p></div>'
				} finally {
					this.loading = false
				}
			},

			goBack() {
				// 获取当前页面栈
				const pages = getCurrentPages()

				// 如果页面栈只有1页或者没有上一页，跳转到首页
				if (pages.length <= 1) {
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

			// 跳转商品详情页面
			goToGoodsDetail(goodsId) {
				uni.navigateTo({
					url: `/subpackages/goods/detail/detail?goodsId=${goodsId}`
				})
			},

			// 商品图片加载处理
			onGoodsImageLoad(index) {
				if (this.goodsList[index]) {
					this.$set(this.goodsList[index], 'imageLoaded', true);
				}
			},

			// 商品图片错误处理
			onGoodsImageError(index) {
				if (this.goodsList[index]) {
					this.$set(this.goodsList[index], 'imageLoaded', true);
					// 设置默认图片
					this.$set(this.goodsList[index], 'goodsImage', '/static/images/lbnt-img.png');
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.richtext-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	/* 顶部导航栏 */
	.header-nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 24rpx;
		background: #fff;
		border-bottom: 1rpx solid #f0f0f0;
		position: sticky;
		top: 0;
		z-index: 100;

		.nav-left {
			width: 60rpx;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.nav-title {
			flex: 1;
			text-align: center;

			text {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
			}
		}

		.nav-right {
			width: 60rpx;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	/* 内容区域 */
	.content-area {
		flex: 1;
		padding: 24rpx;
		background: #fff;

		.rich-text-container {
			min-height: 400rpx;
			background: #fff;
			border-radius: 12rpx;
			overflow: hidden;
			word-wrap: break-word;
			word-break: break-all;

			.rich-text-content img {
				max-width: 100% !important;
				height: auto !important;
				display: block;
			}

			.rich-text-content {
				width: 100%;
				line-height: 1.6;

				/* 富文本内图片自适应 */
				:deep(img) {
					max-width: 100% !important;
					height: auto !important;
					display: block;
					margin: 16rpx auto;
					border-radius: 8rpx;
					box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
				}

				/* 富文本内段落样式优化 */
				:deep(p) {
					margin: 16rpx 0;
					line-height: 1.8;
					color: #333;
					font-size: 28rpx;
				}

				/* 富文本内标题样式 */
				:deep(h1),
				:deep(h2),
				:deep(h3),
				:deep(h4),
				:deep(h5),
				:deep(h6) {
					margin: 24rpx 0 16rpx 0;
					color: #333;
					font-weight: 600;
					line-height: 1.4;
				}

				:deep(h1) {
					font-size: 36rpx;
				}

				:deep(h2) {
					font-size: 34rpx;
				}

				:deep(h3) {
					font-size: 32rpx;
				}

				:deep(h4) {
					font-size: 30rpx;
				}

				:deep(h5) {
					font-size: 28rpx;
				}

				:deep(h6) {
					font-size: 26rpx;
				}

				/* 富文本内列表样式 */
				:deep(ul),
				:deep(ol) {
					margin: 16rpx 0;
					padding-left: 32rpx;
				}

				:deep(li) {
					margin: 8rpx 0;
					line-height: 1.6;
					color: #333;
					font-size: 28rpx;
				}

				/* 富文本内表格样式 */
				:deep(table) {
					width: 100%;
					border-collapse: collapse;
					margin: 16rpx 0;
					border: 1rpx solid #e0e0e0;
					border-radius: 8rpx;
					overflow: hidden;
				}

				:deep(th),
				:deep(td) {
					padding: 12rpx 16rpx;
					border: 1rpx solid #e0e0e0;
					text-align: left;
					font-size: 26rpx;
				}

				:deep(th) {
					background: #f5f5f5;
					font-weight: 600;
					color: #333;
				}

				:deep(td) {
					color: #666;
				}

				/* 富文本内链接样式 */
				:deep(a) {
					color: #009966;
					text-decoration: none;
				}

				/* 富文本内代码样式 */
				:deep(code) {
					background: #f5f5f5;
					padding: 4rpx 8rpx;
					border-radius: 4rpx;
					font-family: 'Courier New', monospace;
					font-size: 24rpx;
					color: #e91e63;
				}

				:deep(pre) {
					background: #f5f5f5;
					padding: 16rpx;
					border-radius: 8rpx;
					overflow-x: auto;
					margin: 16rpx 0;

					code {
						background: none;
						padding: 0;
						color: #333;
					}
				}

				/* 富文本内引用样式 */
				:deep(blockquote) {
					margin: 16rpx 0;
					padding: 16rpx 20rpx;
					background: #f9f9f9;
					border-left: 6rpx solid #009966;
					border-radius: 0 8rpx 8rpx 0;

					p {
						margin: 0;
						color: #666;
						font-style: italic;
					}
				}

				/* 富文本内分割线样式 */
				:deep(hr) {
					border: none;
					height: 2rpx;
					background: linear-gradient(90deg, transparent, #e0e0e0, transparent);
					margin: 32rpx 0;
				}
			}
		}
	}

	/* 加载状态 */
	.loading-container {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 400rpx;

		.loading-text {
			font-size: 28rpx;
			color: #999;
		}
	}

	/* 商品列表区域 */
	.goods-section {
		margin-top: 32rpx;
		padding-top: 32rpx;
		border-top: 1rpx solid #f0f0f0;
	}

	.goods-header {
		text-align: center;
		margin-bottom: 32rpx;

		.header-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 8rpx;
		}

		.header-desc {
			font-size: 24rpx;
			color: #999;
		}
	}

	.goods-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 24rpx;
	}

	.goods-card {
		background: #fff;
		border-radius: 16rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;

		&:active {
			transform: scale(0.98);
		}
	}

	.goods-image-container {
		position: relative;
		width: 100%;
		height: 300rpx;
	}

	.goods-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.goods-badge {
		position: absolute;
		top: 12rpx;
		left: 12rpx;
		z-index: 2;

		.badge-icon {
			width: 48rpx;
			height: 48rpx;
		}

		.badge-text {
			background: #ff4757;
			color: #fff;
			font-size: 20rpx;
			padding: 4rpx 12rpx;
			border-radius: 12rpx;
			font-weight: bold;
		}
	}

	.promotion-badge {
		position: absolute;
		top: 12rpx;
		right: 12rpx;
		z-index: 2;

		.badge-icon {
			width: 48rpx;
			height: 48rpx;
		}
	}

	.goods-content {
		padding: 24rpx;
	}

	.goods-name {
		font-size: 28rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 8rpx;
		line-height: 1.4;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
		min-height: 78rpx;
	}

	.goods-selling-point {
		font-size: 24rpx;
		color: #666;
		margin-bottom: 16rpx;
		line-height: 1.4;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
		min-height: 67rpx;
	}

	.goods-price-section {
		display: flex;
		align-items: center;
		gap: 12rpx;
		margin-bottom: 12rpx;

		.current-price {
			font-size: 32rpx;
			font-weight: bold;
			color: #ff4757;
		}

		.original-price {
			font-size: 24rpx;
			color: #999;
			text-decoration: line-through;
		}
	}

	.goods-stats {
		display: flex;
		align-items: center;
		gap: 24rpx;

		.stat-item {
			font-size: 22rpx;
			color: #999;
		}
	}

	/* 商品图片骨架屏 */
	.skeleton-shimmer {
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, #f0f4f8 25%, #e2e8f0 50%, #f0f4f8 75%);
		background-size: 200% 100%;
		animation: skeleton-loading 1.8s infinite ease-in-out;
	}

	@keyframes skeleton-loading {
		0% {
			background-position: 200% 0;
		}

		100% {
			background-position: -200% 0;
		}
	}
</style>