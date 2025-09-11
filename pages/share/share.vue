<template>
	<view class="share-container">
		<!-- 顶部Header -->
		<view class="header" :style="{ top: capsuleTopDistance + 'rpx' }">
			<view class="header-left">
				<view class="back-btn" @click="goBack">
					<u-icon name="arrow-left" color="#333" size="20"></u-icon>
				</view>
			</view>
			<view class="header-right">
				<view class="header-btn" @click="goToHome">
					<u-icon name="home" color="#333" size="20"></u-icon>
				</view>
			</view>
		</view>

		<!-- 主内容区域 -->
		<view class="main-content">
			<!-- 1. 主图区域 -->
			<view class="hero-section">
				<image class="hero-image" :src="shareData.heroImage" mode="aspectFill"></image>
				<view class="hero-overlay">
					<view class="hero-title">
						<text>{{ shareData.title }}</text>
					</view>
					<view class="hero-subtitle">
						<text>{{ shareData.subtitle }}</text>
					</view>
				</view>
			</view>

			<!-- 2. 介绍内容区域 -->
			<view class="intro-section">
				<view class="intro-header">
					<view class="intro-title">
						<text>风土人情</text>
					</view>
					<view class="intro-subtitle">
						<text>Discover the Local Culture</text>
					</view>
				</view>
				<view class="intro-content">
					<text>{{ shareData.introduction }}</text>
				</view>
				<view class="feature-list">
					<view class="feature-item" v-for="(feature, index) in shareData.features" :key="index">
						<view class="feature-icon">
							<u-icon :name="feature.icon" color="#89D600" size="24"></u-icon>
						</view>
						<view class="feature-text">
							<text>{{ feature.text }}</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 3. 底部按钮区域 -->
			<view class="bottom-section">
				<view class="action-btn" @click="exploreLeibo">
					<text>探索雷波好物</text>
					<u-icon name="arrow-right" color="#fff" size="16"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'SharePage',
		data() {
			return {
				capsuleTopDistance: 20,
				shareData: {
					title: '雷波脐橙',
					subtitle: '来自大凉山的甜蜜馈赠',
					heroImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
					introduction: '雷波县位于四川省凉山彝族自治州，这里山清水秀，气候宜人，是著名的"中国脐橙之乡"。得天独厚的地理环境和气候条件，孕育出了品质优良的雷波脐橙。这里的脐橙不仅果形美观、皮薄多汁，更以其独特的甜酸口感和丰富的营养价值而闻名。每一颗雷波脐橙都承载着大凉山人民的勤劳与智慧，是这片土地最珍贵的馈赠。',
					features: [
						{ icon: 'map-pin', text: '产地直供，新鲜采摘' },
						{ icon: 'star', text: '品质优良，口感极佳' },
						{ icon: 'heart', text: '营养丰富，健康美味' },
						{ icon: 'gift', text: '送礼佳品，情意满满' }
					]
				}
			}
		},
		mounted() {
			this.initCapsulePosition()
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			goToHome() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			initCapsulePosition() {
				this.capsuleTopDistance = this.getCapsuleTopDistance()
			},
			getCapsuleTopDistance() {
				try {
					const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
					return menuButtonInfo.top
				} catch (error) {
					return 20
				}
			},
			exploreLeibo() {
				uni.showToast({
					title: '即将为您展示更多雷波好物',
					icon: 'success'
				})
				// 这里可以跳转到商品列表页面
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/AsView/AsView'
					})
				}, 1500)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.share-container {
		min-height: 100vh;
		background: #fafafa;
		position: relative;
	}

	/* 顶部Header */
	.header {
		position: absolute;
		top: 20rpx;
		left: 0;
		right: 0;
		background: transparent;
		padding: 12rpx 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 1000;
	}

	.header-left {
		display: flex;
		align-items: center;
	}

	.back-btn {
		padding: 8rpx;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10rpx);
		transition: background-color 0.2s ease;
	}

	.back-btn:active {
		background: rgba(255, 255, 255, 0.7);
	}

	.header-right {
		display: flex;
		align-items: center;
	}

	.header-btn {
		padding: 8rpx;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10rpx);
		transition: background-color 0.2s ease;
	}

	.header-btn:active {
		background: rgba(255, 255, 255, 0.7);
	}

	/* 主内容区域 */
	.main-content {
		display: flex;
		flex-direction: column;
	}

	/* 主图区域 */
	.hero-section {
		position: relative;
		height: 600rpx;
		overflow: hidden;
	}

	.hero-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.hero-overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
		padding: 60rpx 24rpx 40rpx;
	}

	.hero-title {
		margin-bottom: 16rpx;
	}

	.hero-title text {
		font-size: 48rpx;
		color: #ffffff;
		font-weight: 700;
		text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
	}

	.hero-subtitle {
		text-align: center;
	}

	.hero-subtitle text {
		font-size: 28rpx;
		color: rgba(255, 255, 255, 0.9);
		font-weight: 500;
		text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
	}

	/* 介绍内容区域 */
	.intro-section {
		background: #ffffff;
		margin: 24rpx;
		padding: 40rpx 32rpx;
		border-radius: 20rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
	}

	.intro-header {
		text-align: center;
		margin-bottom: 32rpx;
	}

	.intro-title {
		margin-bottom: 8rpx;
	}

	.intro-title text {
		font-size: 36rpx;
		color: #333333;
		font-weight: 700;
	}

	.intro-subtitle {
		text-align: center;
	}

	.intro-subtitle text {
		font-size: 24rpx;
		color: #999999;
		font-weight: 400;
	}

	.intro-content {
		margin-bottom: 40rpx;
		padding: 24rpx 0;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.intro-content text {
		font-size: 28rpx;
		color: #666666;
		line-height: 1.8;
		text-align: justify;
	}

	.feature-list {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 24rpx;
	}

	.feature-item {
		display: flex;
		align-items: center;
		gap: 16rpx;
		padding: 20rpx;
		background: rgba(137, 214, 0, 0.05);
		border-radius: 12rpx;
		border: 1rpx solid rgba(137, 214, 0, 0.1);
	}

	.feature-icon {
		flex-shrink: 0;
	}

	.feature-text text {
		font-size: 26rpx;
		color: #333333;
		font-weight: 500;
	}

	/* 底部按钮区域 */
	.bottom-section {
		padding: 40rpx 24rpx;
		background: #ffffff;
		margin-top: 24rpx;
	}

	.action-btn {
		background: linear-gradient(135deg, #89D600 0%, #9EE600 100%);
		padding: 24rpx 32rpx;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12rpx;
		box-shadow: 0 8rpx 24rpx rgba(137, 214, 0, 0.3);
		transition: all 0.3s ease;
	}

	.action-btn:active {
		transform: scale(0.98);
		box-shadow: 0 4rpx 16rpx rgba(137, 214, 0, 0.3);
	}

	.action-btn text {
		font-size: 32rpx;
		color: #ffffff;
		font-weight: 600;
	}
</style>
