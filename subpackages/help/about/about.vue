<template>
	<view class="about-container">
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
</template>

<script>
	export default {
		name: 'HelpAbout',
		data() {
			return {
				content: '',
				loading: true
			}
		},

		mounted() {
			this.loadAboutContent()
		},

		methods: {
			// 加载关于我们内容
			loadAboutContent() {
				try {
					this.loading = true
					// 使用默认的关于我们内容
					this.content = `
						<div style="padding: 30rpx; line-height: 1.8;">
							<div style="text-align: center; margin-bottom: 40rpx;">
								<h2 style="color: #333; font-size: 36rpx; margin-bottom: 20rpx; font-weight: 600;">雷波农特</h2>
								<p style="color: #666; font-size: 26rpx;">专注优质农产品，连接美好生活</p>
							</div>
							
							<div style="margin-bottom: 40rpx;">
								<h3 style="color: #333; font-size: 32rpx; margin-bottom: 20rpx; font-weight: 600; border-left: 4rpx solid #009966; padding-left: 16rpx;">公司简介</h3>
								<p style="color: #666; font-size: 28rpx; line-height: 1.8; margin-bottom: 16rpx;">雷波农特致力于为消费者提供优质、健康、安全的农产品。我们深入原产地，严选每一份食材，用心连接田间地头与千家万户的餐桌。</p>
								<p style="color: #666; font-size: 28rpx; line-height: 1.8;">通过科技赋能农业，我们建立了完善的供应链体系，确保产品从源头到餐桌的全程品质保障。</p>
							</div>
							
							<div style="margin-bottom: 40rpx;">
								<h3 style="color: #333; font-size: 32rpx; margin-bottom: 20rpx; font-weight: 600; border-left: 4rpx solid #009966; padding-left: 16rpx;">我们的使命</h3>
								<ul style="color: #666; font-size: 28rpx; line-height: 1.8; padding-left: 32rpx;">
									<li style="margin-bottom: 12rpx;">为消费者提供优质安全的农产品</li>
									<li style="margin-bottom: 12rpx;">帮助农民增收致富，振兴乡村经济</li>
									<li style="margin-bottom: 12rpx;">推动农业现代化发展</li>
									<li style="margin-bottom: 12rpx;">建设可持续的绿色生态系统</li>
								</ul>
							</div>
							
							<div style="margin-bottom: 40rpx;">
								<h3 style="color: #333; font-size: 32rpx; margin-bottom: 20rpx; font-weight: 600; border-left: 4rpx solid #009966; padding-left: 16rpx;">核心优势</h3>
								<div style="display: flex; flex-wrap: wrap; gap: 20rpx;">
									<div style="flex: 1; min-width: 280rpx; background: #f8f9fa; padding: 24rpx; border-radius: 12rpx; border-left: 4rpx solid #009966;">
										<h4 style="color: #333; font-size: 28rpx; margin-bottom: 12rpx; font-weight: 600;">原产地直采</h4>
										<p style="color: #666; font-size: 26rpx; line-height: 1.6;">深入全国优质农产品原产地，与当地农户建立长期合作关系。</p>
									</div>
									<div style="flex: 1; min-width: 280rpx; background: #f8f9fa; padding: 24rpx; border-radius: 12rpx; border-left: 4rpx solid #FF6B35;">
										<h4 style="color: #333; font-size: 28rpx; margin-bottom: 12rpx; font-weight: 600;">品质保障</h4>
										<p style="color: #666; font-size: 26rpx; line-height: 1.6;">建立完善的质量检测体系，确保每一件产品都符合高标准。</p>
									</div>
									<div style="flex: 1; min-width: 280rpx; background: #f8f9fa; padding: 24rpx; border-radius: 12rpx; border-left: 4rpx solid #34C759;">
										<h4 style="color: #333; font-size: 28rpx; margin-bottom: 12rpx; font-weight: 600;">冷链物流</h4>
										<p style="color: #666; font-size: 26rpx; line-height: 1.6;">专业的冷链运输网络，保证产品新鲜度和营养价值。</p>
									</div>
									<div style="flex: 1; min-width: 280rpx; background: #f8f9fa; padding: 24rpx; border-radius: 12rpx; border-left: 4rpx solid #007AFF;">
										<h4 style="color: #333; font-size: 28rpx; margin-bottom: 12rpx; font-weight: 600;">贴心服务</h4>
										<p style="color: #666; font-size: 26rpx; line-height: 1.6;">专业客服团队，提供7×24小时优质服务体验。</p>
									</div>
								</div>
							</div>
							
							<div style="margin-bottom: 40rpx;">
								<h3 style="color: #333; font-size: 32rpx; margin-bottom: 20rpx; font-weight: 600; border-left: 4rpx solid #009966; padding-left: 16rpx;">联系方式</h3>
								<div style="background: #f8f9fa; padding: 24rpx; border-radius: 12rpx;">
									<p style="color: #666; font-size: 28rpx; line-height: 1.8; margin-bottom: 12rpx;"><strong style="color: #333;">客服热线：</strong>400-123-4567</p>
									<p style="color: #666; font-size: 28rpx; line-height: 1.8; margin-bottom: 12rpx;"><strong style="color: #333;">服务时间：</strong>周一至周日 9:00-21:00</p>
									<p style="color: #666; font-size: 28rpx; line-height: 1.8; margin-bottom: 12rpx;"><strong style="color: #333;">官方邮箱：</strong>service@lbnt.com</p>
									<p style="color: #666; font-size: 28rpx; line-height: 1.8;"><strong style="color: #333;">公司地址：</strong>四川省凉山州雷波县农业产业园区</p>
								</div>
							</div>
							
							<div style="text-align: center; padding: 40rpx 0; border-top: 1rpx solid #e0e0e0;">
								<p style="color: #999; font-size: 24rpx;">© 2024 雷波农特 版权所有</p>
								<p style="color: #999; font-size: 24rpx; margin-top: 8rpx;">让优质农产品走向千家万户</p>
							</div>
						</div>
					`
				} catch (error) {
					console.error('加载关于我们内容失败:', error)
					this.content = '<div style="padding: 20rpx;"><p style="color: #666;">内容加载失败，请稍后重试。</p></div>'
				} finally {
					this.loading = false
				}
			},

			goBack() {
				// 获取当前页面栈
				const pages = getCurrentPages()
				
				// 如果页面栈只有1页或者没有上一页，跳转到首页
				if (pages.length <= 1) {
					// 设置全局下标为3（个人中心）
					if (getApp().globalData) {
						getApp().globalData.activeTabbarKey = 3
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.about-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: #fff;
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
		background: #fff;

		.rich-text-container {
			min-height: 400rpx;
			background: #fff;
			overflow: hidden;
			word-wrap: break-word;
			word-break: break-all;

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

				/* 富文本内强调文本 */
				:deep(strong) {
					font-weight: 600;
					color: #333;
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