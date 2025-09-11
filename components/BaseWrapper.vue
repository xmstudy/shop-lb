<template>
	<view class="base-wrapper py-safe" :style="[{ paddingTop: paddingTop + 'px' },Bglinear]">
		<slot></slot>
		<view class="tabbar-placeholder"></view>

		<!-- 全局固定客服联系按钮 -->
		<!-- <button v-if="showCustomerService" class="customer-service-btn" open-type="contact">
			<u-icon name="server-man" color="#fff" size="32"></u-icon>
		</button> -->
	</view>
</template>

<script>
	export default {
		name: 'BaseWrapper',
		props: {
			Bglinear: {
				type: [Object, String],
				default: () => ({})
			},
			showCustomerService: {
				type: Boolean,
				default: true // 默认显示客服按钮
			}
		},
		data() {
			return {
				paddingTop: 0
			}
		},
		mounted() {
			console.log(this.showCustomerService,'asd');
			let padding = 0;
			// 优先使用安全区信息
			const sysInfo = uni.getSystemInfoSync();
			if (sysInfo.safeAreaInsets && sysInfo.safeAreaInsets.top) {
				padding = sysInfo.safeAreaInsets.top;
			} else if (sysInfo.statusBarHeight) {
				padding = sysInfo.statusBarHeight;
			}
			this.paddingTop = padding;
		},
		methods: {
			// 联系客服
			contactCustomerService() {
				uni.showActionSheet({
					itemList: ['在线客服', '电话咨询', '微信客服'],
					success: (res) => {
						switch (res.tapIndex) {
							case 0:
								// 在线客服
								this.openOnlineService();
								break;
							case 1:
								// 电话咨询
								this.callCustomerService();
								break;
							case 2:
								// 微信客服
								this.openWechatService();
								break;
						}
					},
					fail: (err) => {
						console.log('取消选择客服方式');
					}
				});
			},

			// 打开在线客服
			openOnlineService() {
				uni.showToast({
					title: '正在连接客服...',
					icon: 'loading',
					duration: 1500
				});

				// TODO: 这里可以跳转到在线客服页面
				setTimeout(() => {
					uni.showModal({
						title: '在线客服',
						content: '客服工作时间：09:00-18:00\n为您提供专业的产品咨询服务',
						showCancel: false,
						confirmText: '知道了',
						confirmColor: '#a6e22e'
					});
				}, 1500);
			},

			// 拨打客服电话
			callCustomerService() {
				const phoneNumber = '400-123-4567'; // 客服电话号码
				uni.showModal({
					title: '客服电话',
					content: `即将拨打客服热线：${phoneNumber}\n工作时间：09:00-18:00`,
					confirmText: '立即拨打',
					cancelText: '取消',
					confirmColor: '#a6e22e',
					success: (res) => {
						if (res.confirm) {
							uni.makePhoneCall({
								phoneNumber: phoneNumber,
								success: () => {
									console.log('拨打电话成功');
								},
								fail: (err) => {
									console.error('拨打电话失败:', err);
									uni.showToast({
										title: '拨打失败，请手动拨打',
										icon: 'none',
										duration: 2000
									});
								}
							});
						}
					}
				});
			},

			// 打开微信客服
			openWechatService() {
				uni.showModal({
					title: '微信客服',
					content: '请添加微信号：leibonongye\n或扫描二维码添加客服微信',
					showCancel: true,
					confirmText: '复制微信号',
					cancelText: '取消',
					confirmColor: '#a6e22e',
					success: (res) => {
						if (res.confirm) {
							uni.setClipboardData({
								data: 'leibonongye',
								success: () => {
									uni.showToast({
										title: '微信号已复制',
										icon: 'success',
										duration: 2000
									});
								}
							});
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.base-wrapper {
		width: 100%;
		box-sizing: border-box;
		min-height: 100vh;
		height: auto;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.tabbar-placeholder {
		width: 100%;
		height: 160rpx;
		// height: 60rpx;
		min-height: env(safe-area-inset-bottom);
		pointer-events: none;
	}

	// 全局固定客服按钮
	.customer-service-btn {
		position: fixed;
		left: 32rpx;
		top: 75%;
		transform: translateY(-50%);
		z-index: 9999;
		width: 100rpx;
		height: 100rpx;
		background: linear-gradient(135deg, #a6e22e 0%, #8db82a 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow:
			0 12rpx 40rpx rgba(166, 226, 46, 0.3),
			0 4rpx 16rpx rgba(0, 0, 0, 0.1);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		cursor: pointer;

		// 添加上下运动动画
		animation: float-up-down 2s ease-in-out infinite;

		&:active {
			transform: translateY(-50%) scale(0.95);
			box-shadow:
				0 8rpx 24rpx rgba(166, 226, 46, 0.4),
				0 2rpx 8rpx rgba(0, 0, 0, 0.15);
			animation-play-state: paused;
		}

		// 悬浮光晕效果
		&::before {
			content: '';
			position: absolute;
			top: -8rpx;
			left: -8rpx;
			right: -8rpx;
			bottom: -8rpx;
			background: radial-gradient(circle, rgba(166, 226, 46, 0.2) 0%, transparent 70%);
			border-radius: 50%;
			opacity: 0;
			transition: opacity 0.3s ease;
			z-index: -1;
		}

		&:hover::before {
			opacity: 1;
		}
	}

	// 上下运动动画
	@keyframes float-up-down {

		0%,
		100% {
			transform: translateY(-50%) translateX(0);
		}

		50% {
			transform: translateY(-50%) translateX(0) translateY(-20rpx);
		}
	}

	// 响应式适配
	@media screen and (max-width: 750rpx) {
		.customer-service-btn {
			width: 80rpx;
			height: 80rpx;
			left: 24rpx;
		}
	}
</style>