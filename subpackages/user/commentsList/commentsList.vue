<template>
	<view class="comments-list-page">
		<!-- 状态栏 -->
		<view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
		
		<!-- 导航栏 -->
		<view class="nav-bar">
			<view class="nav-content">
				<view class="nav-left" @click="goBack">
					<u-icon name="arrow-left" size="20" color="#333"></u-icon>
				</view>
				<view class="nav-title">我的评价</view>
				<view class="nav-right"></view>
			</view>
		</view>

		<!-- 评论列表 -->
		<scroll-view class="comments-container" scroll-y refresher-enabled :refresher-triggered="refreshing"
			@refresherrefresh="onRefresh" @scrolltolower="onLoadMore">
			
			<!-- 评论统计 -->
			<view class="comments-stats" v-if="statsData">
				<view class="stats-card">
					<view class="stats-item">
						<text class="stats-number">{{ statsData.totalCount }}</text>
						<text class="stats-label">总评价</text>
					</view>
					<view class="stats-divider"></view>
					<view class="stats-item">
						<text class="stats-number">{{ statsData.recentCount }}</text>
						<text class="stats-label">本月评价</text>
					</view>
				</view>
			</view>

			<!-- 评论列表 -->
			<view class="comments-list" v-if="commentsList.length > 0">
				<view class="comment-item" v-for="(comment, index) in commentsList" :key="index">
					<!-- 商品信息 -->
					<view class="product-info" @click="goToProductDetail(comment.goodsId)">
						<image class="product-image" :src="comment.goodsImage" mode="aspectFill"></image>
						<view class="product-details">
							<text class="product-name">{{ comment.goodsName }}</text>
							<view class="product-price">
								<text class="price-symbol">¥</text>
								<text class="price-value">{{ comment.goodsPrice }}</text>
							</view>
						</view>
						<view class="nav-arrow">
							<u-icon name="arrow-right" size="14" color="#ccc"></u-icon>
						</view>
					</view>

					<!-- 评价内容 -->
					<view class="comment-content">
						<!-- 评分和时间 -->
						<view class="comment-header">
							<view class="rating-stars">
								<u-icon v-for="star in 5" :key="star" name="star-fill"
									:color="star <= comment.rating ? '#ffa500' : '#e0e0e0'" size="16"></u-icon>
							</view>
							<text class="comment-time">{{ formatTime(comment.createTime) }}</text>
						</view>

						<!-- 评价文字 -->
						<view class="comment-text" v-if="comment.content">
							<text>{{ comment.content }}</text>
						</view>

						<!-- 评价图片 -->
						<view class="comment-images" v-if="comment.images && comment.images.length > 0">
							<image v-for="(img, imgIndex) in comment.images" :key="imgIndex" class="comment-image"
								:src="img" mode="aspectFill" @click="previewImage(comment.images, imgIndex)">
							</image>
						</view>

						<!-- 商家回复 -->
						<view class="merchant-reply" v-if="comment.merchantReply">
							<view class="reply-header">
								<text class="reply-label">商家回复</text>
							</view>
							<view class="reply-content">
								<text>{{ comment.merchantReply }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 空状态 -->
			<view class="empty-state" v-if="!loading && commentsList.length === 0">
				<image class="empty-image" src="/static/images/empty-comment.png" mode="aspectFit"></image>
				<text class="empty-text">还没有评价记录</text>
				<text class="empty-tip">快去购买商品并评价吧~</text>
			</view>

			<!-- 加载更多 -->
			<view class="load-more" v-if="hasMore && commentsList.length > 0">
				<u-loading-icon v-if="loadingMore"></u-loading-icon>
				<text>{{ loadingMore ? '加载中...' : '上拉加载更多' }}</text>
			</view>

			<!-- 没有更多 -->
			<view class="no-more" v-if="!hasMore && commentsList.length > 0">
				<text>没有更多评价了</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { getUserCommentsList } from '@/api/goods'
	
	export default {
		name: 'CommentsList',
		data() {
			return {
				// 系统信息
				statusBarHeight: 0,

				// 数据状态
				loading: false,
				refreshing: false,
				loadingMore: false,
				hasMore: true,
				
				// 分页
				currentPage: 1,
				pageSize: 10,

				// 评论数据
				commentsList: [],
				statsData: null,

				// 用户信息
				userInfo: null
			}
		},

		onLoad() {
			this.initPage()
		},

		methods: {
			// 初始化页面
			async initPage() {
				// 获取系统信息
				const sys = uni.getSystemInfoSync()
				this.statusBarHeight = sys.statusBarHeight || 0

				// 获取用户信息
				this.getUserInfo()

				// 加载数据
				await this.loadCommentsData()
			},

			// 获取用户信息
			getUserInfo() {
				try {
					const userInfo = uni.getStorageSync('userInfo')
					if (userInfo) {
						this.userInfo = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo
					} else {
						uni.showToast({
							title: '请先登录',
							icon: 'none'
						})
						// 可以在这里跳转到登录页面
					}
				} catch (error) {
					console.error('获取用户信息失败:', error)
				}
			},

			// 加载评论数据
			async loadCommentsData(refresh = false) {
				if (this.loading || this.loadingMore) return

				if (refresh) {
					this.refreshing = true
					this.currentPage = 1
					this.hasMore = true
				} else if (this.currentPage === 1) {
					this.loading = true
				} else {
					this.loadingMore = true
				}

				try {
					// TODO getUserCommentsList 会在这里使用
					const res = await getUserCommentsList({
						page: this.currentPage,
						pageSize: this.pageSize,
						userId: this.userInfo?.userId || this.userInfo?.id
					})

					let mockData
					if (res.code === 200 && res.data) {
						// 使用真实API数据
						mockData = {
							list: res.data.list || [],
							stats: res.data.stats || null
						}
					} else {
						// 回退到模拟数据
						mockData = await this.getMockCommentsData()
					}

					if (refresh || this.currentPage === 1) {
						this.commentsList = mockData.list
						this.statsData = mockData.stats
					} else {
						this.commentsList.push(...mockData.list)
					}

					// 判断是否还有更多数据
					this.hasMore = mockData.list.length >= this.pageSize
					
					if (this.hasMore) {
						this.currentPage++
					}

				} catch (error) {
					console.error('加载评论数据失败:', error)
					uni.showToast({
						title: '加载失败，请重试',
						icon: 'none'
					})
				} finally {
					this.loading = false
					this.refreshing = false
					this.loadingMore = false
				}
			},

			// 模拟评论数据
			async getMockCommentsData() {
				return new Promise((resolve) => {
					setTimeout(() => {
						const mockComments = [
							{
								id: 1,
								goodsId: '1001',
								goodsName: '苹果iPhone 15 Pro Max 256GB 自然钛色',
								goodsImage: 'https://img.alicdn.com/imgextra/i1/123456789/example1.jpg',
								goodsPrice: 9999,
								rating: 5,
								content: '手机非常好用，运行流畅，拍照效果很棒，值得推荐！',
								images: [
									'https://img.alicdn.com/imgextra/i1/123456789/review1.jpg',
									'https://img.alicdn.com/imgextra/i2/123456789/review2.jpg'
								],
								createTime: '2024-01-15 14:30:00',
								merchantReply: '感谢您的好评，我们会继续努力为您提供优质的产品和服务！'
							},
							{
								id: 2,
								goodsId: '1002',
								goodsName: '华为Mate 60 Pro 12GB+512GB 雅川青',
								goodsImage: 'https://img.alicdn.com/imgextra/i2/123456789/example2.jpg',
								goodsPrice: 6999,
								rating: 4,
								content: '整体不错，系统流畅，电池续航很好。',
								images: [],
								createTime: '2024-01-10 16:20:00',
								merchantReply: null
							}
						]

						const stats = {
							totalCount: 25,
							recentCount: 8
						}

						resolve({
							list: this.currentPage === 1 ? mockComments : [],
							stats: stats
						})
					}, 800)
				})
			},

			// 下拉刷新
			async onRefresh() {
				await this.loadCommentsData(true)
			},

			// 上拉加载更多
			async onLoadMore() {
				if (this.hasMore && !this.loadingMore) {
					await this.loadCommentsData()
				}
			},

			// 格式化时间
			formatTime(timeStr) {
				const now = new Date()
				const time = new Date(timeStr)
				const diff = now - time
				const days = Math.floor(diff / (1000 * 60 * 60 * 24))

				if (days === 0) {
					return '今天'
				} else if (days === 1) {
					return '昨天'
				} else if (days < 30) {
					return `${days}天前`
				} else {
					return timeStr.split(' ')[0]
				}
			},

			// 预览图片
			previewImage(images, index) {
				uni.previewImage({
					current: index,
					urls: images
				})
			},

			// 跳转到商品详情
			goToProductDetail(goodsId) {
				uni.navigateTo({
					url: `/subpackages/goods/detail/detail?goodsId=${goodsId}`
				})
			},

			// 返回上一页
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comments-list-page {
		height: 100vh;
		background: #f5f5f5;
		display: flex;
		flex-direction: column;
	}

	/* 状态栏 */
	.status-bar {
		background: #fff;
	}

	/* 导航栏 */
	.nav-bar {
		background: #fff;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.nav-content {
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
	}

	.nav-left,
	.nav-right {
		width: 60rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-title {
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
	}

	/* 主要内容区域 */
	.comments-container {
		flex: 1;
		height: 0;
	}

	/* 评论统计 */
	.comments-stats {
		padding: 30rpx;
		background: #f5f5f5;
	}

	.stats-card {
		background: #fff;
		border-radius: 16rpx;
		padding: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 60rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
	}

	.stats-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12rpx;
	}

	.stats-number {
		font-size: 48rpx;
		font-weight: 700;
		color: #1890ff;
	}

	.stats-label {
		font-size: 24rpx;
		color: #666;
	}

	.stats-divider {
		width: 1rpx;
		height: 60rpx;
		background: #e9ecef;
	}

	/* 评论列表 */
	.comments-list {
		background: #fff;
		margin: 0 30rpx 30rpx 30rpx;
		border-radius: 16rpx;
		overflow: hidden;
	}

	.comment-item {
		border-bottom: 1rpx solid #f8f9fa;
		
		&:last-child {
			border-bottom: none;
		}
	}

	/* 商品信息 */
	.product-info {
		display: flex;
		align-items: center;
		padding: 30rpx;
		gap: 20rpx;
		background: #fafbfc;
	}

	.product-image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 12rpx;
	}

	.product-details {
		flex: 1;
	}

	.product-name {
		font-size: 28rpx;
		color: #333;
		font-weight: 600;
		line-height: 1.4;
		margin-bottom: 16rpx;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.product-price {
		display: flex;
		align-items: baseline;

		.price-symbol {
			font-size: 20rpx;
			color: #ff4d4f;
			margin-right: 4rpx;
		}

		.price-value {
			font-size: 28rpx;
			color: #ff4d4f;
			font-weight: 600;
		}
	}

	.nav-arrow {
		padding: 8rpx;
	}

	/* 评价内容 */
	.comment-content {
		padding: 30rpx;
	}

	.comment-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.rating-stars {
		display: flex;
		gap: 4rpx;
	}

	.comment-time {
		font-size: 24rpx;
		color: #999;
	}

	.comment-text {
		margin-bottom: 20rpx;
		
		text {
			font-size: 28rpx;
			color: #333;
			line-height: 1.6;
		}
	}

	.comment-images {
		display: flex;
		gap: 16rpx;
		flex-wrap: wrap;
		margin-bottom: 20rpx;
	}

	.comment-image {
		width: 160rpx;
		height: 160rpx;
		border-radius: 12rpx;
	}

	/* 商家回复 */
	.merchant-reply {
		background: #f8f9fa;
		border-radius: 12rpx;
		padding: 20rpx;
		border-left: 4rpx solid #1890ff;
	}

	.reply-header {
		margin-bottom: 12rpx;
	}

	.reply-label {
		font-size: 24rpx;
		color: #1890ff;
		font-weight: 600;
	}

	.reply-content {
		text {
			font-size: 26rpx;
			color: #666;
			line-height: 1.5;
		}
	}

	/* 空状态 */
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 120rpx 60rpx;
		text-align: center;
	}

	.empty-image {
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 40rpx;
		opacity: 0.6;
	}

	.empty-text {
		font-size: 32rpx;
		color: #666;
		margin-bottom: 16rpx;
		display: block;
	}

	.empty-tip {
		font-size: 26rpx;
		color: #999;
		display: block;
	}

	/* 加载状态 */
	.load-more,
	.no-more {
		padding: 40rpx;
		text-align: center;
		
		text {
			font-size: 24rpx;
			color: #999;
		}
	}

	.load-more {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 16rpx;
	}
</style>
