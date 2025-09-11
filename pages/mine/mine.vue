<template>
	<view class="mine-page">
		<!-- 固定顶部标题栏 -->
		<view class="mine-header" :style="headerStyle">
			<view class="header-content">
				<text class="header-title">个人中心</text>
				<view class="header-right">
					<u-icon name="more-dot-fill" size="20" color="#333"></u-icon>
					<u-icon name="scan" size="20" color="#333" style="margin-left: 20rpx;"></u-icon>
				</view>
			</view>
		</view>

		<!-- 页面主体内容 -->
		<scroll-view scroll-y class="mine-body" :style="{ paddingTop: contentTopPx + 'px' }">
			<!-- 用户信息区域 -->
			<view class="user-section">
				<!-- 未登录状态 -->
				<view class="user-info-card" v-if="!isLoggedIn">
					<view class="login-content" @click="handleLogin">
						<view class="login-text">登录/注册</view>
						<view class="login-desc">登录后享受更多服务</view>
					</view>
				</view>

				<!-- 登录状态 -->
				<view class="user-info-card" v-else>
					<view class="avatar-section" @click="editProfile">
						<image class="avatar" :src="userInfo.avatar || 'https://img.yzcdn.cn/vant/cat.jpeg'" mode="aspectFill"></image>
					</view>
					<view class="user-info">
						<view class="nickname">{{ userInfo.nickname || 'YEZ' }}</view>
						<view class="user-id">
							<text>{{ getPhonePrefix(userInfo.phone || '15912345678') }}</text>
							<text class="phone-mask">****</text>
							<text>{{ getPhoneSuffix(userInfo.phone || '15912345678') }}</text>
						</view>
					</view>
				</view>
			</view>

			<!-- Order Module -->
			<view class="order-module">
				<view class="module-header">
					<view class="module-title">我的订单</view>
					<view class="view-all" @click="goToOrders('all')">
						<text>查看全部</text>
						<u-icon name="arrow-right" color="#999" size="16"></u-icon>
					</view>
				</view>
				<view class="order-items">
					<view class="order-item" @click="goToOrders('pending')">
						<view class="order-icon">
							<img src="https://pic1.imgdb.cn/item/68bee1b058cb8da5c8895066.png" alt="" />
						</view>
						<view class="order-label">待付款</view>
					</view>
					<view class="order-item" @click="goToOrders('shipped')">
						<view class="order-icon">
							<img src="https://pic1.imgdb.cn/item/68bee1b058cb8da5c8895067.png" alt="" />
						</view>
						<view class="order-label">待发货</view>
					</view>
					<view class="order-item" @click="goToOrders('review')">
						<view class="order-icon">
							<img src="https://pic1.imgdb.cn/item/68bee1b058cb8da5c8895068.png" alt="" />
						</view>
						<view class="order-label">待收货</view>
					</view>
					<view class="order-item" @click="goToOrders('completed')">
						<view class="order-icon">
							<img src="https://pic1.imgdb.cn/item/68bee1b058cb8da5c8895065.png" alt="" />
						</view>
						<view class="order-label">已完成</view>
					</view>
				</view>
			</view>

			<!-- 数据栏 -->
			<view class="data-bar">
				<view class="data-item" @click="goToBalance">
					<view class="data-icon">
						<image src="/static/images/ye.png" mode="aspectFit"></image>
					</view>
					<view class="data-info">
						<view class="data-label">余额</view>
						<view class="data-number">{{ userData.balance || '100.0' }}</view>
					</view>
				</view>
				<view class="data-item" @click="goToPoints">
					<view class="data-icon">
						<image src="/static/images/jf.png" mode="aspectFit"></image>
					</view>
					<view class="data-info">
						<view class="data-label">积分</view>
						<view class="data-number">{{ userData.points || '5600' }}</view>
					</view>
				</view>
				<view class="data-item" @click="goToCoupons">
					<view class="data-icon">
						<image src="/static/images/yhj.png" mode="aspectFit"></image>
					</view>
					<view class="data-info">
						<view class="data-label">优惠券</view>
						<view class="data-number">{{ userData.coupons || '12' }}</view>
					</view>
				</view>
			</view>

			<!-- Service Module -->
			<view class="service-module">
				<view class="service-list">
					<view class="service-item" @click="goToFavorites">
						<view class="service-icon">
							<u-icon name="star" color="#666" size="20"></u-icon>
						</view>
						<view class="service-label">我的收藏</view>
						<view class="service-arrow">
							<u-icon name="arrow-right" color="#ccc" size="16"></u-icon>
						</view>
					</view>
					<view class="service-item" @click="goToAddress">
						<view class="service-icon">
							<u-icon name="map" color="#666" size="20"></u-icon>
						</view>
						<view class="service-label">收货地址</view>
						<view class="service-arrow">
							<u-icon name="arrow-right" color="#ccc" size="16"></u-icon>
						</view>
					</view>
					<view class="service-item" @click="goToService('cards')">
						<view class="service-icon">
							<u-icon name="account" color="#666" size="20"></u-icon>
						</view>
						<view class="service-label">我的客服</view>
						<view class="service-arrow">
							<u-icon name="arrow-right" color="#ccc" size="16"></u-icon>
						</view>
					</view>
					<view class="service-item" @click="goToService('about')">
						<view class="service-icon">
							<u-icon name="info-circle" color="#666" size="20"></u-icon>
						</view>
						<view class="service-label">关于我们</view>
						<view class="service-arrow">
							<u-icon name="arrow-right" color="#ccc" size="16"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import BaseContainer from '@/components/BaseWrapper.vue'
	import { isLoggedIn, getUserInfo, getToken, mergeUserInfo, debugLoginStatus } from '@/utils/auth.js'
	import { fetchUserInfo } from '@/api/user/index.js'
	export default {
		name: 'Mine',
		components: {
			BaseContainer
		},
		data() {
			return {
				// 顶部安全区域
				statusBarHeight: 0,
				capsuleHeight: 44,
				capsuleTop: 0,
				
				isLoggedIn: false, // 控制登录状态
				userInfo: {
					avatar: '',
					nickname: '',
					phone: '',
					memberLevel: '普通会员',
					signature: ''
				},
				userData: {
					coupons: 0,
					points: 0,
					balance: 0
				}
			}
		},
		
		computed: {
			// 顶部标题栏样式
			headerStyle() {
				return `padding-top:${this.capsuleTop}px;background:#fff;`
			},
			
			// 内容区顶部偏移
			contentTopPx() {
				return this.capsuleTop + this.capsuleHeight
			}
		},
		onShow() {
			// 仅检查登录状态，数据刷新由父组件调用refreshUserData()处理
			this.checkLoginStatus()
		},
		onHide() {
			// 页面隐藏时的处理逻辑
			console.log('页面隐藏')
		},
		mounted() {
			// 初始化页面布局
			this.initPageLayout()
			// 初始化时检查登录状态
			this.checkLoginStatus()
		},
		methods: {
			// 初始化页面布局
			initPageLayout() {
				const sys = uni.getSystemInfoSync()
				this.statusBarHeight = sys.statusBarHeight || 0

				// #ifdef MP-WEIXIN
				try {
					const rect = wx.getMenuButtonBoundingClientRect()
					if (rect && rect.height) {
						this.capsuleHeight = rect.height
						this.capsuleTop = rect.top + 5
					}
				} catch (e) {}
				// #endif

				// 其他端给个合理默认
				// #ifndef MP-WEIXIN
				this.capsuleHeight = 44
				this.capsuleTop = this.statusBarHeight
				// #endif
			},
			
			// 格式化手机号，中间用红色*代替，保留末尾4位
			formatPhone(phone) {
				if (!phone || phone.length < 7) {
					return phone
				}
				const prefix = phone.substring(0, 3)
				const suffix = phone.substring(phone.length - 4)
				return `${prefix}****${suffix}`
			},
			
			// 获取手机号前缀
			getPhonePrefix(phone) {
				if (!phone || phone.length < 7) {
					return phone
				}
				return phone.substring(0, 3)
			},
			
			// 获取手机号后缀
			getPhoneSuffix(phone) {
				if (!phone || phone.length < 7) {
					return ''
				}
				return phone.substring(phone.length - 4)
			},
			
			// 外部调用的刷新用户数据方法（暴露给父组件）
			refreshUserData() {
				console.log('外部调用refreshUserData方法')
				if (this.isLoggedIn) {
					// 先从本地存储刷新数据
					this.refreshUserDataFromLocal()
					// 可选择性地从API刷新数据
					setTimeout(() => {
						const token = getToken()
						if (token) {
							this.fetchUserInfoFromAPI()
						}
					}, 100)
				}
			},

			// 从本地存储刷新用户数据（用于从其他页面返回时同步数据）
			refreshUserDataFromLocal() {
				console.log('从本地存储刷新用户数据')
				const userInfo = getUserInfo()
				if (userInfo && Object.keys(userInfo).length > 0) {
					// 更新用户信息
					this.userInfo = {
						...this.userInfo,
						...userInfo,
						// 如果没有头像，使用默认头像
						avatar: userInfo.avatarUrl || userInfo.avatar || this.userInfo.avatar || 'https://img.yzcdn.cn/vant/cat.jpeg',
						// 如果没有昵称，使用默认昵称
						nickname: userInfo.nickname || this.userInfo.nickname || '用户' + (userInfo.memberId || ''),
						// 设置会员等级
						memberLevel: userInfo.type === 1 ? '超级会员' : '普通会员',
						// 设置个性签名
						signature: userInfo.signature || this.userInfo.signature || '这个人很懒，什么都没留下~'
					}
					console.log('mine页面用户信息已从本地存储刷新:', this.userInfo)
				}
			},

			checkLoginStatus() {
				// 调试登录状态
				debugLoginStatus()
				
				// 使用认证工具函数检查登录状态
				this.isLoggedIn = isLoggedIn()
				console.log('当前登录状态:', this.isLoggedIn)
				
				// 如果已登录，获取用户信息（数据刷新由父组件调用refreshUserData()处理）
				if (this.isLoggedIn) {
					this.getUserInfo()
				}
			},
			getUserInfo() {
				// 使用认证工具函数获取用户信息
				const userInfo = getUserInfo()
				if (userInfo && Object.keys(userInfo).length > 0) {
					// 合并用户信息，保留默认值
					this.userInfo = {
						...this.userInfo,
						...userInfo,
						// 如果没有头像，使用默认头像
						avatar: userInfo.avatarUrl || userInfo.avatar || this.userInfo.avatar || 'https://img.yzcdn.cn/vant/cat.jpeg',
						// 如果没有昵称，使用默认昵称
						nickname: userInfo.nickname || this.userInfo.nickname || '用户' + (userInfo.memberId || ''),
						// 设置会员等级
						memberLevel: userInfo.type === 1 ? '超级会员' : '普通会员',
						// 设置个性签名
						signature: userInfo.signature || this.userInfo.signature || '这个人很懒，什么都没留下~'
					}
					console.log('用户信息已更新:', this.userInfo)
				}
				
				// 延迟检查token，确保登录信息已保存
				setTimeout(() => {
					// 如果有token，调用API获取最新的用户信息
					const token = getToken()
					if (token) {
						this.fetchUserInfoFromAPI()
					}
				}, 500) // 延迟500ms检查token
			},
			
			// 从API获取用户信息
			async fetchUserInfoFromAPI() {
				try {
					const response = await fetchUserInfo()
					
					if (response.code === 200 && response.data) {
						// 使用合并函数更新用户信息
						const mergedUserInfo = mergeUserInfo(response.data)
						
						// 更新页面显示的用户信息
						this.userInfo = {
							...this.userInfo,
							...mergedUserInfo,
							// 如果没有头像，使用默认头像
							avatar: mergedUserInfo.avatarUrl || mergedUserInfo.avatar || this.userInfo.avatar || 'https://img.yzcdn.cn/vant/cat.jpeg',
							// 如果没有昵称，使用默认昵称
							nickname: mergedUserInfo.nickname || this.userInfo.nickname || '用户' + (mergedUserInfo.memberId || ''),
							// 设置会员等级
							memberLevel: mergedUserInfo.type === 1 ? '超级会员' : '普通会员',
							// 设置个性签名
							signature: mergedUserInfo.signature || this.userInfo.signature || '这个人很懒，什么都没留下~'
						}
						console.log('API用户信息已合并并更新:', this.userInfo)
					}
				} catch (error) {
					console.error('获取用户信息失败:', error)
					// 如果API调用失败，继续使用本地存储的信息
				}
			},
			handleLogin() {
				uni.navigateTo({
					url:"/subpackages/user/login/login"
				})
			},
			editProfile() {
				uni.showToast({
					title: '编辑资料',
					icon: 'none'
				})
				uni.navigateTo({
					url: `/subpackages/user/center/center`
				})
			},
			goToMemberCenter() {
				uni.showToast({
					title: '会员中心',
					icon: 'none'
				})
			},
			goToCoupons() {
				uni.showToast({
					title: '我的优惠券',
					icon: 'none'
				})
			},
			goToPoints() {
				uni.navigateTo({
					url: '/subpackages/user/Points/Points'
				})
			},
			goToBalance() {
				uni.navigateTo({
					url: '/subpackages/user/Mybalance/Mybalance'
				})
			},
			goToPointsMall() {
				uni.showToast({
					title: '积分商城',
					icon: 'none'
				})
			},
			goToOrders(status) {
				// 根据状态跳转到对应的订单列表页面
				let targetStatus = 'all'
				
				switch (status) {
					case 'pending':
						targetStatus = '10' // 待付款
						break
					case 'shipped':
						targetStatus = '20' // 待发货
						break
					case 'review':
						targetStatus = '30' // 待收货
						break
					case 'completed':
						targetStatus = '40' // 已完成
						break
					case 'all':
					default:
						targetStatus = 'all' // 全部订单
						break
				}
				
				console.log(`跳转到订单列表，状态: ${status} -> ${targetStatus}`)
				
				uni.navigateTo({
					url: `/subpackages/order/list/list?status=${targetStatus}`
				})
			},
			goToService(type) {
				if (type === 'about') {
					uni.navigateTo({
						url: '/subpackages/help/about/about'
					})
				} else {
					uni.showToast({
						title: `跳转${type}服务`,
						icon: 'none'
					})
				}
			},
			goToAddress() {
				// 跳转到地址列表页面，不标记来源
				uni.navigateTo({
					url: '/subpackages/address/list/list'
				})
			},
			goToFavorites() {
				uni.navigateTo({
					url: '/subpackages/goods/favGoodsList/favGoodsList'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.mine-page {
	height: 100vh;
	background: #f5f5f5;
	display: flex;
	flex-direction: column;
}

/* 固定顶部标题栏 */
.mine-header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 999;
	box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
}

.header-content {
	height: 100%;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	padding: 0 30rpx 16rpx 30rpx;
	position: relative;
	margin-bottom: 30rpx; /* 增加下边距 */
}

.header-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #111;
}

.header-right {
	position: absolute;
	right: 30rpx;
	bottom: 16rpx;
	display: flex;
	align-items: center;
}

/* 页面主体 */
.mine-body {
	flex: 1;
	height: 0;
	padding-bottom: 40rpx;
}

/* 用户信息区域 */
.user-section {
	padding: 20rpx 30rpx;
}

.user-info-card {
	background: #fff;
	border-radius: 16rpx;
	padding: 40rpx 30rpx;
	display: flex;
	align-items: center;
	gap: 24rpx;
	box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.06);
	min-height: 120rpx;
}

/* 未登录状态 */
.login-content {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8rpx;
	
	.login-text {
		font-size: 36rpx;
		font-weight: 600;
		color: #333;
	}
	
	.login-desc {
		font-size: 24rpx;
		color: #999;
	}
}

/* 登录状态 */
.avatar-section {
	.avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}
}

.user-info {
	flex: 1;
	
	.nickname {
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
		margin-bottom: 8rpx;
	}
	
	.user-id {
		font-size: 24rpx;
		color: #999;
		display: flex;
		align-items: center;
		
		.phone-mask {
			color: #ff4d4f;
			font-weight: 600;
		}
	}
}



/* 数据栏 */
.data-bar {
	background: #fff;
	margin: 0 30rpx 30rpx;
	border-radius: 16rpx;
	padding: 40rpx 30rpx;
	height: 240rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.08);

	.data-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20rpx;
		position: relative;

		&:not(:last-child)::after {
			content: '';
			position: absolute;
			right: -1rpx;
			top: 50%;
			transform: translateY(-50%);
			width: 1rpx;
			height: 60rpx;
			background: #f0f0f0;
		}

		.data-icon {
			width: 60rpx;
			height: 60rpx;
			
			image {
				width: 100%;
				height: 100%;
			}
		}

		.data-info {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 8rpx;
			
			.data-number {
				font-size: 36rpx;
				font-weight: 700;
				color: #34C759;
				line-height: 1;
			}
			
			.data-label {
				font-size: 26rpx;
				color: #666;
				font-weight: 500;
			}
		}
	}
}

/* 订单模块 */
.order-module {
	background: #fff;
	margin: 0 30rpx 30rpx;
	border-radius: 16rpx;
	padding: 30rpx;
	box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.06);

	.module-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 30rpx;

		.module-title {
			font-size: 32rpx;
			font-weight: 600;
			color: #333;
		}

		.view-all {
			display: flex;
			align-items: center;
			gap: 8rpx;
			font-size: 26rpx;
			color: #999;
		}
	}

	.order-items {
		display: flex;
		justify-content: space-between;

		.order-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 12rpx;
			flex: 1;

			.order-icon {
				width: 40rpx;
				height: 40rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				img {
					max-width: 100%;
					max-height: 100%;
					object-fit: contain;
				}
			}

			.order-label {
				font-size: 24rpx;
				color: #666;
			}
		}
	}
}

/* 服务模块 */
.service-module {
	background: #fff;
	margin: 0 30rpx 30rpx;
	border-radius: 16rpx;
	box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.06);

	.service-list {
		.service-item {
			display: flex;
			align-items: center;
			padding: 30rpx;
			border-bottom: 1rpx solid #f5f5f5;
			
			&:last-child {
				border-bottom: none;
			}

			.service-icon {
				width: 40rpx;
				height: 40rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 24rpx;
			}

			.service-label {
				flex: 1;
				font-size: 28rpx;
				color: #333;
			}

			.service-arrow {
				width: 20rpx;
				height: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
}
</style>