<template>
	<BaseContainer>
		<view class="richtext-container">
			<!-- 顶部导航栏 -->
			<view class="header-nav">
				<view class="nav-left" @click="goBack">
					<u-icon name="arrow-left" color="#333" size="20"></u-icon>
				</view>
				<view class="nav-title">
					<text>雷波</text>
				</view>
				<view class="nav-right">
					<u-icon name="more-dot-fill" color="#333" size="20"></u-icon>
				</view>
			</view>

			<!-- 富文本内容区域 -->
			<view class="content-area">
				<view class="rich-text-container" v-if="!loading">
					<rich-text class="rich-text-content" :nodes="content"></rich-text>
				</view>
				<view class="loading-container" v-else>
					<view class="loading-text">加载中...</view>
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
				loading: true
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
</style>