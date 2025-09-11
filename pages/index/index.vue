	<template>
		<view class="">
			<!-- 页面内容区条件渲染 -->
			<view v-if="currentTab === 0">
				<!-- 首页内容区，可放原有首页内容 -->
				<Home @switchTab="onHomeSwitchTab" />
			</view>
			<view v-if="currentTab === 1">
				<!-- Tab2内容区 -->
				<AsView />
			</view>
			<view v-if="currentTab === 2">
				<!-- Tab3内容区 -->
				<Cart />
			</view>
			<view v-if="currentTab === 3">
				<!-- Tab4内容区 -->
				<RmView />
			</view>
			<view v-if="currentTab === 4">
				<!-- Tab5内容区 -->
				<mine ref="mineComponent" />
			</view>
			<Tabbar @change="onTabChange" :current="currentTab" />
		</view>
	</template>

	<script>
		import Tabbar from '@/components/Tabbar.vue'
		import Home from '@/pages/home/home.vue'
		import Cart from '@/pages/Cart/Cart.vue'
		import RmView from '@/pages/RmVIew/RmVIew.vue'
		import AsView from '@/pages/AsView/AsView.vue'
		import mine from '@/pages/mine/mine.vue'
		export default {
			components: {
				Tabbar,
				Home,
				Cart,
				RmView,
				AsView,
				mine
			},
			data() {
				return {
					currentTab: 0, // 当前选中的tab索引
				}
			},
			onShow() {
				console.log('show', getApp().globalData);
				if (getApp().globalData) {
					this.currentTab = getApp().globalData.activeTabbarKey;
				} else {
					this.currentTab = 0
				}
				
				// 页面显示时滚动到顶部
				this.scrollToTop()
				
				// 如果当前激活的是mine页面(tab 4)，刷新用户数据
				if (this.currentTab === 4) {
					this.$nextTick(() => {
						if (this.$refs.mineComponent) {
							this.$refs.mineComponent.refreshUserData()
						}
					})
				}
			},
			methods: {
				onTabChange(index) {
					console.log(index);
					this.currentTab = index;
					
					// 切换tab时滚动到顶部
					this.scrollToTop()
					
					// 更新globalData
					if (getApp().globalData) {
						getApp().globalData.activeTabbarKey = index;
					}
					
					// 如果切换到mine页面(tab 4)，刷新用户数据
					if (index === 4) {
						this.$nextTick(() => {
							if (this.$refs.mineComponent) {
								this.$refs.mineComponent.refreshUserData()
							}
						})
					}
				},
				
				// 处理Home组件的tab切换事件
				onHomeSwitchTab(tabIndex) {
					console.log('Home组件请求切换到tab:', tabIndex);
					// 直接调用onTabChange方法来切换tab
					this.onTabChange(tabIndex);
				},
				
				// 滚动到页面顶部
				scrollToTop() {
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 300 // 动画时长，单位ms
					})
				}
			}
		}
	</script>

	<style lang="scss">
		.container {
			background: linear-gradient(to bottom,
					#a6e22e 0%,
					#a6e22e 64%,
					#fff 70%,
					#fff 100%);
			height: 100vh;
		}
	</style>

	<style lang="scss" scoped>
		.page-container {
			box-sizing: border-box;
		}

		.notice-bar-gap {
			margin: 24rpx 0;
		}

		/* 顶部导航栏 */
		.navbar {
			width: 100%;
			display: flex;
			flex-direction: column;

			.logo-block {
				position: absolute;
				left: 46px;
				top: 22px;
				writing-mode: vertical-rl;
				text-orientation: upright;
				display: flex;
				align-items: center;
				justify-content: space-evenly;
				color: #fff;
				width: 32px;
				height: 101px;
				background-image: url('https://pic1.imgdb.cn/item/68837adc58cb8da5c8de157e.png');
				background-size: cover;
				background-position: center;
				background-repeat: no-repeat;
			}

			.nav-center {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 0 43px;
				gap: 6px;

				.main-title {
					margin-top: 16px;
					color: rgba(0, 0, 0, 1);
					font-family: Alimama ShuHeiTi;
					font-size: 36px;
					font-weight: 600;
					line-height: 43px;
					letter-spacing: 0px;
					text-align: left;
				}

				.sub-title {
					color: rgba(0, 0, 0, 1);
					font-family: TsangerShuYuanT;
					font-size: 20px;
					font-weight: undefined;
					line-height: 25px;
					letter-spacing: 0px;
					text-align: left;
					border-bottom: 1px solid rgba(255, 255, 255, 1);
				}
			}

			.search-block {
				width: 100%;
				padding: 6px 6px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				box-sizing: border-box;
				border: 1px solid rgba(255, 255, 255, 1);
				border-radius: 999px;
				background: rgba(196, 196, 196, 0);
				color: #90AC62;

			}
		}

		/* 轮播图区域 */
		.banner {
			position: relative;
			width: 100%;
			height: 280rpx;
			overflow: hidden;
			margin: 32rpx 0;
		}

		/* 平铺方块区域 */
		.features {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 17px;
			margin: 18px 0 14px;
			gap: 22rpx;

			.feature-item {
				flex: 1;
				height: 202px;
				box-sizing: border-box;
				padding: 11px 10px 8px;
				position: relative;
				background-size: inherit;
				background-position: center;
				background-repeat: no-repeat;

				.border {
					border: 2px solid rgba(255, 255, 255, 1);
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 10px;

					color: rgba(255, 255, 255, 1);
					display: flex;
					gap: 4rpx;
					font-size: 48px;
					font-weight: 400;
					line-height: 63px;
					letter-spacing: 0.5em;
					text-align: center;
				}

				.feature-img {
					position: absolute;
					left: 0;
					right: 0;
					top: 0;
					bottom: 0;
					width: 100%;
					height: 100%;
				}
			}
		}

		/* 视频区域 */
		.video-section {
			width: 100%;
			margin: 32rpx 0;

			.promo-video {
				width: 100%;
				height: 340rpx;
				border-radius: 20rpx;
				background: #000;
				display: block;
			}
		}

		/* 热卖产品模块标题 */
		.section-title {
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 32rpx 0 24rpx 0;
			left: 50%;
			transform: translateX(-50%);
			top: -16%;

			.title-text {
				width: 158px;
				height: 100px;
				margin-top: -2px;
				color: rgba(0, 0, 0, 1);
				font-size: 29px;
				font-weight: 400;
				line-height: 38px;
				letter-spacing: 0px;
				text-align: left;
				white-space: nowrap;
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
				background-image: url('https://pic1.imgdb.cn/item/68838eec58cb8da5c8deb810.png');
				background-size: cover;
				background-position: 50% -6rpx;
				background-repeat: no-repeat;
			}
		}

		/* 产品卡片区域（水平排列，去掉喜欢标签，描述最多两行） */
		.product-list {
			margin-top: 44px;
			position: relative;
			display: flex;
			flex-direction: row;
			gap: 24rpx;
			margin-bottom: 32rpx;
			flex-wrap: wrap;
			box-sizing: border-box;
			border-top-right-radius: 24px;
			border-top-left-radius: 24px;
			padding-top: 44px;
			border-top: 1px solid rgba(187, 255, 204, 1);
		}

		.product-card {
			width: 100%;
			background: #fff;
			border-radius: 18rpx;
			box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.06);
			margin-bottom: 32rpx;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			transition: box-shadow 0.2s;

			.product-img {
				width: 100%;
				aspect-ratio: 16/9; // 或 height: 200rpx;
				object-fit: cover;
				background: #f5f5f5;
				display: block;
			}

			.product-info {
				padding: 20rpx 24rpx 16rpx 24rpx;
				display: flex;
				flex-direction: column;
				gap: 10rpx;
			}

			.product-name {
				font-size: 32rpx;
				font-weight: bold;
				color: #222;
				margin-bottom: 4rpx;
			}

			.product-desc {
				font-size: 24rpx;
				color: #888;
				line-height: 1.5;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2; // 最多两行
				-webkit-box-orient: vertical;
			}

			.product-like {
				display: flex;
				align-items: center;
				margin-top: 8rpx;
				color: #e54d42;
				font-size: 24rpx;
				gap: 8rpx;
			}

			.like-num {
				margin-left: 4rpx;
				color: #e54d42;
			}
		}
	</style>