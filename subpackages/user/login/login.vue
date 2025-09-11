<template>
	<BaseContainer :showCustomerService="false">
		<view class="login-container">
			<!-- 返回按钮 -->
			<view class="back-btn" @click="goBack">
				<u-icon name="arrow-left" color="#333" size="24"></u-icon>
			</view>

			<!-- 页面标题 -->
			<view class="page-title">
				<text class="title-text">微信登录</text>
				<text class="subtitle-text" v-if="!isFromTokenExpired">使用微信账号快速登录</text>
				<text class="subtitle-text expired-tip" v-else>登录已过期，请重新登录以继续使用</text>
			</view>
			<!-- 登录区域 -->
			<view class="login-section">
				<!-- 微信登录按钮 -->
				<button class="wechat-login-btn" @tap="handleDirectLogin" :loading="isLogging" :disabled="isLogging">
					<u-icon name="weixin-fill" color="#fff" size="32"></u-icon>
					<text class="btn-text">{{ isLogging ? '登录中...' : '微信一键登录' }}</text>
				</button>

				<!-- 用户协议 -->
			<!-- 	<view class="agreement-section">
					<text class="agreement-text">
						登录即表示同意
						<text class="link-text" @click="showUserAgreement">《用户协议》</text>
						和
						<text class="link-text" @click="showPrivacyPolicy">《隐私政策》</text>
					</text>
				</view> -->
			</view>
		</view>
	</BaseContainer>
</template>

<script>
	import BaseContainer from '@/components/BaseWrapper.vue'
	import {
		saveLoginInfo,
		isLoggedIn
	} from '../../../utils/auth.js'
	import {
		WxLogin
	} from '../../../api/login/index.js'

	export default {
		name: 'UserLogin',
		components: {
			BaseContainer
		},
		data() {
			return {
				userData: {},
				userInfo: {},
				info: {},
				isLogging: false,
				redirectUrl: '', // 登录成功后的重定向地址
				isFromTokenExpired: false // 是否来自token过期跳转
			}
		},
		mounted() {
			// 检查登录状态
			this.checkLoginStatus()
			// 获取重定向参数
			this.getRedirectParams()
		},
		onShow() {
			// 每次显示页面时检查登录状态
			this.checkLoginStatus()
		},
		onLoad() {
			this.getWxCode()
		},
		methods: {
			// 获取重定向参数
			getRedirectParams() {
				try {
					const pages = getCurrentPages()
					if (pages && pages.length > 0) {
						const currentPage = pages[pages.length - 1]
						const options = currentPage.options || {}

						// 检查是否有重定向参数
						if (options.redirect) {
							this.redirectUrl = decodeURIComponent(options.redirect)
							this.isFromTokenExpired = true
							console.log('检测到重定向地址:', this.redirectUrl)

							// 显示提示信息
							uni.showToast({
								title: '登录已过期，请重新登录',
								icon: 'none',
								duration: 2000
							})
						}
					}
				} catch (error) {
					console.error('获取重定向参数失败:', error)
				}
			},

			// 检查登录状态
			checkLoginStatus() {
				if (isLoggedIn()) {
					uni.showToast({
						title: '您已登录',
						icon: 'none'
					})
					// 延迟跳转到首页
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/index/index'
						})
					}, 1500)
				}
			},

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
			wxCode() {
				return new Promise((resolve, reject) => {
					uni.login({
						provider: 'weixin',
						success: (res) => {
							resolve(res.code)
						},
						fail: (err) => {
							reject(err)
						}
					})
				})
			},
			async getWxCode() {
				let code = await this.wxCode()
				const userData = await this.checkUserExists(code)
				if (userData.token) {
					this.userData = userData
					this.userInfo = userData.userInfo
					this.info = userData
				}
			},
			async checkUserExists(code) {
				let data = await WxLogin({
					code
				})
				return data.data
			},
			// 直接点击登录
			async handleDirectLogin() {
				try {
					this.isLogging = true
					uni.showLoading({
						title: '登录中...'
					})

					// 如果还没有获取到用户数据，重新获取微信code并登录
					if (!this.userData.token) {
						const code = await this.wxCode()
						const loginResult = await this.checkUserExists(code)
						if (loginResult.token) {
							this.userData = loginResult
							this.userInfo = loginResult.userInfo
						} else {
							throw new Error('登录失败，未获取到token')
						}
					}

					// 使用真实的登录数据
					const data = {
						token: this.userData.token,
						userInfo: this.userInfo
					}

					console.log('登录成功', data)

					// 保存登录状态和用户信息到本地存储
					const saveResult = saveLoginInfo(data)

					if (saveResult) {
					// 显示登录成功提示
					uni.showToast({
						title: '登录成功',
						icon: 'success'
					})

					// 使用更稳定的跳转方式
					setTimeout(() => {
						try {
							// 如果有重定向地址，跳转到重定向地址
							if (this.redirectUrl) {
								console.log('跳转到重定向地址:', this.redirectUrl)
								// 使用 navigateTo 跳转到分包页面
								uni.navigateTo({
									url: this.redirectUrl,
									fail: (err) => {
										console.error('navigateTo失败:', err)
										// 如果navigateTo失败，尝试使用redirectTo
										uni.redirectTo({
											url: this.redirectUrl,
											fail: (redirectErr) => {
												console.error('redirectTo也失败:',
													redirectErr)
												// 最后兜底方案
												uni.reLaunch({
													url: this
														.redirectUrl
												})
											}
										})
									}
								})
							} else {
								// 更新全局数据，切换到首页（第0个tab）
								if (getApp().globalData) {
									getApp().globalData.activeTabbarKey = 0
								}
								// 跳转到首页
								uni.switchTab({
									url: '/pages/index/index',
									fail: (err) => {
										console.error('switchTab失败:', err)
										uni.reLaunch({
											url: '/pages/index/index'
										})
									}
								})
							}
						} catch (error) {
							console.error('页面跳转失败:', error)
							// 兜底方案
							uni.reLaunch({
								url: '/pages/index/index'
							})
						}
					}, 1000) // 减少延迟时间
					} else {
						uni.showToast({
							title: '登录信息保存失败',
							icon: 'error'
						})
					}
				} catch (error) {
					console.error('登录失败:', error)
					uni.showToast({
						title: error.message || '登录失败，请重试',
						icon: 'none',
						duration: 2000
					})
				} finally {
					uni.hideLoading()
					this.isLogging = false
				}
			},

			// 显示用户协议
			showUserAgreement() {
				uni.showToast({
					title: '用户协议',
					icon: 'none'
				})
			},

			// 显示隐私政策
			showPrivacyPolicy() {
				uni.showToast({
					title: '隐私政策',
					icon: 'none'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		overflow: hidden;
		height: 100vh;
	}

	:deep(.base-wrapper) {
		overflow: hidden !important;
		height: 100vh !important;
		min-height: 100vh !important;
		position: relative !important;
	}

	.login-container {
		background: #f5f5f5;
		min-height: 100vh;
		position: relative;
	}

	/* 返回按钮 */
	.back-btn {
		position: absolute;
		top: 40rpx;
		left: 40rpx;
		width: 80rpx;
		height: 80rpx;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
		z-index: 10;
		transition: all 0.3s ease;
	}

	.back-btn:active {
		transform: scale(0.95);
		background: rgba(255, 255, 255, 1);
	}

	/* 页面标题 */
	.page-title {
		padding: 120rpx 40rpx 60rpx;
		text-align: center;

		.title-text {
			display: block;
			font-size: 48rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 16rpx;
		}

		.subtitle-text {
			display: block;
			font-size: 28rpx;
			color: #666;
			line-height: 1.5;

			&.expired-tip {
				color: #e54d42;
				font-weight: 500;
			}
		}
	}

	/* 登录区域 */
	.login-section {
		padding: 0 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 60vh;
	}

	/* 微信登录按钮 */
	.wechat-login-btn {
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 16rpx;
		background: linear-gradient(135deg, #07C160, #10AD6A);
		border-radius: 16rpx;
		box-shadow: 0 8rpx 24rpx rgba(7, 193, 96, 0.3);
		transition: all 0.3s ease;
		border: none;
		margin-bottom: 40rpx;

		.btn-text {
			font-size: 32rpx;
			color: #fff;
			font-weight: bold;
		}

		&:active {
			transform: scale(0.98);
			box-shadow: 0 4rpx 16rpx rgba(7, 193, 96, 0.4);
		}

		&:disabled {
			opacity: 0.7;
			transform: none;
		}
	}

	/* 用户协议 */
	.agreement-section {
		text-align: center;
		padding: 0 20rpx;

		.agreement-text {
			font-size: 24rpx;
			color: #999;
			line-height: 1.5;

			.link-text {
				color: #07C160;
				text-decoration: underline;
			}
		}
	}
</style>