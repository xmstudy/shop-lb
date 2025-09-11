<template>
	<BaseContainer :Bglinear="{
		background: 'linear-gradient(to bottom, #a6e22e 0%, #a6e22e 34%, #fff 62%,#fff 100%)',
	}">
		<view class="mine-container">
			<!-- Header Section -->
			<view class="header-section">
				<!-- 未登录状态 -->
				<view class="header-login" v-if="!isLoggedIn">
					<view class="avatar-placeholder">
						<u-icon name="account" color="#fff" size="60"></u-icon>
					</view>
					<view class="login-info">
						<view class="login-btn" @click="handleLogin">
							登录/注册
						</view>
					</view>
				</view>

				<!-- 登录状态 -->
				<view class="header-logged" v-else>
					<view class="user-info">
						<view class="avatar-section" @click="editProfile">
							<image class="avatar" :src="userInfo.avatar || 'https://img.yzcdn.cn/vant/cat.jpeg'" mode="aspectFill"></image>
							<view class="edit-btn">
								<u-icon name="edit-pen" color="#fff" size="21"></u-icon>
							</view>
						</view>
						<view class="user-details">
							<view class="nickname">{{ userInfo.nickname }}</view>
							<view class="member-level" @click="goToMemberCenter">
								<text>{{ userInfo.memberLevel }}</text>
								<u-icon name="arrow-right" color="#fff" size="21"></u-icon>
							</view>
							<view class="signature">{{ userInfo.signature }}</view>
						</view>
					</view>

				</view>
			</view>

			<!-- User Data Bar -->
			<view class="data-bar">
				<view class="data-item" @click="goToCoupons">
					<view class="data-number">{{ userData.coupons }}</view>
					<view class="data-label">优惠券</view>
				</view>
				<view class="data-item" @click="goToPoints">
					<view class="data-number">{{ userData.points }}</view>
					<view class="data-label">积分</view>
				</view>
				<view class="data-item" @click="goToBalance">
					<view class="data-number">{{ userData.balance }}</view>
					<view class="data-label">余额</view>
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
							<!-- <u-icon name="clock" color="#FF6B35" size="21"></u-icon> -->
							<img src="https://pic1.imgdb.cn/item/6885c2b558cb8da5c8e3bd65.png" alt="" />
						</view>
						<view class="order-label">待付款</view>
					</view>
					<view class="order-item" @click="goToOrders('shipped')">
						<view class="order-icon">
							<!-- <u-icon name="car" color="#FF6B35" size="21"></u-icon> -->
							<!-- <img src="https://pic1.imgdb.cn/item/6885c38b58cb8da5c8e3c01d.png" alt="" /> -->
							<img src="https://pic1.imgdb.cn/item/6885c41858cb8da5c8e3c1ef.png" alt="" />
						</view>
						<view class="order-label">待发货</view>
					</view>
					<view class="order-item" @click="goToOrders('review')">
						<view class="order-icon">
							<!-- <u-icon name="star" color="#FF6B35" size="21"></u-icon> -->
							<img src="https://pic1.imgdb.cn/item/6885c38b58cb8da5c8e3c01d.png" alt="" />
						</view>
						<view class="order-label">待收货</view>
					</view>
					<view class="order-item" @click="goToOrders('afterSale')">
						<view class="order-icon">
							<!-- <u-icon name="refresh" color="#FF6B35" size="21"></u-icon> -->
							<img src="https://pic1.imgdb.cn/item/6885c38b58cb8da5c8e3c01b.png" alt="" />
						</view>
						<view class="order-label">待评价</view>
					</view>
					<view class="order-item" @click="goToOrders('completed')">
						<view class="order-icon">
							<!-- <u-icon name="list" color="#FF6B35" size="21"></u-icon> -->
							<img src="https://pic1.imgdb.cn/item/6885c38b58cb8da5c8e3c01c.png" alt="" />
						</view>
						<view class="order-label">已完成</view>
					</view>
				</view>
			</view>

			<!-- Service Module -->
			<view class="service-module">
				<view class="module-title">我的服务</view>
				<view class="service-grid">
					<view class="service-item" @click="goToService('group')">
						<view class="service-icon">
							<!-- <u-icon name="group" color="#FF6B35" size="21"></u-icon> -->
							<img src="https://pic1.imgdb.cn/item/6885c2b558cb8da5c8e3bd66.png" alt="" />
						</view>
						<view class="service-label">个人资料</view>
					</view>
					<view class="service-item" @click="goToAddress">
						<view class="service-icon">
							<!-- <u-icon name="scissors" color="#FF6B35" size="21"></u-icon> -->
							<img src="https://pic1.imgdb.cn/item/6885c2b558cb8da5c8e3bd6a.png" alt="" />
						</view>
						<view class="service-label">地址</view>
					</view>
					<view class="service-item" @click="goToService('pointsMall')">
						<view class="service-icon">
							<!-- <u-icon name="gift" color="#FF6B35" size="21"></u-icon> -->
							<img src="https://pic1.imgdb.cn/item/6885c2b558cb8da5c8e3bd69.png" alt="" />
						</view>
						<view class="service-label">设置</view>
					</view>
					<view class="service-item" @click="goToService('address')">
						<view class="service-icon points-icon">
							<img src="https://pic1.imgdb.cn/item/6885c2b558cb8da5c8e3bd67.png" alt="" />
						</view>
						<view class="service-label">我的积分</view>
					</view>
					<view class="service-item" @click="goToService('cards')">
						<view class="service-icon">
							<!-- <u-icon name="card" color="#FF6B35" size="21"></u-icon> -->
							<img src="https://pic1.imgdb.cn/item/6885c2b558cb8da5c8e3bd68.png" alt="" />

						</view>
						<view class="service-label">客服服务</view>
					</view>
					<view class="service-item" @click="goToService('invite')">
						<view class="service-icon">
							<!-- <u-icon name="share" color="#FF6B35" size="21"></u-icon> -->
							<img src="https://pic1.imgdb.cn/item/6885c38b58cb8da5c8e3c01a.png" alt="" />
						</view>
						<view class="service-label">兑换专区</view>
					</view>
					<view class="service-item" @click="goToService('apply')">
						<view class="service-icon">
							<!-- <u-icon name="edit" color="#FF6B35" size="21"></u-icon> -->
							<img src="https://pic1.imgdb.cn/item/6885c41458cb8da5c8e3c1e1.png" alt="" />

						</view>
						<view class="service-label">售后管理</view>
					</view>
					<view class="service-item" @click="goToFavorites">
						<view class="service-icon">
							<u-icon name="heart" color="#a6e22e" size="21"></u-icon>
						</view>
						<view class="service-label">收藏列表</view>
					</view>
				</view>
			</view>
		</view>
	</BaseContainer>
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
				isLoggedIn: false, // 控制登录状态
				userInfo: {
					avatar: '',
					nickname: '',
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
		onShow() {
			// 仅检查登录状态，数据刷新由父组件调用refreshUserData()处理
			this.checkLoginStatus()
		},
		onHide() {
			// 页面隐藏时的处理逻辑
			console.log('页面隐藏')
		},
		mounted() {
			// 初始化时检查登录状态
			this.checkLoginStatus()
		},
		methods: {
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
				uni.showToast({
					title: '我的积分',
					icon: 'none'
				})
			},
			goToBalance() {
				uni.showToast({
					title: '我的余额',
					icon: 'none'
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
					case 'afterSale':
						targetStatus = '40' // 已完成（待评价）
						break
					case 'completed':
						targetStatus = '40' // 已完成
						break
					case 'all':
					default:
						targetStatus = 'all' // 全部订单
						break
				}
				
				uni.navigateTo({
					url: `/subpackages/order/list/list?status=${targetStatus}`
				})
			},
			goToService(type) {
				uni.showToast({
					title: `跳转${type}服务`,
					icon: 'none'
				})
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
	/* Header Section */
	.header-section {
		padding: 40rpx 24rpx 60rpx;
		position: relative;

		/* 未登录状态 */
		.header-login {
			display: flex;
			align-items: center;
			gap: 24rpx;

			.avatar-placeholder {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				background: rgba(255, 255, 255, 0.2);
				display: flex;
				align-items: center;
				justify-content: center;
				border: 4rpx solid rgba(255, 255, 255, 0.3);
			}

			.login-info {
				flex: 1;

				.login-btn {
					background: rgba(255, 255, 255, 0.2);
					color: #fff;
					padding: 20rpx 40rpx;
					border-radius: 32rpx;
					text-align: center;
					font-size: 32rpx;
					font-weight: bold;
					border: 2rpx solid rgba(255, 255, 255, 0.3);
					backdrop-filter: blur(10rpx);
				}
			}
		}

		/* 登录状态 */
		.header-logged {
			position: relative;

			.user-info {
				display: flex;
				align-items: flex-start;
				gap: 24rpx;

				.avatar-section {
					position: relative;

					.avatar {
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
						border: 4rpx solid rgba(255, 255, 255, 0.3);
					}

					.edit-btn {
						position: absolute;
						bottom: 0;
						right: 0;
						width: 40rpx;
						height: 40rpx;
						background: rgba(255, 255, 255, 0.2);
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						backdrop-filter: blur(10rpx);
					}
				}

				.user-details {
					flex: 1;

					.nickname {
						font-size: 36rpx;
						font-weight: bold;
						color: #fff;
						margin-bottom: 12rpx;
					}

					.member-level {
						display: flex;
						align-items: center;
						gap: 8rpx;
						margin-bottom: 16rpx;

						text {
							font-size: 24rpx;
							color: #fff;
							background: rgba(255, 255, 255, 0.2);
							padding: 8rpx 16rpx;
							border-radius: 20rpx;
						}
					}

					.signature {
						font-size: 26rpx;
						color: rgba(255, 255, 255, 0.9);
						line-height: 1.4;
						max-width: calc(100% - 120rpx);
						overflow: hidden;
						word-wrap: break-word;
						word-break: break-all;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
				}
			}


		}
	}

	/* User Data Bar */
	.data-bar {
		background: #fff;
		margin: -40rpx 24rpx 20rpx;
		border-radius: 16rpx;
		padding: 32rpx 24rpx;
		display: flex;
		justify-content: space-around;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);

		.data-item {
			text-align: center;

			.data-number {
				font-size: 36rpx;
				font-weight: bold;
				color: #333;
				margin-bottom: 8rpx;
			}

			.data-label {
				font-size: 24rpx;
				color: #666;
			}
		}
	}

	/* Member Module */
	.member-module {
		background: #fff;
		margin: 0 24rpx 20rpx;
		border-radius: 16rpx;
		padding: 24rpx;
		display: flex;
		gap: 20rpx;

		.member-item {
			flex: 1;
			display: flex;
			align-items: center;
			gap: 16rpx;
			padding: 20rpx;
			border-radius: 12rpx;
			background: #f8f8f8;

			.member-icon {
				width: 60rpx;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.member-text {
				flex: 1;

				.member-title {
					font-size: 28rpx;
					font-weight: bold;
					color: #333;
					margin-bottom: 4rpx;
				}

				.member-desc {
					font-size: 22rpx;
					color: #999;
				}
			}
		}
	}

	/* Order Module */
	.order-module {
		background: #fff;
		margin: 0 24rpx 20rpx;
		border-radius: 16rpx;
		padding: 24rpx;

		.module-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 24rpx;

			.module-title {
				font-size: 32rpx;
				font-weight: bold;
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

	/* Service Module */
	.service-module {
		background: #fff;
		margin: 0 24rpx 20rpx;
		border-radius: 16rpx;
		padding: 24rpx;

		.module-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 24rpx;
		}

		.service-grid {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 32rpx;

			.service-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 12rpx;
				min-height: 90rpx;

				.service-icon {
					width: 40rpx;
					height: 60rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					img {
						max-width: 40rpx;
						max-height: 40rpx;
						object-fit: contain;
					}

					&.points-icon img {
						max-width: 40rpx;
						max-height: 50rpx;
					}
				}

				.service-label {
					font-size: 24rpx;
					color: #666;
					text-align: center;
					margin-top: auto;
				}
			}
		}
	}
</style>